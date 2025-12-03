"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useSubmit } from "react-router-dom";
import Cookies from "js-cookie";
import OverlayLoader from "~/theme/Components/Loader";
import { routes } from "~/router/routes";
import { useSnackbarContext } from "./SnackbarContext";

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

interface AuthContextType {
  user?: User;
  loading: boolean;
  isAuthenticated: boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const TOKEN_COOKIE_NAME = "auth_token";
export const USER_DATA_COOKIE_NAME = "auth_user";

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const snackbar = useSnackbarContext();
  const navigate = useNavigate();
  const submit = useSubmit();

  // The `useEffect` hook now reads the state from cookies
  useEffect(() => {
    try {
      const token = Cookies.get(TOKEN_COOKIE_NAME);
      const userData = Cookies.get(USER_DATA_COOKIE_NAME);

      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Failed to parse user data from cookies:", error);
      Cookies.remove(TOKEN_COOKIE_NAME);
      Cookies.remove(USER_DATA_COOKIE_NAME);
    } finally {
      setLoading(false);
    }
  }, []);

  // const signOut = useCallback(() => {
  //   console.log("signout run");
  //   Cookies.remove(TOKEN_COOKIE_NAME);
  //   Cookies.remove(USER_DATA_COOKIE_NAME);
  //   setUser(undefined);
  //   navigate(routes.auth.signIn, { replace: true });
  //   snackbar.show({
  //     message: "You have been signed out! Please log in to continue.",
  //     type: "success",
  //   });
  // }, [navigate, snackbar]);

  const signOut = useCallback(() => {
    console.log("Client-side signOut triggered, calling server logout action");

    // Target the newly created '/logout' route path with a POST request
    submit(null, { method: "POST", action: "/logout" });

    // Clear client-side state immediately
    setUser(undefined);

    // The server action handles the final redirect via headers

    snackbar.show({
      message: "You have been signed out! Please log in to continue.",
      type: "success",
    });
  }, [snackbar, submit]);

  const isAuthenticated = !!user;

  if (loading) {
    return <OverlayLoader />;
  }

  return (
    <AuthContext.Provider
      value={{
        signOut,
        user,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

const AuthContextConsumer = AuthContext.Consumer;

export {
  AuthContextProvider,
  AuthContextConsumer,
  AuthContext,
  useAuthContext,
};
