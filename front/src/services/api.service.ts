/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import LogedUserType from '../types/LoggedUserType';
import UserType from '../types/UserType';
import TaskType from '../types/TaskType';
import { DeleteTaskProps, EditTaskProps } from '../store/modules/tasksSlice';

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

interface ApiResponse {
    ok: boolean;
    message: string;
    data?: any;
}

export async function createUser(props: UserType): Promise<ApiResponse> {
    try {
        const result = await api.post(`/user`, props); 
        // console.log(result.data);
             
        return result.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function login(props: LogedUserType): Promise<ApiResponse> {
    try {
        const result = await api.post(`/login`, props);
        // console.log(result.data);
        
        return result.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function createTask(props: TaskType): Promise<ApiResponse> {
    try {
        const result = await api.post(`/user/${props.userId}/task`, props); 
        // console.log(result.data);
             
        return result.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function listTasks(userId: string): Promise<ApiResponse> {
    try {
        const result = await api.get(`/user/${userId}/task`);
        // console.log(result.data);
        
        return result.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function editTasks(props: EditTaskProps): Promise<ApiResponse> {
    try {
        const result = await api.put(`/user/${props.userId}/task/${props.taskId}`);
        // console.log(result.data);
        
        return result.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function deleteTasks(props: DeleteTaskProps): Promise<ApiResponse> {
    try {
        const result = await api.delete(`/user/${props.userId}/task/${props.taskId}`);
        // console.log(result.data);
        
        return result.data;
    } catch (error: any) {
        return error.response.data;
    }
}