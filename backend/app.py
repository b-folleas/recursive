from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app) # Activate CORS

@app.route('/')
def index():
    return "/home"

@app.route('/ping', methods=['GET'])
def ping():
    """
    Endpoint to perform a connection test.
    """
    return jsonify('pong')

# Endpoint for Algorithm A
@app.route('/segmentation', methods=['POST'])
def segmentation():
    """
    Endpoint to perform segmentation (Algorithm A) on an image.

    Expected Input:
    - JSON payload with key 'image_path' containing the path to the uploaded image.

    Returns:
    - JSON response with a list of objects detected in the image.
    """
    # Get image path from request
    image_path = request.json.get('image_path')

    # Implement Algorithm A logic here
    # Perform segmentation and return objects
    # For demonstration purposes, returning dummy data
    objects = [{'x': 100, 'y': 100}, {'x': 200, 'y': 200}] 

    return jsonify(objects)

# Endpoint for Algorithm B
@app.route('/representation', methods=['POST'])
def representation():
    """
    Endpoint to calculate image representation (Algorithm B) for an image crop.

    Expected Input:
    - JSON payload with key 'image_path' containing the path to a crop of the original image.

    Returns:
    - JSON response with the representation vector describing the image contents.
    """
    # Get image path from request
    image_path = request.json.get('image_path')

    # Implement Algorithm B logic here
    # Perform representation calculation and return result
    # For demonstration purposes, returning dummy data
    representation = [0.1, 0.2, 0.9]

    return jsonify(representation)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
