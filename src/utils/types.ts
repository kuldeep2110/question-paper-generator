export interface User {
  id: string;
  email: string;
  username: string;
  created_at: string;
  org_id: string;
}

export interface Subject {
  id?: string | null;
  created_at?: string;
  subject_name: string;
  no_of_modules: number;
  org_id: string;
}

export interface SubjectQuestionJoin extends Subject {
  id: string;
  questions: QuestionAuthorJoin[];
}

export interface QuestionAuthorJoin {
  id: string;
  created_at?: string;
  title: string;
  question: string;
  marks: number;
  subject_id: string;
  org_id: string;
  module: number;
  img_url: string | null;
  author_id: AuthorEmailUsername;
}

export interface AuthorEmailUsername {
  email: string;
  username: string;
}

export interface Question {
  id?: string;
  created_at?: string;
  title: string;
  question: string;
  marks: number;
  subject_id: string;
  author_id: string;
  org_id: string;
  module: number;
  img_url: string | null;
}

export enum LayoutType {
  Grid,
  List,
}
