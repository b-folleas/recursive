from io import BytesIO
from PIL import Image
from skimage import io, measure, filters, color, morphology


def ndarray_to_image(array):
    """
    Convert a numpy array to an image in PNG format.

    Parameters:
    - array (numpy.ndarray): The numpy array representing the image.

    Returns:
    - image_bytes (BytesIO): A BytesIO object containing the image in PNG format.
    """
    # Convert the numpy array to a PIL image
    image_pil = Image.fromarray(array.astype('uint8'))

    # Save the image to a BytesIO object
    image_bytes = BytesIO()
    image_pil.save(image_bytes, format='PNG')
    image_bytes.seek(0)

    # Convert BytesIO to bytes
    return image_bytes.getvalue()


def perform_segmentation(image_path):
    # Load the image
    image = io.imread(image_path)

    # Check if the image has an alpha channel
    if image.shape[-1] == 4:
        # Remove the alpha channel
        image = image[..., :3]
    
    # Convert the image to grayscale
    image_gray = color.rgb2gray(image)
    
    # Apply an adaptive thresholding filter
    threshold = filters.threshold_yen(image_gray) # threshold_li
    
    # Segment the image based on the threshold
    binary_image = image_gray > threshold

    # Clean the image
    cleaned_image = morphology.remove_small_objects(binary_image < 0.95, min_size=500)  # Example of cleaning

    # Label the regions
    labeled_image = measure.label(cleaned_image, connectivity=2)
    
    # Get the properties of the regions
    regions = measure.regionprops(labeled_image)
    
    # Draw rectangles around the objects
    objects_info = []
    for region in regions:
        # Check if the region has valid bounding box coordinates
        if hasattr(region, 'bbox'):
            obj_info = { "bbox": region.bbox } # Add other information you want to retrieve
            objects_info.append(obj_info)
            minr, minc, maxr, maxc = region.bbox
            border_width = 5  # Adjust the desired width
            # Ensure the coordinates are within the image bounds
            minr = max(0, minr - border_width)
            minc = max(0, minc - border_width)
            maxr = min(image.shape[0], maxr + border_width)
            maxc = min(image.shape[1], maxc + border_width)
            # Draw the rectangle on the image
            image[minr:maxr, minc:minc+2] = (255, 0, 0)  # Left border
            image[minr:maxr, maxc-2:maxc] = (255, 0, 0)  # Right border
            image[minr:minr+2, minc:maxc] = (255, 0, 0)  # Top border
            image[maxr-2:maxr, minc:maxc] = (255, 0, 0)  # Bottom border
    
    # Convert the image with contours to PNG format
    image_bytes = ndarray_to_image(image)

    # Return the modified image and information about the detected objects
    return image_bytes, objects_info
