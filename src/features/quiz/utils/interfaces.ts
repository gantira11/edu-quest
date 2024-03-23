export interface IQuiz {
  id?: string;
  name?: string;
  subject_id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  total_quetions?: number;
}

export interface IDetailQuiz {
  id?: string;
  name?: string;
  subject_id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  quetions?: Quetion[];
}

export interface Quetion {
  id?: string;
  name?: string;
  discuss?: string;
  quiz_id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  options?: Option[];
}

export interface Option {
  id?: string;
  name?: string;
  is_correct?: boolean;
  quetion_id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
}
