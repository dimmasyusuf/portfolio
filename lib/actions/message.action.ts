import axios from 'axios';
import { handleError } from '../utils';

export const createMessage = async (text: string) => {
  try {
    const response = await axios.post('/api/messages', { text });
    return response.data.userMessage;
  } catch (error) {
    handleError(error);
  }
};

export const getAllMessages = async () => {
  try {
    const response = await axios.get('/api/messages');
    return response.data.messages;
  } catch (error) {
    handleError(error);
  }
};
