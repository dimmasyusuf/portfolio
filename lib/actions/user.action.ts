import axios from 'axios';
import { handleError } from '../utils';

export const getUserProfile = async (email: string) => {
  try {
    const response = await axios.get(`/api/users/${email}`);
    return response.data.user;
  } catch (error) {
    handleError(error);
  }
};
