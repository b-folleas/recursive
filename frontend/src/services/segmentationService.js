import apiService from './apiConfig';

export const performSegmentation = async (imagePath) => {
    try {
        const formData = new FormData();
        formData.append('image_path', imagePath);
        const response = await apiService.post(`/segmentation`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default performSegmentation;
