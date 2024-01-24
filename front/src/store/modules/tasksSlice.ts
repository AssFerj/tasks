import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createTask, deleteTasks, editTasks, listTasks } from '../../services/api.service';
import Task from '../../types/TaskType';

export interface ListTaskProps {
  id: string;
}
export interface EditTaskProps {
  userId: string;
  taskId: string;
}
export interface DeleteTaskProps {
  userId: string;
  taskId: string;
}

export interface CreateTaskProps {
  userId: string;
  description: string;
}

export const createTaskAction = createAsyncThunk('task/create', async (props: CreateTaskProps) => {
  const result = await createTask(props);
  return result;
});

export const listTaskAction = createAsyncThunk('tasks/list', async (props: ListTaskProps) => {
  const result = await listTasks(props.id);
  return result;
});

export const editTaskAction = createAsyncThunk('task/edit', async (props: EditTaskProps) => {
  const result = await editTasks(props);
  return result;
});

export const deleteTaskAction = createAsyncThunk('task/delete', async (props: DeleteTaskProps) => {
  const result = await deleteTasks(props);
  return result;
});

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [] as Task[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTaskAction.pending, () => {
      console.log('Create Task started');
    })
    builder.addCase(createTaskAction.fulfilled, (_, action) => {
      console.log('Create Task ended');
      return action.payload.data ?? [];
    })
    builder.addCase(listTaskAction.pending, () => {
      console.log('List Task started');
    })
    builder.addCase(listTaskAction.fulfilled, (_, action) => {
      console.log('List Task ended');
      return action.payload.data ?? [];
    })
    builder.addCase(editTaskAction.pending, () => {
      console.log('Edit Task started');
    })
    builder.addCase(editTaskAction.fulfilled, (_, action) => {
      console.log('Edit Task ended');
      return action.payload.data;
    })
    builder.addCase(deleteTaskAction.pending, () => {
      console.log('Delete Task started');
    })
    builder.addCase(deleteTaskAction.fulfilled, (_, action) => {
      console.log('Delete Task ended');
      return action.payload.data ?? [];
    })
  }
})

export default tasksSlice.reducer;