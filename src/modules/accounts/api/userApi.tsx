// src/api/userApi.tsx

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Change to your backend URL

const userApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Register user
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await userApi.post('/users/register', userData);
    return res.data;
  } catch (err: any) {
    throw err.response?.data?.message || 'Registration failed';
  }
};

// Login user
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const res = await userApi.post('/users/login', credentials);
    return res.data;
  } catch (err: any) {
    throw err.response?.data?.message || 'Login failed';
  }
};

// Get user profile
export const getUserProfile = async (token: string) => {
  try {
    const res = await userApi.get('/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    throw err.response?.data?.message || 'Could not fetch user profile';
  }
};

// Update user profile
export const updateUserProfile = async (
  token: string,
  updatedData: {
    name?: string;
    email?: string;
    password?: string;
  }
) => {
  try {
    const res = await userApi.put('/users/profile', updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    throw err.response?.data?.message || 'Update failed';
  }
};
