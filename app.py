from flask import Flask, render_template, request, jsonify, redirect, url_for
import os
import base64
import io
import time 
from PIL import Image
import random
import google.generativeai as genai
import cv2
import os
import shutil

def get_api_key(file_path="api_key.txt"):
    with open(file_path, 'r') as f:
        api_key = f.read().strip()
    return api_key

model = None
app = None
global_words = ["cat", "dog", "house", "tree", "car", "flower", "sun", "moon", "star", "cloud"]

def create_app():
    global app
    app = Flask(__name__)

    global model
    GOOGLE_API_KEY = get_api_key()
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

    @app.route('/', methods=['GET', 'POST'])
    def index():
        selected_word = None

        if request.method == 'POST':
            selected_word = request.form['word']
            return redirect(url_for('canvas', word=selected_word))

        word_bank = random.choices(global_words, k=3)
        return render_template('start.html', word_bank=word_bank, selected_word=selected_word)

    @app.route('/canvas')
    def canvas():
        selected_word = request.args.get('word')
        return render_template('index.html', selected_word=selected_word)

    @app.route('/save_image', methods=['POST'])
    def save_image():
        # data = request.json
        # image_data = data['image']
        # image_data = image_data.split(',')[1]  # Remove data URL header
        # image = Image.open(io.BytesIO(base64.b64decode(image_data)))
        # image_path = f"static/uploads/drawing_{int(time.time())}.png"
        # image.save(image_path)

        video_file_name = "static/uploads/video.mp4"
        
        user_file = genai.upload_file(path=video_file_name)
        response = model.generate_content(["Write a one word answer to see what this image is:", user_file])
        print(response.text)
        
        return jsonify({'message': 'Image saved successfully.', 'response': response.text})

if __name__ == '__main__':
    create_app()
    app.run(debug=True)
