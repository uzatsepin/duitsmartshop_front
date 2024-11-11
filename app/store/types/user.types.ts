export interface IUser {
  email: string;
  id: number;
  role: {
    id: number;
    name: string;
  };
  username: string;
}
