from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import os
import subprocess
import uuid
from utils.extract_notes import parse_musicxml

app = FastAPI()

