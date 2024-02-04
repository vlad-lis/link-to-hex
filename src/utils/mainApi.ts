import axios, { AxiosError } from 'axios';
import { BASE_URL } from './constants';

type TSqueezeResult = {
  success: boolean;
  short?: string;
  statusCode?: number;
};

// squeeze link
export const squeezeLink = async (link: string): Promise<TSqueezeResult> => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/squeeze`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        link,
      },
    });

    return { success: true, short: response.data.short };
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return { success: false, statusCode: err.response?.status };
    }

    console.error('An unknown error occurred: ', err);
    return { success: false, statusCode: undefined };
  }
};

export const getStats = 'placeholder';
