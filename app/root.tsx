import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import ThemeProvider from "~/registry/Theme";

import { LocaleProvider } from "~/context/LocaleContext";
import SnackbarContextProvider from "~/context/SnackbarContext";
import IntlRegistry from "~/registry/Intl";
import type { Route } from "./+types/root";
import "./app.css";
import { AuthContextProvider } from "./context/AuthContext";
import { authMiddleware } from "./middleware/authMiddleware";
import QueryProvider from "./registry/ReactQuery";
// e.g. in root.tsx or a layout file

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];
export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <LocaleProvider>
          <SnackbarContextProvider>
            <AuthContextProvider>
              <QueryProvider>
                <ThemeProvider>
                  <IntlRegistry>{children}</IntlRegistry>
                </ThemeProvider>
              </QueryProvider>
            </AuthContextProvider>
          </SnackbarContextProvider>
        </LocaleProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
