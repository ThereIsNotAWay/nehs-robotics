from flask import Blueprint, request, jsonify
from flask_login import login_user, current_user, logout_user
from api.extensions import bcrypt, limiter, login_manager, seasurf
from api.database import SessionLocal
from api.blueprints.auth.models import User, LoginRequest, SignupRequest
from pydantic import ValidationError
from sqlalchemy import select
from werkzeug.exceptions import BadRequest

auth = Blueprint('auth', __name__)

@login_manager.user_loader
def load_user(user_id):
  with SessionLocal() as session:
    return session.scalar(select(User).where(User.id==user_id))

@auth.route('/me')
def me():
  if current_user.is_authenticated:
    return jsonify({"authenticated": True, "user": {"name": current_user.name, "role": current_user.role}}), 200
  return jsonify({"authenticated": False}), 200

@auth.route('/csrf-token')
def get_csrf_token():
  return jsonify({"csrf_token": seasurf._get_token()})

@auth.route('/logout', methods=['POST'])
@limiter.limit("5 per minute")
def logout():
  logout_user()
  return jsonify({"success": True}), 200

@auth.route('/login', methods=['POST'])
@limiter.limit("5 per minute")
def login():
  try: 
    if not request.is_json:
      return jsonify({"success": False, "message": "Invalid JSON"}), 415

    login_form = request.get_json()
    login_attempt = LoginRequest.model_validate(login_form)

    name = login_attempt.name.strip().lower()
    password = login_attempt.password
    
    with SessionLocal() as session:
      user = session.query(User).filter_by(name=name).first()
      if not user or not bcrypt.check_password_hash(user.password_hash, password):
        return jsonify({"success": False, "message": "Username or password is incorrect."}), 401

      login_user(user)
      return jsonify({"success": True, "message": "Success!"}), 200

  except ValidationError as e:
    return jsonify({"success": False, "message": "Invalid credentials!"}), 400

  except BadRequest:
    return jsonify({"success": False, "message": "Malformed JSON"})

@auth.route('/signup', methods=['POST'])
@limiter.limit("5 per minute")
def signup():

  try: 
    if not request.is_json:
      return jsonify({"success": False, "message": "Invalid JSON"}), 415

    signup_form = request.get_json()
    signup_attempt = SignupRequest.model_validate(signup_form)
  
    name = signup_attempt.name.strip().lower()
    password = signup_attempt.password
        
    with SessionLocal() as session:
      user_exists = session.scalar(select(User).where(User.name==name))
      if user_exists:
        return jsonify({"success": False, "message": "Unable to create an account. User already exists."}), 409

      hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
      new_user = User(name=name, password_hash=hashed_password)

      session.add(new_user)
      session.commit()  
      
      return jsonify({"success": True, "message": "Success!"}), 201
  
  except ValidationError as e:
    return jsonify({"success": False, "message": "Invalid inputs!"}), 401

  except BadRequest:
      return jsonify({"success": False, "message": "Malformed JSON"}), 400