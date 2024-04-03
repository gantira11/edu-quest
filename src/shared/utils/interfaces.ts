export interface IUser {
  id: string;
  name: string;
  username: string;
  password: string;
  role_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  role: IRole;
  token: string;
}

export interface IRole {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface IParams {
  id?: string,
  page?: number,
  limit?: number | string,
  keyword?: string,
  category?: string
}
