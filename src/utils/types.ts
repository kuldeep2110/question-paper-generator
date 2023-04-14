export interface Subject {
  id?: string | null;
  created_at?: string;
  subject_name: string;
  no_of_modules: number;
  org_id: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  created_at: string;
  org_id: string;
}

export interface Question {
  id?: string | null;
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


