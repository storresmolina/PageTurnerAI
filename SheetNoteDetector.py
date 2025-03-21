from pdf2image import convert_from_path
from PIL import Image
import cv2
import numpy as np
from typing import List

def remove_staff_lines(gray_img):
    horizontal_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (40, 1))
    detected_lines = cv2.morphologyEx(gray_img, cv2.MORPH_OPEN, horizontal_kernel, iterations=1)
    no_staff = cv2.subtract(gray_img, detected_lines)
    return no_staff

def map_y_to_note(y: int) -> str:
    reference_y = 200
    spacing = 10
    notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    midi_number = 60 + round((y - reference_y) / spacing)
    if midi_number < 21 or midi_number > 108:
        return None
    note_name = notes[midi_number % 12]
    octave = midi_number // 12 - 1
    return f"{note_name}{octave}"

def extract_notes_from_pdf(pdf_path: str) -> List[str]:
    images = convert_from_path(pdf_path, first_page=1, last_page=1)
    if not images:
        raise ValueError("Could not convert PDF to image.")
    image = images[0]
    return extract_notes_with_fill_filter(image)[0]

def extract_notes_with_fill_filter(image, crop_ratio=0.12, x_thresh=25, y_thresh=12):
    image_np = np.array(image)
    height = image_np.shape[0]
    crop_start = int(height * crop_ratio)
    cropped_image = image_np[crop_start:, :]

    gray = cv2.cvtColor(cropped_image, cv2.COLOR_RGB2GRAY)
    no_staff = remove_staff_lines(gray)

    blurred = cv2.GaussianBlur(no_staff, (5, 5), 0)
    thresh = cv2.adaptiveThreshold(
        blurred, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 11, 2)

    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    detected_notes = []

    for cnt in contours:
        area = cv2.contourArea(cnt)
        perimeter = cv2.arcLength(cnt, True)
        if perimeter == 0 or area < 60 or area > 400:
            continue

        x, y, w, h = cv2.boundingRect(cnt)
        aspect_ratio = w / h
        solidity = area / (w * h)
        roundness = 4 * np.pi * area / (perimeter * perimeter)

        if len(cnt) >= 5:
            ellipse = cv2.fitEllipse(cnt)
            major_axis = max(ellipse[1])
            minor_axis = min(ellipse[1])
            eccentricity = np.sqrt(1 - (minor_axis / major_axis) ** 2)
            if eccentricity > 0.9:
                continue
        else:
            continue

        mask = np.zeros_like(thresh)
        cv2.drawContours(mask, [cnt], -1, 255, -1)
        mean_val = cv2.mean(no_staff, mask=mask)[0]
        if mean_val > 127:
            continue

        if not (0.5 < aspect_ratio < 1.5):
            continue
        if solidity < 0.3 or roundness < 0.4:
            continue

        cx = x + w // 2
        cy = y + h // 2 + crop_start
        note = map_y_to_note(cy)
        if note:
            if detected_notes:
                last_cx, last_cy, _ = detected_notes[-1]
                if abs(cx - last_cx) < x_thresh and abs(cy - last_cy) < y_thresh:
                    continue
            detected_notes.append((cx, cy, note))

    detected_notes.sort()
    return [note for _, _, note in detected_notes], thresh, cropped_image
