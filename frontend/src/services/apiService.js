const apiUrl = process.env.REACT_APP_BACKEND_URL;

const apiService = {
  uploadImage: async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${apiUrl}/upload`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error uploading image');
    }

    return response.json();
  }
};

export default apiService;
