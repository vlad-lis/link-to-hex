import axios, { AxiosError } from 'axios';
import {
  BASE_URL,
  BASIC_AUTH_USERNAME,
  BASIC_AUTH_PASSWORD,
} from './constants';

type TResult = {
  success: boolean;
  statusCode?: number;
  token?: string;
};

const authHeader: string = `Basic ${btoa(`${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`)}`;

export const signUp = async (
  username: string,
  password: string
): Promise<TResult> => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, null, {
      headers: {
        Authorization: authHeader,
      },
      params: {
        username,
        password,
      },
    });

    return { success: true, statusCode: response.status };
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return { success: false, statusCode: err.response?.status };
    }

    console.error('An unknown error occurred: ', err);
    return { success: false, statusCode: undefined };
  }
};

export const signIn = async (
  username: string,
  password: string
): Promise<TResult> => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, null, {
      headers: {
        Authorization: authHeader,
      },
      params: {
        username,
        password,
      },
    });

    console.log(response);

    return { success: true, statusCode: response.status, token: '' };
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      console.log(err);
      return { success: false, statusCode: err.response?.status };
    }

    console.error('An unknown error occurred: ', err);
    return { success: false, statusCode: undefined };
  }
};
