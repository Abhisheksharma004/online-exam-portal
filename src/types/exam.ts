export interface MockTest {
  id: string;
  title: string;
  category: string;
  examName: string;
  questions: number;
  durationMinutes: number;
  totalMarks: number;
  languages: string[];
  isFree: boolean;
  participants: number;
  rating: number;
  tag: string;
}

export interface ExamCategory {
  id: string;
  name: string;
  icon: string;
  count: string;
}

