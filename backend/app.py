from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({
        'message': 'Data successfully fetched from Flask backend!',
        'items': ['Item 1', 'Item 2', 'Item 3']
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)