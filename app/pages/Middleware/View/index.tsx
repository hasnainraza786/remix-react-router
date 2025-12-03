import { Box, Typography, Divider } from "@mui/material";
import images from "~/assets/image";

export default function MiddlewareExplanationPage() {
  const imageSrc = images.middleware;
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        🧠 Middleware in React Router (Remix-style)
      </Typography>

      <Typography variant="body1" gutterBottom>
        React Router’s <strong>middleware system</strong> provides powerful
        control over route access, redirection, and preprocessing logic before a
        page is rendered. It works similarly to{" "}
        <strong>Next.js middleware</strong> — but with more flexibility and
        modular structure.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        🏗️ 1️⃣ Middleware Folder Setup
      </Typography>

      <Typography variant="body1" gutterBottom>
        Create a <code>middleware</code> folder inside the <code>app/</code>{" "}
        root. Each file inside this folder represents a standalone middleware
        function for a specific module or concern.
      </Typography>

      <Box
        component="pre"
        sx={{
          backgroundColor: "#f5f5f5",
          p: 2,
          borderRadius: 2,
          overflowX: "auto",
          mt: 1,
        }}
      >
        {`app/
  middleware/
    authMiddleware.ts      ← Handles authentication
    roleMiddleware.ts      ← Handles role-based access
    logMiddleware.ts       ← Example logging middleware`}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        🔒 2️⃣ Example: Authentication Middleware
      </Typography>

      <Typography variant="body1" gutterBottom>
        Suppose we want to protect all routes except authentication pages. We
        can create a file <code>authMiddleware.ts</code> inside the{" "}
        <code>middleware/</code> folder.
      </Typography>

      <Box
        component="pre"
        sx={{
          backgroundColor: "#f5f5f5",
          p: 2,
          borderRadius: 2,
          overflowX: "auto",
        }}
      >
        {`// app/middleware/authMiddleware.ts
import { redirect } from "react-router";

export async function authMiddleware({ request }: { request: Request }) {
  const token = localStorage.getItem("token"); // or from cookies
  const url = new URL(request.url);

  // Allow public routes
  const publicRoutes = ["/auth/sign-in", "/auth/sign-up"];
  if (publicRoutes.includes(url.pathname)) return null;

  // Redirect to login if not authenticated
  if (!token) {
    return redirect("/auth/sign-in");
  }

  return null; // Allow access
}`}
      </Box>

      <Typography variant="body1" sx={{ mt: 2 }}>
        This middleware checks for a valid token and redirects unauthenticated
        users to the login page — while allowing public routes to pass through.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        ⚙️ 3️⃣ Using Middleware in a Route Module
      </Typography>

      <Typography variant="body1" gutterBottom>
        To apply middleware to a specific module or layout, simply import and
        assign it to the <code>middleware</code> export of that module.
      </Typography>

      <Box
        component="pre"
        sx={{
          backgroundColor: "#f5f5f5",
          p: 2,
          borderRadius: 2,
          overflowX: "auto",
        }}
      >
        {`// app/root.tsx
import type { Route } from "@react-router/dev/routes";
import { authMiddleware } from "~/middleware/authMiddleware";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export default function Layout() {
  return (
    <div>
      <h1>Auth Section</h1>
      <Outlet />
    </div>
  );
}`}
      </Box>

      <Typography variant="body1" sx={{ mt: 2 }}>
        This setup ensures that all routes nested under <code>root.tsx</code>
        will automatically pass through the <code>authMiddleware</code> before
        rendering.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        🧩 4️⃣ Combining Multiple Middlewares
      </Typography>

      <Typography variant="body1" gutterBottom>
        You can easily chain multiple middlewares for complex modules. For
        instance, applying both <code>authMiddleware</code> and{" "}
        <code>roleMiddleware</code>:
      </Typography>

      <Box
        component="pre"
        sx={{
          backgroundColor: "#f5f5f5",
          p: 2,
          borderRadius: 2,
          overflowX: "auto",
        }}
      >
        {`// app/routes/admin._layout.tsx
import type { Route } from "@react-router/dev/routes";
import { logMiddleware } from "~/middleware/logMiddleware";
import { roleMiddleware } from "~/middleware/roleMiddleware";

export const middleware: Route.MiddlewareFunction[] = [
  logMiddleware,
  roleMiddleware,
];

export default function AdminLayout() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Outlet />
    </div>
  );
}`}
      </Box>

      <Typography variant="body1" sx={{ mt: 2 }}>
        Each middleware runs sequentially, giving you clean and modular logic
        control.
      </Typography>

      <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
        <img
          src={imageSrc}
          alt={"middleware"}
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        🚀 5️⃣ Example: Role-Based Middleware
      </Typography>

      <Typography variant="body1" gutterBottom>
        Instead of checking roles repeatedly in every route, you can create a
        middleware that handles access based on user roles.
      </Typography>

      <Box
        component="pre"
        sx={{
          backgroundColor: "#f5f5f5",
          p: 2,
          borderRadius: 2,
          overflowX: "auto",
        }}
      >
        {`// app/middleware/roleMiddleware.ts
import { redirect } from "react-router";

export async function roleMiddleware({ request }: { request: Request }) {
  const userRole = localStorage.getItem("role");
  const url = new URL(request.url);

  // Restrict certain pages to admins only
  if (url.pathname.startsWith("/admin") && userRole !== "admin") {
    return redirect("/unauthorized");
  }

  return null;
}`}
      </Box>

      <Typography variant="body1" sx={{ mt: 2 }}>
        This approach keeps your logic{" "}
        <strong>modular, reusable, and clean</strong>. Each module can have its
        own middleware stack — tailored to its needs.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        ✅ Summary
      </Typography>

      <Typography variant="body1" component="div">
        <ul>
          <li>
            Create reusable middleware files inside <code>app/middleware/</code>
            .
          </li>
          <li>
            Assign one or more middlewares using{" "}
            <code>export const middleware</code> in route layouts.
          </li>
          <li>
            Use <code>_layout.tsx</code> files to scope middleware to specific
            route groups.
          </li>
          <li>
            This modular approach keeps your route logic clean, scalable, and
            easy to maintain.
          </li>
        </ul>
      </Typography>
    </Box>
  );
}
