import TaskType from './TaskType';

type UserType = {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  token?: string;
  tasks?: TaskType[];
};

export default UserType;