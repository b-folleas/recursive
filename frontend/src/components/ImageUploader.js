import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CustomSnackbar from './CustomSnackbar';
import { ping } from '../services/pingService';
import { performSegmentation } from '../services/segmentationService';
import { calculateRepresentation } from '../services/representationService';
import { uploadImage } from '../services/uploadService';

function ImageUploader() {
    const [image, setImage] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    // Test connection to backend on component load
    useEffect(() => {
        const testConnection = async () => {
            try {
                const result = await ping();
                console.log(result);
            } catch (error) {
                console.error('Error while testing the connection:', error.message);
                setSnackbar({ open: true, message: 'Error while testing the connection' })
            }
        };

        testConnection();
    }, []);

    const setSelectedImage = async (selectedImage, imagePath = null) => {
        const imageProperties = {
            file: selectedImage,
            previewUrl: URL.createObjectURL(selectedImage),
            fileName: selectedImage.name
        }
        if (imagePath) imageProperties.imagePath = imagePath
        if (selectedImage) {
            setImage(imageProperties);
        }
    };

    const setImagePath = async (imagePath) => {
        image.imagePath = imagePath
    };

    const handleImageChange = async (event) => {
        const selectedImage = event.target.files[0];
        setSelectedImage(selectedImage)
    };

    const handleDrop = async (event) => {
        event.preventDefault();
        const selectedImage = event.dataTransfer.files[0];
        setSelectedImage(selectedImage)
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleImportClick = () => {
        document.getElementById('import-input').click();
    };

    const handleUploadClick = async () => {
        if (!image) {
            console.error('No image selected');
            setSnackbar({ open: true, message: 'No image selected' })
            return;
        }
        console.log(image)
        try {
            const result = await uploadImage(image.file);
            console.log('Upload result:', result);
            setImagePath(result.imagePath);
            setSnackbar({ open: true, message: result.message })
        } catch (error) {
            console.error('Error during upload:', error.message);
            setSnackbar({ open: true, message: 'Error during upload' })
        }
    };

    const handleSegmentationClick = async () => {
        if (!image) {
            console.error('No image selected');
            setSnackbar({ open: true, message: 'No image selected' })
            return;
        }
        try {
            const result = await performSegmentation(image.imagePath);
            console.log('Segmentation result:', result);
            // Retrieve the img element
            const imageElement = document.getElementById('segmentedImage');
            // Recover image in base64
            const base64Image = "data:image/png;base64, " + result.image;
            console.log('base64Image', base64Image)
            // Set image as source of img element
            imageElement.src = base64Image;
            setSnackbar({ open: true, message: result.message })
        } catch (error) {
            console.error('Error performing segmentation:', error.message);
            setSnackbar({ open: true, message: 'Error performing segmentation' })
        }
    };

    const handleRepresentationClick = async () => {
        if (!image) {
            console.error('No image selected');
            setSnackbar({ open: true, message: 'No image selected' })
            return;
        }
        try {
            const result = await calculateRepresentation(image.imagePath);
            console.log('Representation result:', result);
            setSnackbar({ open: true, message: result.message })
        } catch (error) {
            console.error('Error calculating representation:', error.message);
            setSnackbar({ open: true, message: 'Error calculating representation' })
        }
    };

    return (
        <div>
             <Stack spacing={2} direction="row" justifyContent="center">
                <Button onClick={handleImportClick} color="secondary" variant="contained">Importer une image</Button>
                <Button onClick={handleUploadClick} color="secondary" variant="contained">Uploader une image</Button>
                <Button onClick={handleSegmentationClick} color="primary" variant="contained">Segmentation</Button>
                <Button onClick={handleRepresentationClick} color="primary" variant="contained" disabled>Représentation</Button>
            </Stack>
            <br />
            <label htmlFor="import-input">
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    style={{ border: '2px dashed #aaa', borderRadius: '5px', padding: '20px', textAlign: 'center', cursor: 'pointer', width: '800px', height: '200px', margin: 'auto' }}
                >
                    Drag and drop an image here or click to select a file
                </div>
            </label>
            <input
                id="import-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
            />

            {image && (
                <div>
                    <div>
                        <h2>Image preview ({image.fileName})</h2>
                        <img src={image.previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                    </div>
                    <div>
                        <h2>Segmented image</h2>
                        <img id="segmentedImage" src={image} alt="Segmented" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                    </div>
            </div>
            )}
            <CustomSnackbar message={snackbar.message} open={snackbar.open} />
        </div>
    );
}

export default ImageUploader;