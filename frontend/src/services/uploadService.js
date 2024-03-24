import apiService from './apiConfig';

// Fonction to upload an image on the backend server
export const uploadImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append('image', image);
        console.log('formData', formData)
        const response = await apiService.post(`/upload`, formData, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'multipart/form-data'
            }
          });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default uploadImage;


