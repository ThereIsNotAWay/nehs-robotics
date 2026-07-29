from flask import Blueprint, request, jsonify
from api.database import SessionLocal
from api.blueprints.gallery.models import GalleryItem

gallery = Blueprint('gallery', __name__)

GALLERY_DIR = "static/gallery"

@gallery.get("/")
def get_gallery():
    session = SessionLocal()
    try:
        # read in a category (filter) selection
        category = request.args.get('category')
        query = session.query(GalleryItem)

        # if a category was selected, filter to select only items that match the category
        if category:
            query = query.filter(GalleryItem.category == category)

        # retrieve a list of GalleryItems matching the current category
        images = query.all()

        # convert GalleryItems to dictionaries returning them as a JSON array
        return jsonify([img.to_dict() for img in images]), 200
    except Exception as e:
        return jsonify({str(e)}), 500
    finally:
        session.close()