from typing import Literal
from pydantic import BaseModel, Field


class ComplaintCreate(BaseModel):
    title: str = Field(
        ...,
        min_length=3,
        max_length=200,
        description="Complaint title"
    )
    description: str = Field(
        ...,
        min_length=10,
        max_length=2000,
        description="Complaint description"
    )


class ComplaintStatusUpdate(BaseModel):
    status: Literal[
        "Pending",
        "In Progress",
        "Resolved",
        "Rejected"
    ]