import TaskType from './TaskType';

type UserType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  remember?: boolean;
  tasks: TaskType[];
};

export default UserType;