import axios from 'axios';

export const getCategoriesApi = async () => {
  const response = await axios.get('http://localhost:8080/category');
  return response;
};
