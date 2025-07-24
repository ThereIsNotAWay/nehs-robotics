from flask import request, render_template, redirect, url_for, Blueprint

resources = Blueprint('resources', __name__, template_folder='templates')

@resources.route('/')
def all_resources():
  return render_template('resources/resources.html')

@resources.route('/competitions/<competition>')
def competition_resources(competition):
  competition_names = ['ftc', 'frc', 'seaglide', 'seaperch']

  if competition in competition_names:
    return render_template(f'resources/{competition}.html')

  return render_template('wip_page.html')

# @resources.route('/role_resources/<resource>')
# def role_resource(resource):
#   resources = ["", "", ""]

#   if resource in resources:
#     return render_template(f'resources/{resource}.html')
  
#   return render_template('wip_page.html')

# @resources.errorhandler(404)
# def page_not_found(e):
#   return render_template('wip_page.html')