import { Auth } from 'aws-amplify';
import axios from 'axios';
import '@/config/awsConfig';

export const B2BApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL_DEV,
  responseType: 'json',
});

B2BApi.interceptors.request.use(async (config) => {
  const token = await Auth.currentSession().then((result) => {
    return result.getIdToken().getJwtToken();
  });
  config.headers.Authorization = token;
  config.headers['Content-Type'] = 'application/json';

  return config;
});

B2BApi.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const data: any = {
      ...error.response.data.error,
      status: error.response.status,
    };
    return Promise.reject(data);
  }
);

export const B2BApiMock = axios.create({
  baseURL: 'https://private-36ba8-b2breservas.apiary-mock.com/',
  responseType: 'json',
});

export const viaCEP = axios.create({
  baseURL: process.env.REACT_APP_VIA_CEP_URL,
  responseType: 'json',
});
