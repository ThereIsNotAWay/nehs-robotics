from flask import request, render_template, redirect, url_for, Blueprint
from PIL import Image

from blueprintsapp.app import db
from blueprintsapp.blueprints.gallery.models import SeasonImages, SeasonDescriptions

gallery = Blueprint('gallery', __name__, template_folder='templates')

@gallery.route('/')
def season_gallery():
  return render_template('gallery/gallery.html')

@gallery.route('/<season>-season')
def team_season(season):
  images = SeasonImages.get_images_by_season(season)
  season_info = SeasonDescriptions.get_description_by_season(season)

  if not images:
    return render_template('wip_page.html')
  
  return render_template(f'gallery/season_showcase.html', images=images, season=season_info)


@gallery.app_template_filter('image_size_check')
def is_taller(image_url):
  try:
    complete_image_url = "blueprintsapp/static/images/" + image_url
    actual_image = Image.open(complete_image_url)
    width, height = actual_image.size
    actual_image.close()

    if height - width > 100:
      return "taller-img"
    
    else:
      return "wider-img"
  
  except FileNotFoundError:
    print("Image does not exist")
    return ""
  
  except TypeError:
    print("What the heck happened?")
    return ""

@gallery.app_template_filter('has_caption')
def check_caption(caption):
  if caption == None:
    return False
  
  if len(caption) <= 1:
    return False
  
  return True

@gallery.app_template_filter('format_season')
def season_formatter(season):
  start_of_season = season[:4]
  end_of_season = season[5:9]
  formatted_season = start_of_season + " - " + end_of_season

  return formatted_season