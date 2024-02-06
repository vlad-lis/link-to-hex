import axios, { AxiosError } from 'axios';
import { BASE_URL } from './constants';

export type TAuthResult = {
  success: boolean;
  statusCode?: number;
  token?: string;
};

const basicAuthUsername = process.env.BASIC_AUTH_USERNAME;
const basicAuthPassword = process.env.BASIC_AUTH_PASSWORD;
const authHeader: string = `Basic ${btoa(`${basicAuthUsername}:${basicAuthPassword}`)}`;

// register
export const signUp = async (
  username: string,
  password: string
): Promise<TAuthResult> => {
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

// log in
export const signIn = async (
  username: string,
  password: string
): Promise<TAuthResult> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      { username, password },
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    return {
      success: true,
      statusCode: response.status,
      token: response.data.access_token,
    };
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return { success: false, statusCode: err.response?.status };
    }

    console.error('An unknown error occurred: ', err);
    return { success: false, statusCode: undefined };
  }
};
