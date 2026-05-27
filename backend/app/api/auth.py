from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.user import User

from app.schemas.user_schema import UserRegister, UserLogin

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)

router = APIRouter()


# -------------------------
# Database Dependency
# -------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -------------------------
# REGISTER API
# -------------------------
@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        role="citizen"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }


# -------------------------
# LOGIN API
# -------------------------
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    try:

        password_valid = verify_password(
            user.password,
            db_user.password
        )

    except Exception:

        raise HTTPException(
            status_code=500,
            detail="Server password verification error. Please re-register user."
        )

    if not password_valid:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Create JWT Token
    token = create_access_token(
        data={
            "sub": db_user.email,
            "role": db_user.role
        }
    )

    # IMPORTANT UPDATED RESPONSE
    return {

        "message": "Login successful",

        "access_token": token,

        "token_type": "bearer",

        "role": db_user.role,

        "name": db_user.name,

        "email": db_user.email

    }