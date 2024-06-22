from transformers import pipeline
from flask import Flask, jsonify, request
from waitress import serve

app = Flask(__name__)

classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

subjects = [
    "politics war ",
    "sport",
    "culture",
    "knowledge",
    "technology AI",
]

titles = [
    "politics",
    "sport",
    "culture",
    "knowledge",
    "technology",
]

# Klassifizieren der Texte
def classify(text):
    result = classifier(text, subjects)

    classification = {}
    for label, score in zip(result['labels'], result['scores']):
        index = subjects.index(label)
        title = titles[index]
        classification[title] = score

    return classification

@app.route('/api/classify', methods=['POST'])
def add_book():
    article = request.get_json()
    
    subject = classify(article['description'])

    return jsonify(subject), 200

serve(
    app, 
    host="0.0.0.0", 
    port = 8000,
    connection_limit = 50,
    threads = 10,
)
