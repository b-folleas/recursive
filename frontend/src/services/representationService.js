import apiService from './apiConfig';

// Fonction pour calculer la représentation (Algorithm B) pour un crop d'image
export const calculateRepresentation = async (image) => {
    try {
        const formData = new FormData();
        formData.append('image', image);
        const response = await apiService.post(`/representation`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default calculateRepresentation;


