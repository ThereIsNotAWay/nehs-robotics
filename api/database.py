import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

Base = declarative_base()

db_uri = os.environ['DATABASE_URL'].replace("postgresql://", "cockroachdb://")
engine = create_engine(db_uri, connect_args={"application_name":"vikings-robotics-api"})
SessionLocal = sessionmaker(bind=engine)

def init_db():
  from api.blueprints.resources.models import Resource
  from api.blueprints.gallery.models import GalleryItem

  Base.metadata.create_all(engine)
