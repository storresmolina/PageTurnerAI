from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import os
import subprocess
import uuid
import shlex
from utils.extract_notes import parse_musicxml


app = FastAPI()

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "exports"

# Ensure upload and output directories exist
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

@app.post("/extract-notes/")
async def extract_notes(pdf: UploadFile = File(...)):
    # Save the uploaded PDF file
    file_id = str(uuid.uuid4())
    filename = f"{file_id}.pdf"
    filepath = os.path.join(UPLOAD_DIR, filename)

    with open(filepath, "wb") as f:
        f.write(await pdf.read())

    # Call Audiveris CLI tool to process the PDF 

    AUDIVERIS_JAR_PATH = r"C:\Program Files\Audiveris\app\audiveris.jar"

    try:
        subprocess.run([
            "java",
            "-jar",
            AUDIVERIS_JAR_PATH,
            "-batch",
            "-export",
            "-output",
            OUTPUT_DIR,
            filepath
        ], check=True, shell=True)
            
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f"Audiveris failed to process the file: {e}")
    
    # Find the corresponding MusicXML file
    expected_output = os.path.join(OUTPUT_DIR, f"{file_id}.mxl")
    if not os.path.exists(expected_output):
        raise HTTPException(status_code=500, detail="MusicXML file not found.")
    
    # Extract notes from MusicXML file
    try:
        notes = parse_musicxml(expected_output)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse MusicXML file: {e}")
    
    return JSONResponse(content={"notes": notes})
