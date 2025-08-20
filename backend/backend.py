from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np
import face_recognition
import pickle
import os
import datetime

app = Flask(__name__)
CORS(app)

DB_DIR = './db'
PHOTOS_DIR = './db/photos'
PICKLES_DIR = './db/pickles'
LOG_PATH = './log.txt'

def decode_image(base64_str):
    img_bytes = base64.b64decode(base64_str.split(',')[1])
    np_arr = np.frombuffer(img_bytes, np.uint8)
    return cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

def recognize_user(img):
    encodings_unknown = face_recognition.face_encodings(img)
    if not encodings_unknown:
        return 'no_persons_found'
    enc_unknown = encodings_unknown[0]

    for file in os.listdir(PICKLES_DIR):
        if file.endswith('.pickle'):
            with open(os.path.join(PICKLES_DIR, file), 'rb') as f:
                known_enc = pickle.load(f)
            if face_recognition.compare_faces([known_enc], enc_unknown, tolerance=0.4)[0]:
                return file[:-7]  # Remove .pickle extension
    return 'unknown_person'

def face_already_exists(img):
    """Check if the face in the image already exists in the database"""
    encodings_unknown = face_recognition.face_encodings(img)
    if not encodings_unknown:
        return False, None
    
    enc_unknown = encodings_unknown[0]
    
    for file in os.listdir(PICKLES_DIR):
        if file.endswith('.pickle'):
            with open(os.path.join(PICKLES_DIR, file), 'rb') as f:
                known_enc = pickle.load(f)
            if face_recognition.compare_faces([known_enc], enc_unknown, tolerance=0.4)[0]:
                existing_name = file[:-7]  # Remove .pickle extension
                return True, existing_name
    return False, None

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    image = decode_image(data['image'])
    name = recognize_user(image)

    if name in ['no_persons_found', 'unknown_person']:
        return jsonify(success=False, message='Face not recognized.')

    with open(LOG_PATH, 'a') as f:
        f.write(f'{name},{datetime.datetime.now()},in\n')

    # Load stored image from photos folder
    image_path = os.path.join(PHOTOS_DIR, f'{name}.jpg')
    if not os.path.exists(image_path):
        return jsonify(success=False, message='Stored image not found.')

    stored_image = cv2.imread(image_path)
    _, buffer = cv2.imencode('.jpg', stored_image)
    img_b64 = base64.b64encode(buffer).decode('utf-8')

    return jsonify(success=True, name=name, image=img_b64)

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name', '').strip()

    if not name:
        return jsonify(success=False, message='Name is required.')

    image = decode_image(data['image'])
    if image is None:
        return jsonify(success=False, message='Invalid image data.')

    encodings = face_recognition.face_encodings(image)
    if not encodings:
        return jsonify(success=False, message='No face detected.')

    # Check if user already exists with this name
    pickle_path = os.path.join(PICKLES_DIR, f'{name}.pickle')
    if os.path.exists(pickle_path):
        return jsonify(success=False, message='User already exists.')

    # Check if this face already exists with a different name
    face_exists, existing_name = face_already_exists(image)
    if face_exists:
        return jsonify(success=False, message=f'This face is already registered as "{existing_name}". Cannot register the same person with multiple names.')

    # Save encoding to pickles folder
    with open(pickle_path, 'wb') as f:
        pickle.dump(encodings[0], f)

    # Save image to photos folder
    photo_path = os.path.join(PHOTOS_DIR, f'{name}.jpg')
    cv2.imwrite(photo_path, image)

    return jsonify(success=True, name=name)

 

if __name__ == '__main__':
    # Create directories if they don't exist
    os.makedirs(DB_DIR, exist_ok=True)
    os.makedirs(PHOTOS_DIR, exist_ok=True)
    os.makedirs(PICKLES_DIR, exist_ok=True)
    
    app.run(debug=True)
