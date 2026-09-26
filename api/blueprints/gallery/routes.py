import os
import cloudinary
import cloudinary.uploader
import cloudinary.utils
from sqlalchemy import select, desc
from sqlalchemy.exc import SQLAlchemyError
from pydantic import ValidationError
from werkzeug.exceptions import BadRequest
from flask import Blueprint, request, jsonify
from flask_login import login_required
from api.database import SessionLocal
from api.blueprints.gallery.models import GalleryItem, ImageUpload

gallery = Blueprint('gallery', __name__)

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

@gallery.route("/", methods=['GET'])
def get_gallery():
    try:
        # read in a category (filter) selection
        category = request.args.get('category')

        with SessionLocal() as session:
            query = session.query(GalleryItem)

            # if a category was selected, filter to select only items that match the category
            if category:
                query = query.filter(GalleryItem.category == category)

            gallery_list = query.order_by(desc(GalleryItem.created_at)).all()
            # convert images and return them as a JSON array
            return jsonify({"success": True, "gallery": [img.to_dict() for img in gallery_list]}), 200
    except SQLAlchemyError:
        return jsonify({"success": False, "message": "Error whilst fetching from our database. Please try again in a moment."}), 503
    except Exception:
        return jsonify({"success": False, "message": "Something went wrong."}), 500

@gallery.route('/sign-image', methods=["POST"])
@login_required
def sign_image_signature():
    unsigned_params = request.get_json()
    signed_signature = cloudinary.utils.api_sign_request(unsigned_params, cloudinary.config().api_secret)
    return jsonify({"signature": signed_signature})
    
@gallery.route('/images/del/<path:public_id>', methods=["DELETE"])
@login_required
def delete_image(public_id):
    try:
        with SessionLocal() as session:
            image_to_delete = session.scalar(select(GalleryItem).where(GalleryItem.public_id == public_id))

            cloudinary_response = cloudinary.uploader.destroy(public_id)

            if cloudinary_response.get('result') not in ("ok", "not found"):
                return jsonify({"success": False, "message": "Failed to delete image from storage."}), 502

            if image_to_delete:
                session.delete(image_to_delete)
                session.commit()

            return jsonify({"success": True, "message": "Image successfully deleted."}), 200

    except Exception:
        return jsonify({"success": False, "message": "Something went wrong."}), 500

@gallery.route('/images/add', methods=["POST"])
@login_required
def add_image():
  try: 
    if not request.is_json:
      return jsonify({"success": False, "message": "Invalid JSON"}), 415

    upload_form = request.get_json()
    upload_attempt = ImageUpload.model_validate(upload_form)

    with SessionLocal() as session:
      public_id = upload_attempt.public_id
      category = upload_attempt.category.value
      title = upload_attempt.title
      description = upload_attempt.description
      src = upload_attempt.src
    
      image = GalleryItem(public_id=public_id, category=category, title=title, description=description, src=str(src))

      session.add(image)
      session.commit()
      return jsonify({"success": True, "message": "Image added.", "item": image.to_dict()}), 201
  except ValidationError:
    return jsonify({"success": False, "message": "Invalid image data provided."}), 400
  except BadRequest:
    return jsonify({"success": False, "message": "Malformed JSON"}), 400
  except Exception:
        return jsonify({"success": False, "message": "Something went wrong."}), 500
