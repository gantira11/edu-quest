import { IRole } from "@/shared/utils/interfaces";

export interface IUser {
  id?: string;
  name?: string;
  username?: string;
  password?: string;
  role_id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  role?: IRole;
}