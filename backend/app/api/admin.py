from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.complaint import Complaint
from app.models.user import User
from app.core.security import get_current_user

router = APIRouter()


@router.get("/admin/stats")
def get_admin_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Access denied")

    total = db.query(Complaint).count()

    pending = db.query(Complaint).filter(
        Complaint.status == "Pending"
    ).count()

    in_progress = db.query(Complaint).filter(
        Complaint.status == "In Progress"
    ).count()

    resolved = db.query(Complaint).filter(
        Complaint.status == "Resolved"
    ).count()

    rejected = db.query(Complaint).filter(
        Complaint.status == "Rejected"
    ).count()

    return {
        "total_complaints": total,
        "pending": pending,
        "in_progress": in_progress,
        "resolved": resolved,
        "rejected": rejected
    }


@router.get("/admin/recent-complaints")
def get_recent_complaints(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Access denied")

    complaints = db.query(Complaint).order_by(
        Complaint.created_at.desc()
    ).limit(5).all()

    result = []

    for complaint in complaints:

        citizen = db.query(User).filter(
            User.id == complaint.citizen_id
        ).first()

        result.append({
            "id": complaint.id,
            "ticket_id": complaint.ticket_id,
            "title": complaint.title,
            "category": complaint.category,
            "priority": complaint.priority,
            "status": complaint.status,
            "citizen_name": citizen.name if citizen else "Unknown"
        })

    return result


@router.get("/admin/users")
def get_all_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Access denied")

    # users = db.query(User).all()

    users = db.query(User).filter(
    User.role == "citizen"
).all()

    result = []

    for user in users:

        complaint_count = db.query(Complaint).filter(
            Complaint.citizen_id == user.id
        ).count()

        result.append({
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,
            "complaints": complaint_count
        })

    return result