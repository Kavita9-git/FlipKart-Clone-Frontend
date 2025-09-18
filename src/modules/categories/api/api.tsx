import axios from 'axios';

export const getCategoriesApi = async () => {
  const response = await axios.get('https://flipkart-clone-backend-8b5e.onrender.com/category');
  return response;
};
