import TaskType from './TaskType';

type UserType = {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  token?: string;
  csrfToken?: string;
  tasks?: TaskType[];
};

export default UserType;