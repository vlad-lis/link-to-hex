import axios, { AxiosError } from 'axios';
import { BASE_URL } from './constants';

type TSqueezeResult = {
  success: boolean;
  short?: string;
  statusCode?: number;
};

export type TStatsObject = {
  id: number;
  short: string;
  target: string;
  counter: number;
};

type TStatsResult = {
  success: boolean;
  total?: number;
  data?: TStatsObject[];
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

// get stats
export const getStats = async (
  offset: string = '0',
  limit: string = '10',
  order: string[] = ['desc_counter']
): Promise<TStatsResult> => {
  try {
    const token = sessionStorage.getItem('token');

    let orderParams;
    if (order && order.length > 0) {
      orderParams = order.length === 1 ? order[0] : order;
    }

    const response = await axios.get(`${BASE_URL}/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { offset, limit, order: orderParams },
    });

    return {
      success: true,
      total: +response.headers['x-total-count'],
      data: response.data,
    };
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return { success: false, statusCode: err.response?.status };
    }

    console.error('An unknown error occurred: ', err);
    return { success: false, statusCode: undefined };
  }
};
