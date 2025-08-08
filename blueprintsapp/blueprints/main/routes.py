from flask import request, render_template, redirect, url_for, Blueprint

from blueprintsapp.blueprints.gallery.models import SplineObserver

main = Blueprint('main', __name__, template_folder='templates', static_folder='static', static_url_path='main/static')

@main.route('/')
def index():
  splines = SplineObserver.get_spline_by_season('2023-2024')
  return render_template('main/index.html', spline_objects=splines)

@main.route('/<page_name>')
def search_main_page(page_name):
  base_pages = ['index', 'about', 'gallery', 'resources', 'contacts', 'shop']

  if page_name in base_pages:
    return render_template(f'main/{page_name}.html')

  return render_template('wip_page.html')

@main.route('/api/<page_name>')
def contact_api_call(page_name):
  return redirect(url_for("main.search_main_page", page_name=page_name))

# @main.errorhandler(404)
# def page_not_found(e):
#   return render_template('wip_page.html')