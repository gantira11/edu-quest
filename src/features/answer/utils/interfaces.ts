export interface IAnswer {
  id?: string;
  quetions?: string;
  point?: number;
  quiz_id?: string;
  user_id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  quiz?: Quiz;
  user?: User;
}

export interface Quiz {
  id?: string;
  name?: string;
  duration?: number;
  subject_id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
}

export interface User {
  id?: string;
  name?: string;
  username?: string;
  password?: string;
  role_id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
}
