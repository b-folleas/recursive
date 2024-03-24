from skimage import io, color, feature, measure

def perform_segmentation(image_path):
    """
    Perform segmentation on the given image to detect objects.

    Parameters:
    - image_path (str): The path to the input image file.

    Returns:
    - objects (list): A list of dictionaries, each containing information about an object detected in the image.
        Each dictionary has the following structure:
            {
                'id': str,  # Unique identifier for the object
                'coordinates': list of dicts,  # List of coordinates representing the object's contours
                    Each coordinate dictionary has the following structure:
                        {'x': int, 'y': int}  # Coordinates of a point on the contour
            }

    Example:
    If the input image contains two objects, the returned list might look like this:
        [
            { 'id': 'Object1', 'coordinates': [{'x': 100, 'y': 100}, {'x': 100, 'y': 200}, {'x': 200, 'y': 200}, {'x': 200, 'y': 100}] },
            { 'id': 'Object2', 'coordinates': [{'x': 300, 'y': 150}, {'x': 300, 'y': 250}, {'x': 400, 'y': 250}, {'x': 400, 'y': 150}] }
        ]
    """
    image = io.imread(image_path)

     # Vérifier si l'image est RGBA et la convertir en RGB si nécessaire
    if image.shape[2] == 4:
        image = color.rgba2rgb(image)

    # Charger l'image en niveaux de gris
    image_gray = color.rgb2gray(io.imread(image_path))

    # Appliquer un filtre de Canny pour détecter les contours
    edges = feature.canny(image_gray, sigma=3, low_threshold=10, high_threshold=50)

    # Trouver les contours dans l'image
    contours = measure.find_contours(edges, 0.5)

    # Récupérer les coordonnées des contours
    objects = []
    for idx, contour in enumerate(contours):
        # Chaque contour est une liste de coordonnées [y, x]
        coordinates = [{'x': int(x), 'y': int(y)} for y, x in contour]
        objects.append({'id': f'Object{idx + 1}', 'coordinates': coordinates})

    return objects
