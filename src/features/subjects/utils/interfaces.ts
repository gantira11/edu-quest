import { IQuiz } from "@/features/quiz/utils/interfaces";

export interface ISubject {
  id: string;
  name: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface IDetailSubject {
  id?: string;
  name?: string;
  content?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  videos?: IVideo[];
  quizzes?: IQuiz[];
}

export interface IVideo {
  id?: string;
  name?: string;
  file_url?: string;
  subject_id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
}
