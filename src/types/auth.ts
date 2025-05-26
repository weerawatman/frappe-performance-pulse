
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'checker' | 'approver' | 'employee';
  department: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}
