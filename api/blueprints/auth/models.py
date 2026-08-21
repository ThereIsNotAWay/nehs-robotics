from sqlalchemy import Column, String, text
from sqlalchemy.dialects.postgresql import UUID
from pydantic import BaseModel, Field
from flask_login import UserMixin

from api.database import Base

class User(Base, UserMixin):

    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    name = Column(String, nullable=False, unique=True)
    password_hash = Column(String, nullable=False)
    role = Column(String, nullable=False, server_default="User")

class LoginRequest(BaseModel):
    name: str = Field(min_length=8, max_length=20)
    password: str = Field(min_length=12, max_length=128)

class SignupRequest(BaseModel):
    name: str = Field(min_length=8, max_length=20)
    password: str = Field(min_length=12, max_length=128)