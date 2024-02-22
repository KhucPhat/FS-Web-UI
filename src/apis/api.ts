import axios, { AxiosRequestConfig } from 'axios';
import { USER_TOKEN, API_URL } from '../utils/config';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10 * 1000,
  validateStatus: (status) => status < 500,
});

export const apiProtected = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10 * 1000,
  validateStatus: (status) => status < 500,
});

export const login = async ({ email, password }: any) => {
  try {
    const res = await api.post(
      '/user/auth/login',
      {
        email,
        password,
      },
      { credentials: 'include' }
    );
    return res.data;
  } catch (e) {
    return { error: 'server_error' };
  }
};

export const register = async ({ email, password, name }: any) => {
  try {
    const res = await api.post(
      '/user/auth/register',
      {
        email,
        password,
        name,
      },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (e) {
    return { error: 'server_error' };
  }
};

export const logout = async () => {
  try {
    const res = await apiProtected.post('/logout');
    return res.data;
  } catch (e) {
    return { error: 'server_error' };
  }
};

export const forgotPassword = async (data: any) => {
  try {
    const res = await api.post('/forgot-password', data);
    return res.data;
  } catch (e) {
    return { error: 'server_error' };
  }
};

export const me = async () => {
  try {
    const res = await apiProtected.post('/user/auth/profile');
    return res.data;
  } catch (e) {
    return { error: 'server_error' };
  }
};
