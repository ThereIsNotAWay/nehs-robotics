from flask import Blueprint, request, jsonify
from api.database import SessionLocal
from api.blueprints.gallery.models import GalleryItem

gallery = Blueprint('gallery', __name__)

GALLERY_DIR = "static/gallery"

@gallery.get("/")
def get_gallery():
    session = SessionLocal()
    try:
        category = request.args.get('category')
        query = session.query(GalleryItem)

        if category:
            query = query.filter(GalleryItem.category == category)
        
        images = query.all()

        return jsonify([img.to_dict() for img in images]), 200
    except Exception as e:
        return jsonify({str(e)}), 500
    finally:
        session.close()