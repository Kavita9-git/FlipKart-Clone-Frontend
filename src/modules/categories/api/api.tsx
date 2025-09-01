import axios from 'axios';

export const getCategoriesApi = async () => {
  const response = await axios.get('http://192.168.29.201:8080/category');
  return response;
};
