import service from "~/services";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  id: number;
  username: string;
  email?: string;
}

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  return service<LoginResponse>({
    url: "/auth/login",
    method: "POST",
    data,
    noAuth: true,
  });
}

export async function getUserDetails(): Promise<any> {
  return service({
    url: "/auth/me",
    method: "GET",
  });
}
