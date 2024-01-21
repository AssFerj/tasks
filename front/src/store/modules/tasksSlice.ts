import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import TaskType from '../../types/TaskType';
import { RootState } from '../store';

const adapter = createEntityAdapter<TaskType>({
  selectId: item => item.id
});

export const { selectAll, selectById } = adapter.getSelectors((state: RootState) => state.tasksReducer);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: adapter.getInitialState(),
  reducers: {
    addTask: adapter.addOne,
    updateTask: adapter.updateOne,
    removeTask: adapter.removeOne
  }
});

export const { addTask, updateTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;