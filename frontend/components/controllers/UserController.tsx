import axios from 'axios';

export const BASE_URL = process.env.NEXT_INVESTMENT_API_BASE_URL || 'http://localhost:7007';

export const userController = () => {

  const getUserToken = () => {
    const token = localStorage.getItem("authToken");
    return token;
  };

  // At use in AuthContext
  const registerUser = async (username: string, password: string): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}/user/register`, { username, password });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'An unexpected error occurred' };
    }
  };

  // At use in AuthContext
  const loginUser = async (username: string, password: string): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, { username, password });
      const { token, user } = response.data;
      console.log(user);
      if (token) {
        localStorage.setItem('authToken', token);
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Invalid username or password' };
    }
  };

  // Function to fetch user data
  const getUserData = async (token: string): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/user/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch user data' };
    }
  };

  // Function to update user data
const updateUserData = async (
  token: string,
  updates: Partial<{
    email: string;
    phone: string;
    address: string;
    profile_picture: string;
    username: string;
    firstName: string;
    lastName: string;
  }>
): Promise<any> => {
  try {
    // Make sure at least one field is provided
    if (Object.keys(updates).length === 0) {
      throw { message: 'No valid fields to update' };
    }

    // Optional: Validation on specific fields
    if (updates.username && typeof updates.username !== 'string') {
      throw { message: 'Username must be a string' };
    }
    if (updates.firstName && typeof updates.firstName !== 'string' && updates.firstName !== null) {
      throw { message: 'First name must be a string or null' };
    }
    if (updates.lastName && typeof updates.lastName !== 'string' && updates.lastName !== null) {
      throw { message: 'Last name must be a string or null' };
    }
    if (updates.email && typeof updates.email !== 'string') {
      throw { message: 'Email must be a string' };
    }
    if (updates.phone && typeof updates.phone !== 'string') {
      throw { message: 'Phone must be a string' };
    }
    if (updates.address && typeof updates.address !== 'string' && updates.address !== null) {
      throw { message: 'Address must be a string or null' };
    }
    if (updates.profile_picture && typeof updates.profile_picture !== 'string' && updates.profile_picture !== null) {
      throw { message: 'Profile picture must be a string or null' };
    }

    // Send the PUT request to the backend
    const response = await axios.put(
      `${BASE_URL}/user/update`,
      updates,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Return the response data from the backend
  } catch (error: any) {
    // Handle errors and provide meaningful messages
    throw error.response?.data || { message: 'Failed to update user data' };
  }
};

const deleteUserData = async (token: string): Promise<any> => {
  try {
    const response = await axios.delete(`${BASE_URL}/user/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Failed to delete user data' };
  }
};

  return { getUserToken, registerUser, loginUser, getUserData, updateUserData, deleteUserData };
};
