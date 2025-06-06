from music21 import converter

score = converter.parse('Examples/Winter_Vivaldi.mxl')
print(score)
for note in score.recurse().notes[0:10]:
    print(note.nameWithOctave, note.quarterLength)