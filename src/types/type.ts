export interface User {
  id: number;
  name: string;
  role: string;
  lastActive: string;
}

export interface Post {
  id: number;
  title: string;
  category: string;
  views: number;
  likes: number;
}

export interface Notification {
  id: number;
  message: string;
  time: string;
}
