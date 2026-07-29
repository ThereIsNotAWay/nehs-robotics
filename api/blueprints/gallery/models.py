from sqlalchemy import Column, String, text, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID

from api.database import Base

class GalleryItem(Base):
    __tablename__ = "gallery"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    category = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    src = Column(String, nullable=False)
    created_at = Column(TIMESTAMP, server_default=text("NOW()"))

    # helper function to return a JSONified version of a GalleryItem entry
    def to_dict(self):
        return {
            "id": str(self.id),
            "category": self.category,
            "title": self.title,
            "description": self.description,
            "src": self.src
        }