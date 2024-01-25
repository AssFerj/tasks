/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import UserType from '../types/UserType';
import TaskType from '../types/TaskType';

const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true',
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
    return response.data.data;
}
export const signOut = async () => {
    const response = await api.post(`/logout`);
    return response.data;
}

export const createUser = async (props: UserType) => {
    const response = await api.post(`/user`, props);
    return response.data.data;
}

export const createTask = async (props: TaskType) => {
    const response = await api.post(`/user/${props.user_id}/task`, props);
    return response.data.data;
}

export const getTasks = async (props: UserType) => {
    const response = await api.get(`/user/${props.id}/task`);
    return response.data.data;
}

export const updateTask = async (props: TaskType) => {
    const response = await api.put(`/user/${props.user_id}/task/${props.id}`, props);
    return response.data.data;
}

export const deleteTask = async (props: TaskType) => {
    const response = await api.delete(`/user/${props.user_id}/task/${props.id}`);
    return response.data.data;
}


