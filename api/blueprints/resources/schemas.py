from pydantic import BaseModel, Field

class ResourceCreate(BaseModel):
    category: str = Field(..., min_length=1)
    title: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)
    link: str = Field(..., min_length=1)