export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  username: string;
  role: string;
  password:string;
  fullName:string;
  userId:string;
}

export interface AuthResponse {
  statusCode: number;
  message: string;
  data: LoginResponse;
}