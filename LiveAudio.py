import numpy as np
import pyaudio
import aubio
from NoteTrackerClass import NoteTracker
from SheetNoteDetector import extract_notes_from_pdf

# Audio stream parameters
FORMAT = pyaudio.paFloat32
CHANNELS = 1
RATE = 44100  # Sampling Rate
CHUNK = 1024  # Buffer size

# Initialize PyAudio
p = pyaudio.PyAudio()

# Open audio stream
stream = p.open(format=FORMAT,
                channels=CHANNELS,
                rate=RATE,
                input=True,
                frames_per_buffer=CHUNK)

# Initialize aubio pitch detection
pitch_detector = aubio.pitch("default", CHUNK, CHUNK // 2, RATE)
pitch_detector.set_unit("Hz")
pitch_detector.set_silence(-25)  # Set threshold for silence detection


# Function to map frequency to the nearest note
def freq_to_note(freq):
    if freq == 0:
        return "No Note"
    note_names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    # Standard MIDI note calculation: 69 corresponds to A4 (440 Hz)
    midi_note = 69 + 12 * np.log2(freq / 440.0)
    rounded_note = int(round(midi_note))
    note_index = rounded_note % 12
    octave = (rounded_note // 12) - 1
    return f"{note_names[note_index]}{octave}"


print("Listening for piano notes... Press Ctrl+C to stop.")

try:
    tracker = NoteTracker(["C4", "E4", "G4", "C5"])
    # sheet_notes = extract_notes_from_pdf("Examples/Example2.pdf")
    # tracker = NoteTracker(sheet_notes)
    print(tracker)
    while True:
        data = stream.read(CHUNK, exception_on_overflow=False)
        samples = np.frombuffer(data, dtype=np.float32)
        pitch = pitch_detector(samples[:CHUNK // 2])[0]  # Detect pitch
        # print(pitch)
        if pitch > 0:
            note = freq_to_note(pitch)
            # print(f"Detected Note: {note} (Frequency: {pitch:.2f} Hz)")
            tracker.match(note)


except KeyboardInterrupt:
    print("\nStopping...")

finally:
    stream.stop_stream()
    stream.close()
    p.terminate()
