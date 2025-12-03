import React, { type PropsWithChildren } from "react";
import { useNavigate } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { routes } from "~/router/routes";
import { useAuthContext } from "~/context/AuthContext";

// This wrapper component is necessary to access the useNavigate hook
// from within the QueryClient's configuration.
function QueryClientWithAuth({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { signOut } = useAuthContext();

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            networkMode: "always",
            refetchOnReconnect: true,

            throwOnError: (error) => {
              // Check for 401 Unauthorized status
              //@ts-expect-error Type guarding is complex here; check status code
              const statusCode = error?.statusCode || error?.response?.status;
              if (statusCode === 401) {
                // Perform a client-side sign out and navigate
                signOut();
                navigate(routes.auth.signIn, { replace: true });
                return false; // Prevent react-query from throwing the error further
              }
              return false; // or true, depending on desired behavior
            },
          },
          mutations: {
            networkMode: "always",
            throwOnError: (error) => {
              // Check for 401 Unauthorized status
              //@ts-expect-error Type guarding is complex here; check status code
              const statusCode = error?.statusCode || error?.response?.status;
              if (statusCode === 401) {
                // Perform a client-side sign out and navigate
                signOut();
                navigate(routes.auth.signIn, { replace: true });
                return false; // Prevent react-query from throwing the error further
              }
              return false; // or true, depending on desired behavior
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default function QueryProvider({ children }: PropsWithChildren) {
  return <QueryClientWithAuth>{children}</QueryClientWithAuth>;
}
