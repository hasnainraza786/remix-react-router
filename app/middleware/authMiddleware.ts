import { isAuthenticated } from "~/lib/auth.server";
import { redirect } from "react-router";
import { routes } from "~/router/routes";

// Make sure to define your login route
const LOGIN_ROUTE = routes.auth.signIn;

export async function authMiddleware({ request }: { request: Request }) {
  console.log("middleware running");

  const url = new URL(request.url);

  // Exclude the login page from the authentication check
  if (url.pathname === LOGIN_ROUTE) {
    return;
  }

  // Check authentication using the server-side checker
  if (!isAuthenticated({ request })) {
    // If not authenticated, throw a redirect response to the login page.
    // This will only happen for requests that are not for the login page.
    url.pathname = LOGIN_ROUTE;

    // Pass the original URL so the user can be redirected back after login
    url.searchParams.set("redirectTo", new URL(request.url).pathname);

    throw redirect(url.toString());
  }

  return;
}
