from datetime import datetime

from sqlalchemy import (
    String,
    Text,
    DateTime,
    ForeignKey,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.db.base import Base


class Complaint(Base):

    __tablename__ = "complaints"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    ticket_id: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=True
    )

    title: Mapped[str] = mapped_column(
        String(200),
        nullable=False
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    file_url: Mapped[str] = mapped_column(
        String(255),
        nullable=True
    )

    status: Mapped[str] = mapped_column(
        String(50),
        default="Pending"
    )

    category: Mapped[str] = mapped_column(
        String(50),
        nullable=True
    )

    priority: Mapped[str] = mapped_column(
        String(50),
        nullable=True
    )

    # IMPORTANT CHANGE
    # nullable=True for anonymous complaints
    citizen_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )