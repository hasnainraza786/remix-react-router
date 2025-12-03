import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { TOKEN_COOKIE_NAME } from "~/context/AuthContext";
import service, { getAuthenticationToken } from "~/services";

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

const fetchUser = async (): Promise<User> => {
  const token = Cookies.get(TOKEN_COOKIE_NAME);
  if (!token) {
    throw new Error("No authentication token found.");
  }

  // Your service function already handles setting the auth header
  const response = await service<User>({
    url: "/auth/me",
    method: "GET",
  });
  return response;
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
};
