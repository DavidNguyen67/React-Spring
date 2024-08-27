const columns = [
  { name: 'NAME', uid: 'name' },
  { name: 'ROLE', uid: 'role' },
  { name: 'STATUS', uid: 'status' },
  { name: 'ACTIONS', uid: 'actions' },
];

export interface IUser {
  id: string;
  name: string;
  role: string;
  team: string;
  status: string;
  age: number;
  avatar: string;
  email: string;
}

export { columns };
