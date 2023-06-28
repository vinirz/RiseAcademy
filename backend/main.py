from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app) 

@app.route('/<int:index>')
def get_item_by_index(index):
    try:
        with open('dados.txt', 'r', encoding='utf-8') as file:
            json_data = file.read()
            data = json.loads(json_data)
            if index >= 0 and index < len(data):
                item = data[index-1]
                return jsonify(item)
            else:
                return "Índice inválido"
    except FileNotFoundError:
        return "Arquivo não encontrado"

@app.route('/')
def get_all_data():
    try:
        with open('dados.txt', 'r', encoding='utf-8') as file:
            json_data = file.read()
            data = json.loads(json_data)
            return jsonify(data)
    except FileNotFoundError:
        return "Arquivo não encontrado"

if __name__ == '__main__':
    app.run()