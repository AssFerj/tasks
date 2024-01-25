/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import UserType from '../types/UserType';

const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Expose-Headers': 'Content-Length, X-JSON',
    }
});

api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const validateUser = async (email: string) => {
    const response = await api.get(`/user/${email}`);
    return response.data.data;
}
export const signIn = async (props: UserType) => {
    const response = await api.post(`/login`, props);
    // console.log(response.data.data);
    return response.data.data;
}
export const signOut = async () => {
    const response = await api.post(`/logout`);
    return response.data;
}


