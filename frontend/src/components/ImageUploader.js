import React, { useState, useEffect } from 'react';
import { ping } from '../services/pingService';
import { performSegmentation } from '../services/segmentationService';
import { calculateRepresentation } from '../services/representationService';

// import { ping, performSegmentation, calculateRepresentation } from '../services/apiService';

function ImageUploader() {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const testConnection = async () => {
            try {
                const result = await ping();
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        };

        testConnection();
    }, []);

    const handleImageChange = async (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
          const imageUrl = URL.createObjectURL(selectedImage);
          setImage({
            file: selectedImage,
            previewUrl: imageUrl,
            fileName: selectedImage.name
          });
    
          try {
            const segmentationResults = await performSegmentation(selectedImage);
            console.log('Segmentation results:', segmentationResults);
            const representationResults = await calculateRepresentation(selectedImage);
            console.log('Representation results:', representationResults);
          } catch (error) {
            console.error(error);
          }
        }
    };
    
    const handleDrop = (event) => {
        event.preventDefault();
        const selectedImage = event.dataTransfer.files[0];
        if (selectedImage) {
            const imageUrl = URL.createObjectURL(selectedImage);
            setImage({
                file: selectedImage,
                previewUrl: imageUrl,
                fileName: selectedImage.name
            });
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleUploadClick = () => {
        document.getElementById('upload-input').click();
    };

    return (
        <div>
            <label htmlFor="upload-input">
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    style={{ border: '2px dashed #aaa', borderRadius: '5px', padding: '20px', textAlign: 'center', cursor: 'pointer', width: '800px', height: '200px', margin: 'auto' }}
                >
                    Glissez et déposez une image ici ou cliquez pour sélectionner un fichier
                </div>
            </label>
            <button onClick={handleUploadClick} style={{ marginTop: '10px' }}>Uploader une image</button>
            <input
                id="upload-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
            />

            {image && (
                <div>
                    <h2>Preview de l'image ({image.fileName})</h2>
                    <img src={image.previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </div>
            )}
        </div>
    );
}

export default ImageUploader;
