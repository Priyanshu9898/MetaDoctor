export interface LoginType {
  email: string;
  password: string;
}
export interface RegisterType {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export interface SubMenuOpenState {
  [key: number]: boolean;
}

export interface UserState {
  user: any;
  loading: boolean;
  error: string | null;
  message: string | null;
  isAuthenticated: boolean;
}
