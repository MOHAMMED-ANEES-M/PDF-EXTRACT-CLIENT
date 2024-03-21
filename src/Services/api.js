import axios from 'axios';

const BASE_URL = 'https://pdf-extract-server.onrender.com';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

const setTokenHeader = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

const fetchPdf = async () => {
  try {
    const response = await axiosInstance.get('/api/pdf/');
    return response.data;
  } catch (error) {
    console.error('Error fetching pdf:', error);
    throw error;
  }
};

const registerUser = async (data) => {
  try {
    const response = await axiosInstance.post('/api/users/register', data);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

const loginUser = async (data) => {
    try {
      const response = await axiosInstance.post('/api/users/login', data);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };

  const uploadPdf = async (formData) => {
    try {
      const response = await axiosInstance.post('/api/pdf/upload', formData,  {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading pdf:', error);
      throw error;
    }
  };

  const extractPdf = async (data) => {
    try {
      const response = await axiosInstance.post('/api/pdf/extract', data,{
        // body: JSON.stringify(data),
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      console.error('Error extracting pdf:', error);
      throw error;
    }
  }


export {
  BASE_URL,
  setTokenHeader,
  fetchPdf,
  registerUser,
  loginUser,
  uploadPdf,
  extractPdf,
};
