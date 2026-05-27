import os

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    UploadFile,
    File,
    Form,
    Query
)

from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.complaint import Complaint
from app.models.user import User

from app.schemas.complaint_schema import (
    ComplaintStatusUpdate
)

from app.core.security import (
    get_current_user,
    get_current_user_optional
)

from app.ml.model import predict_ticket

router = APIRouter()

UPLOAD_DIR = "app/uploads"


@router.post("/complaints")
def create_complaint(
    title: str = Form(...),
    description: str = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user_optional
    )
):

    file_url = None

    if file:

        file_path = os.path.join(
            UPLOAD_DIR,
            file.filename
        )

        with open(file_path, "wb") as f:
            f.write(file.file.read())

        file_url = "/uploads/" + file.filename

    prediction = predict_ticket(
        title + " " + description
    )

    citizen_id = None

    if current_user:
        citizen_id = current_user.id

    new_complaint = Complaint(
        title=title,
        description=description,
        file_url=file_url,
        category=prediction["category"],
        priority=prediction["priority"],
        citizen_id=citizen_id
    )

    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)

    new_complaint.ticket_id = (
        f"GRV-{1000 + new_complaint.id}"
    )

    db.commit()

    return {
        "message": "Complaint submitted successfully",
        "ticket_id": new_complaint.ticket_id,
        "file_url": file_url,
        "category": new_complaint.category,
        "priority": new_complaint.priority
    }


@router.get("/my-complaints")
def get_my_complaints(
    status: str = Query(None),
    ticket_id: str = Query(None),
    page: int = Query(1),
    limit: int = Query(5),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    query = db.query(Complaint).filter(
        Complaint.citizen_id == current_user.id
    )

    if status:
        query = query.filter(
            Complaint.status == status
        )

    if ticket_id:
        query = query.filter(
            Complaint.ticket_id == ticket_id
        )

    skip = (page - 1) * limit

    return query.offset(skip).limit(limit).all()


@router.get("/admin/complaints")
def get_all_complaints(
    status: str = Query(None),
    ticket_id: str = Query(None),
    page: int = Query(1),
    limit: int = Query(5),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != "admin":

        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    query = db.query(Complaint)

    if status:
        query = query.filter(
            Complaint.status == status
        )

    if ticket_id:
        query = query.filter(
            Complaint.ticket_id == ticket_id
        )

    skip = (page - 1) * limit

    return query.offset(skip).limit(limit).all()


@router.put("/admin/complaints/{complaint_id}")
def update_complaint_status(
    complaint_id: int,
    data: ComplaintStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != "admin":

        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    complaint = db.query(Complaint).filter(
        Complaint.id == complaint_id
    ).first()

    if not complaint:

        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

    complaint.status = data.status

    db.commit()

    return {
        "message": "Complaint status updated"
    }