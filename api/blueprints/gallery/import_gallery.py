import os
from api.database import SessionLocal
from api.blueprints.gallery.models import GalleryItem

GALLERY_DIR = "static/gallery"
BACKEND_URL = os.getenv("BACKEND_URL")

# Imports all images stored in the static folder to the database.
def import_gallery():
    db = SessionLocal()

    # gallery has 3 folders for FRC, FTC, and SeaGlide, each holding images respectively
    for category in os.listdir(GALLERY_DIR):
        category_path = os.path.join(GALLERY_DIR, category)

        # skip potential hidden instances like .DS_Store
        if not os.path.isdir(category_path):
            continue

        # begin checking every image present, adding them to the database if not already present
        for img in os.listdir(category_path):
            # replace with f"{BACKEND_URL}/static/gallery/{category}/{img}" in production
            public_url = f"{BACKEND_URL}/static/gallery/{category}/{img}"

            # check if an instance already exists in the gallery, skip if it does exist
            exists = db.query(GalleryItem).filter_by(src=public_url).first()
            if exists:
                continue

            # grab the raw file name used for the title field in a database entry
            filename, ext = os.path.splitext(img)

            # create the new GalleryItem instance
            newImage = GalleryItem(
                category = category,
                title = filename,
                description = "",
                src = public_url
            )

            # add the item to the database
            db.add(newImage)

    # clean up connection to database
    db.commit()
    db.close()