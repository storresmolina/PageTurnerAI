from collections import deque


class NoteTracker:
    def __init__(self, expected_notes):
        self.expected_notes = deque(expected_notes)

    def match(self, detected_note):
        if self.expected_notes and detected_note == self.expected_notes[0]:
            print(f"Matched: {detected_note}")
            self.expected_notes.popleft()
            if not self.expected_notes:
                print("End of page reached – TURN PAGE")
                return True  # signal for page turn
        return False

    def __str__(self):
        return (f"There are {len(list(self.expected_notes))} remaining notes. \n"
                f"Remaining notes {list(self.expected_notes)}")
