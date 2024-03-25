import apiService from './apiConfig';

export const calculateRepresentation = async (imagePath) => {
    try {
        const formData = new FormData();
        formData.append('image_path', imagePath);
        const response = await apiService.post(`/representation`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default calculateRepresentation;


