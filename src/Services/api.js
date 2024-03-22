import axios from 'axios';

const BASE_URL = 'https://pdf-extract-server.onrender.com';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set token header for authentication
const setTokenHeader = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Function to fetch PDF data from the server
const fetchPdf = async () => {
  try {
    const response = await axiosInstance.get('/api/pdf/');
    return response.data;
  } catch (error) {
    console.error('Error fetching pdf:', error);
    throw error;
  }
};

// Function to register a new user
const registerUser = async (data) => {
  try {
    const response = await axiosInstance.post('/api/users/register', data);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Function to log in an existing user
const loginUser = async (data) => {
    try {
      const response = await axiosInstance.post('/api/users/login', data);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };

  // Function to upload a PDF file to the server
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

  // Function to extract pages from a PDF file
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
