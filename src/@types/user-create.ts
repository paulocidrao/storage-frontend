export interface createUserResponse {
  codeStatus: number;
}

export interface createUserRequest {
  email: string;
  password: string;
  name: string;
}
