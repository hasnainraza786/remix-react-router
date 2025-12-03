// src/routes/logout.ts

import { redirect, type ActionFunction } from "react-router-dom";
import {
  TOKEN_COOKIE_NAME,
  USER_DATA_COOKIE_NAME,
} from "~/context/AuthContext";
import { routes } from "~/router/routes";

// Export ONLY the action function. No default export for a React component is needed.
export const action: ActionFunction = async () => {
  console.log("Server-side logout action running");

  const headers = new Headers();

  // Expire the HttpOnly TOKEN_COOKIE_NAME
  headers.append(
    "Set-Cookie",
    `${TOKEN_COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax`
  );

  // Expire the USER_DATA_COOKIE_NAME
  headers.append(
    "Set-Cookie",
    `${USER_DATA_COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax`
  );

  // Redirect the user to the sign-in page
  return redirect(routes.auth.signIn, { headers });
};
