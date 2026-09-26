from sqlalchemy import Column, String, text, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from pydantic import BaseModel, Field, HttpUrl, field_validator
from enum import Enum

from api.database import Base

class GalleryItem(Base):
    __tablename__ = "gallery"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    public_id = Column(String, nullable=False, unique=True)
    # season = Column(String, nullable=False)
    category = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    src = Column(String, nullable=False)
    created_at = Column(TIMESTAMP, server_default=text("NOW()"))

    # helper function to return a JSONified version of a GalleryItem entry
    def to_dict(self):
        return {
            "id": str(self.id),
            "public_id": self.public_id,
            "category": self.category,
            "title": self.title,
            "description": self.description,
            "src": self.src
        }

class ImageCategory(str, Enum):
    FTC = "FTC"
    FRC = "FRC"
    SEAGLIDE = "SeaGlide"
    ALL = "all"

class ImageUpload(BaseModel):
    public_id: str
    category: ImageCategory
    title: str
    description: str | None = None
    src: HttpUrl

    @field_validator("public_id")
    @classmethod
    def validate_public_id(cls, passed_public_id: str) -> str:
        passed_public_id = passed_public_id.strip()
        if not passed_public_id:
            raise ValueError("public_id cannot be empty!")

        if len(passed_public_id) > 255:
            raise ValueError("public_id is too long!")

        return passed_public_id

    @field_validator("title")
    @classmethod
    def validate_title(cls, passed_title: str) -> str:
        passed_title = passed_title.strip()
        if not passed_title:
            raise ValueError("title cannot be empty!")

        if len(passed_title) > 150:
            raise ValueError("title must be 150 characters or less!")
        
        return passed_title

    @field_validator("description")
    @classmethod
    def validate_description(cls, passed_description: str | None) -> str | None:
        if passed_description is None:
            return passed_description

        if len(passed_description) == 0:
            return passed_description

        passed_description = passed_description.strip()

        if not passed_description:
            return None

        if len(passed_description) > 150:
            raise ValueError("description must be 150 characters or less!")

        return passed_description

    @field_validator("src")
    @classmethod
    def validate_src(cls, passed_src: HttpUrl) -> HttpUrl:
        if "res.cloudinary.com" not in str(passed_src):
            raise ValueError("src must be a Cloudinary URL!")

        return passed_src
    