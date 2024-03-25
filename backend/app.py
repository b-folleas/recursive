import os
import base64

from flask import Flask, request, jsonify
from flask_cors import CORS
from segmentation import perform_segmentation


app = Flask(__name__)

CORS(app) # Activate CORS

UPLOAD_FOLDER = './images'

@app.route('/ping', methods=['GET'])
def ping():
    """
    Endpoint to perform a connection test.
    """
    return jsonify('pong')


@app.route('/upload', methods=['POST'])
def upload_image():
    global UPLOAD_FOLDER # Declare constant as global to access it in this context
    if 'image' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    filename = file.filename
    file_path = os.path.join(UPLOAD_FOLDER, filename)

    # Check if the file already exists, then delete it
    if os.path.exists(file_path):
        os.remove(file_path)

    # Save the new file
    file.save(file_path)

    return jsonify({'message': 'Image uploaded successfully', 'imagePath': os.path.join(UPLOAD_FOLDER, filename)})


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
    image_path = request.json.get('image_path')

    if image_path is None:
        return jsonify({'error': 'No image provided'}), 400

    # Perform segmentation using the perform_segmentation function
    image_bytes, objects = perform_segmentation(image_path)

    # Convert the image to base64 to include it in a JSON response
    image_base64 = base64.b64encode(image_bytes).decode('utf-8')

    if not image_base64:
        return jsonify({'error': 'Could not convert segmented image'}), 400

    return jsonify({'message': 'Segmentation performed successfully', 'result': objects, 'image': image_base64})

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
    image_path = request.json.get('image_path')

    if image_path is None:
        return jsonify({'error': 'No image provided'}), 400

    # Implement representation calculation logic here
    # Example: Calculate representation vector for the uploaded image

    # For demonstration purposes, returning dummy data
    representation = [0.1, 0.2, 0.9]

    return jsonify({'message': 'Representation calculated successfully', 'result': representation})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
