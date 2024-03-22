import apiService from './apiConfig';

export const ping = async () => {
  try {
    const response = await apiService.get(`/ping`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default ping;
