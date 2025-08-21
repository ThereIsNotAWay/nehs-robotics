from os import environ
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_talisman import Talisman

db = SQLAlchemy()

def create_app():
  app = Flask(__name__, template_folder='templates')

  app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_CONNECTION')
  app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

  db.init_app(app)
  
  from blueprintsapp.blueprints.main.routes import main
  from blueprintsapp.blueprints.news.routes import news
  from blueprintsapp.blueprints.gallery.routes import gallery
  from blueprintsapp.blueprints.resources.routes import resources

  migrate = Migrate(app, db)

  app.register_blueprint(main, url_prefix='/')
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

  @app.errorhandler(404)
  def global_404(e):
    return render_template('wip_page.html')

  return app


