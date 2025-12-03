import { TOKEN_COOKIE_NAME } from "~/context/AuthContext";

/**
 * Checks if a user is authenticated by looking for the auth token cookie.
 * This function is for server-side (middleware) use.
 * @param request The server-side Request object.
 * @returns true if the user is authenticated, false otherwise.
 */
export function isAuthenticated({ request }: { request: Request }): boolean {
  // Read the raw 'Cookie' header string from the request
  const cookieHeader = request.headers.get("Cookie");

  if (!cookieHeader) {
    return false; // No cookie header, so no token.
  }

  // Manually parse the cookies from the header string
  const cookies = cookieHeader.split(";").reduce(
    (acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string>
  );

  // Check if the specific auth token exists
  return !!cookies[TOKEN_COOKIE_NAME];
}
