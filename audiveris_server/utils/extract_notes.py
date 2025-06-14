from xml import etree     # Consider using music21 to include duration extraction too?
import zipfile
import os

def parse_musicxml(mxl_file):
    # Unzip .mxl file
    with zipfile.ZipFile(mxl_file, 'r') as zip_ref:
        zip_ref.extractall("temp_musicxml")
    
    xml_file = None
    for fname in os.listdir("temp_musicxml"):
        if fname.endswith(".xml"):
            xml_file = os.path.join("temp_musicxml", fname)
            break
    
    if not xml_file:
        raise FileNotFoundError("XML file not found inside MXL.")
    
    tree = etree.parse(xml_file)
    root = tree.getroot()
    ns = {'m': 'http://www.musicxml.com/ns/1.0'}

    notes = []
    for note in root.xpath(".//ns:note", namespaces=ns):
        pitch = note.find("ns:pitch", namespaces=ns)
        if pitch is not None:
            step = pitch.findtext("ns:step", namespaces=ns)
            octave = pitch.findtext("ns:octave", namespaces=ns)
            if step and octave:
                notes.append(f"{step}{octave}")

    return notes