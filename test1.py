import google.generativeai as genai

def get_api_key(file_path="api_key.txt"):
  with open(file_path, 'r') as f:
    api_key = f.read().strip()
  return api_key

def read_file(file_path):
  with open(file_path, 'r') as f:
    content = f.read()
  return content


GOOGLE_API_KEY = get_api_key()
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel(model_name="gemini-pro")
response = model.generate_content("Ws in the chat")
print(response.text)
