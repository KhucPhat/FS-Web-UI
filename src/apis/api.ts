import axios, { AxiosRequestConfig } from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const fetchAPI = async (
  endPoint: string,
  method: string,
  params: null,
  formdata: any
) => {
  const configs: AxiosRequestConfig = {
    url: `${API_URL}/api/v1${endPoint}`,
    method,
    headers: {
      Authorization: `Bearer ${USER_TOKEN}`,
    },
    params,
    data: formdata,
  };

  const response = await axios(configs);
  return response;
};
// export const api = axios.create({
//     baseURL: API_URL,
//     withCredentials: true,
//     headers: { 'Content-Type': 'application/json' },
//     timeout: 10 * 1000,
//     validateStatus: (status) => status < 500,
// });

export const register = async (data: any) => {
  return fetchAPI('/register', 'POST', null, data);
};
