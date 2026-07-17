from os import environ
from flask import Flask
from flask_cors import CORS
from flask_talisman import Talisman

def create_app():
  app = Flask(__name__, template_folder='templates')
  
  from api.blueprints.news.routes import news
  from api.blueprints.gallery.routes import gallery
  from api.blueprints.resources.routes import resources

  app.register_blueprint(news, url_prefix='/news')
  app.register_blueprint(gallery, url_prefix='/gallery')
  app.register_blueprint(resources, url_prefix='/resources')

  origin_domain = environ.get("ORIGIN_DOMAIN")
  csp = {
    'default-src': ['\'self\'', origin_domain],
    'style-src': ['\'self\'', origin_domain],
    'script-src': ['\'self\'', origin_domain],
    'img-src': ['\'self\'', origin_domain],
  }
  Talisman(app, content_security_policy=csp)

  CORS(app, resources={r'/*': {"origins": origin_domain}})

  return app


