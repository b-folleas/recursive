import apiService from './apiConfig';

// Fonction pour calculer la représentation (Algorithm B) pour un crop d'image
export const calculateRepresentation = async (imagePath) => {
    try {
        const response = await apiService.post(`/representation`, { image_path: imagePath });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default calculateRepresentation;


