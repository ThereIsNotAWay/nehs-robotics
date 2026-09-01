from flask import Blueprint, request, jsonify
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.exceptions import BadRequest
from flask_login import login_required
from pydantic import ValidationError
from sqlalchemy import desc

from api.database import SessionLocal
from api.blueprints.resources.models import Resource
from api.blueprints.resources.schemas import ResourceCreate

resources = Blueprint('resources', __name__)

# helper to convert a Resource model into a JSON-serializable dict
def normalize_resource(r: Resource) -> dict:
    return {
        "id": str(r.id),
        "category": r.category,
        "title": r.title,
        "description": r.description,
        "link": r.link,
    }

@resources.route("/", methods=['GET'])
def get_resources():
    try: 
        category = request.args.get('category')

        with SessionLocal() as session:
            query = session.query(Resource)

            # if a category was selected to filter by, use that
            if category:
                query = query.filter(Resource.category.ilike(f"%{category}%"))
        
            resources_list = query.order_by(desc(Resource.created_at)).all()
            return jsonify({"success": True, "resources": [normalize_resource(r) for r in resources_list]}), 200
    except SQLAlchemyError:
        return jsonify({"success": False, "message": "Error whilst fetching from our database. Please try again in a moment."}), 503
    except Exception:
        return jsonify({"success": False, "message": "Something went wrong."}), 500

@resources.route("/add", methods=['POST'])
@login_required
def add_resource():
    try:
        if not request.is_json:
            return jsonify({"success": False, "message": "Invalid JSON"}), 415

        req = request.get_json()
        data = ResourceCreate.model_validate(req)

        with SessionLocal() as session:
            resource = Resource(
                category=data.category,
                title=data.title,
                description=data.description,
                link=data.link,
            )
            session.add(resource)
            session.commit()
            session.refresh(resource)

            return jsonify({"success": True, "message": "Resource successfully added!", "resource": normalize_resource(resource)}), 201
    except ValidationError:
        return jsonify({"success": False, "message": "Invalid resource data provided. Please try again."}), 400
    except BadRequest:
        return jsonify({"success": False, "message": "Malformed JSON"}), 400
    except SQLAlchemyError:
        return jsonify({"success": False, "message": "Error whilst saving to our database. Please try again in a moment."}), 503
    except Exception:
        return jsonify({"success": False, "message": "Something went wrong."}), 500

@resources.route("/<uuid:resource_id>", methods=['PATCH'])
@login_required
def edit_resource(resource_id):
    try:
        if not request.is_json:
            return jsonify({"success": False, "message": "Invalid JSON"}), 415

        req = request.get_json()
        data = ResourceCreate.model_validate(req)

        with SessionLocal() as session:
            resource = session.query(Resource).filter_by(id=resource_id).first()

            if not resource:
                return jsonify({"success": False, "message": "Resource not found."}), 404

            resource.category = data.category
            resource.title = data.title
            resource.description = data.description
            resource.link = data.link

            session.commit()
            session.refresh(resource)

            return jsonify({"success": True, "message": "Resource successfully updated!", "resource": normalize_resource(resource)}), 200

    except ValidationError:
        return jsonify({"success": False, "message": "Invalid resource data provided. Please try again."}), 400
    except BadRequest:
        return jsonify({"success": False, "message": "Malformed JSON"}), 400
    except SQLAlchemyError:
        return jsonify({"success": False, "message": "Error whilst saving to our database. Please try again in a moment."}), 503
    except Exception:
        return jsonify({"success": False, "message": "Something went wrong."}), 500

@resources.route("/<uuid:resource_id>", methods=['DELETE'])
@login_required
def delete_resource(resource_id):
    try:
        with SessionLocal() as session:
            resource = session.query(Resource).filter_by(id=resource_id).first()

            if not resource:
                return jsonify({"success": False, "message": "Resource not found."}), 404

            session.delete(resource)
            session.commit()

            return jsonify({"success": True, "message": "Resource successfully deleted."}), 200
    except SQLAlchemyError:
        return jsonify({"success": False, "message": "Error whilst trying to delete. Please try again in a moment."}), 503
    except Exception:
        return jsonify({"success": False, "message": "Something went wrong."}), 500