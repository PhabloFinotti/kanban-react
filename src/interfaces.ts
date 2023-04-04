export type Status = 'todo' | 'doing' | 'done';

export interface CardProps {
  id: number;
  title: string;
  content: string;
  status: Status;
  isFavorite: boolean;
}