from flask import Flask, render_template, request, jsonify, redirect, url_for
from PIL import Image
# import google.generativeai as genai

def get_api_key(file_path="api_key.txt"):
    with open(file_path, 'r') as f:
        api_key = f.read().strip()
    return api_key

model = None
app = None
global_words = ["cat", "dog", "house", "tree", "car", "flower", "sun", "moon", "star", "cloud"]

def create_app():
    global app
    app = Flask(__name__, static_folder='static')

    # global model
    # GOOGLE_API_KEY = get_api_key()
    # genai.configure(api_key=GOOGLE_API_KEY)
    # model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

    @app.route('/', methods=['GET', 'POST'])
    def index():
        return render_template('frontend/index.html')

if __name__ == '__main__':
    create_app()
    app.run(debug=True)
