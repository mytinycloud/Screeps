# backend/app.py
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')
CORS(app)

notes = []

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/notes', methods=['GET', 'POST'])
def handle_notes():
    if request.method == 'POST':
        note = request.json
        notes.append(note)
        return jsonify(note), 201
    return jsonify(notes)

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
