import os
from api.database import SessionLocal
from api.blueprints.gallery.models import GalleryItem

GALLERY_DIR = "static/gallery"
BACKEND_URL = os.getenv("BACKEND_URL")

def import_gallery():
    db = SessionLocal()

    for category in os.listdir(GALLERY_DIR):
        category_path = os.path.join(GALLERY_DIR, category)

        # skip instances like .DS_Store
        if not os.path.isdir(category_path):
            continue

        for img in os.listdir(category_path):
            filename, ext = os.path.splitext(img)
            # replace with f"{BACKEND_URL}/static/gallery/{category}/{img}" in production
            public_url = f"{BACKEND_URL}/static/gallery/{category}/{img}"

            # check if an instance already exists in the gallery, skip if it does exist
            exists = db.query(GalleryItem).filter_by(src=public_url).first()
            if exists:
                continue

            newImage = GalleryItem(
                category = category,
                title = filename,
                description = "",
                src = public_url
            )

            db.add(newImage)

    db.commit()