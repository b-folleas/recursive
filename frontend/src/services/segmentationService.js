import apiService from './apiConfig';

// Fonction pour effectuer la segmentation (Algorithm A) sur une image
export const performSegmentation = async (imagePath) => {
    try {
        const response = await apiService.post(`/segmentation`, { image_path: imagePath });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default performSegmentation;
