from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.db.base import Base
from app.db.session import engine

from app.api.auth import router as auth_router
from app.api.complaint import router as complaint_router
from app.api.admin import router as admin_router


# Create Database Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Digital Grievance Redressal System API"
)


# Static Uploads Folder
app.mount(
    "/uploads",
    StaticFiles(directory="app/uploads"),
    name="uploads"
)


# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Root API
@app.get("/")
def root():
    return {
        "message": "Digital Grievance Redressal System API is running"
    }


# Routes
app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(complaint_router)