import os
from os import environ
from flask import Flask
from flask_cors import CORS
from flask_talisman import Talisman
from api.extensions import login_manager, bcrypt, limiter, seasurf
from api.database import init_db

def create_app():
  app = Flask(__name__)

  with app.app_context():
      from api.database import SessionLocal
      from api.blueprints.gallery.models import GalleryItem
      from api.blueprints.gallery.import_gallery import import_gallery
  
      db = SessionLocal()
      if db.query(GalleryItem).count() == 0:
          import_gallery()
      db.close()

  BACKEND_URL = os.getenv("BACKEND_URL")

  app.config["BCRYPT_LOG_ROUNDS"] = 14
  app.config["SECRET_KEY"] = environ["SECRET_KEY"]
  app.config["RATELIMIT_STORAGE_URI"] = environ["RATELIMIT_STORAGE_URI"]
  app.config["SESSION_PROTECTION"] = "strong"
  app.config.update(SESSION_COOKIE_SECURE=True, SESSION_COOKIE_HTTPONLY=True, 
                    SESSION_COOKIE_SAMESITE="None")
  app.config.update(CSRF_COOKIE_NAME="_csrf_token", 
                    CSRF_COOKIE_SECURE=True,
                    CSRF_COOKIE_HTTPONLY=False,
                    CSRF_COOKIE_SAMESITE="None", CSRF_CHECK_REFERER=True)
  app.config["BACKEND_URL"] = BACKEND_URL

  init_db()

  login_manager.init_app(app)
  bcrypt.init_app(app)
  limiter.init_app(app)
  seasurf.init_app(app)
  
  from api.blueprints.news.routes import news
  from api.blueprints.gallery.routes import gallery
  from api.blueprints.resources.routes import resources
  from api.blueprints.auth.routes import auth

  app.register_blueprint(news, url_prefix='/api/news')
  app.register_blueprint(gallery, url_prefix='/api/gallery')
  app.register_blueprint(resources, url_prefix='/api/resources')
  app.register_blueprint(auth, url_prefix='/api/auth')

  origin_domain = environ["ORIGIN_DOMAIN"]
  csp = {
    'default-src': '\'self\'',
    'style-src': ['\'self\''],
    'script-src': ['\'self\''],
    'img-src': ['\'self\'', 'data:', BACKEND_URL],
    'font-src': ['\'self\''],
    'connect-src': ['\'self\'', origin_domain],
    'frame-ancestors': '\'none\'',
    "object-src": '\'none\'',
    "base-uri": '\'self\'',
    "form-action": '\'self\'',
  }
  Talisman(app, content_security_policy=csp,
           force_https=False, strict_transport_security=True,
           strict_transport_security_include_subdomains=True,
           strict_transport_security_preload=True)

  CORS(app, resources={r'/api/*': {"origins": [origin_domain], "allowed_headers": ["Content-Type", "X-CSRFToken"]}}, supports_credentials=True)

  return app


