import { Box, Divider, Paper, Typography } from "@mui/material";
import RouteCard from "../components/RouteCard";

export default function FileBasedRoutingPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: "auto" }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        🧭 File-Based Routing in React Router
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        React Router automatically maps your file structure under{" "}
        <code>app/routes</code> to browser paths — just like Next.js. Below is a
        visual breakdown of how it works.
      </Typography>

      <Divider sx={{ mb: 3 }}>Examples</Divider>
      {/* ROUTE CONFIGURATION SECTION */}
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: "background.paper",
          mb: 4,
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          ⚙️ Route Configuration (routes.ts)
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          To enable file-based routing, you must export a route configuration
          using <code>flatRoutes()</code> in your <code>routes.ts</code> file:
        </Typography>

        <Box
          component="pre"
          sx={{
            backgroundColor: "#f7f7f7",
            p: 2,
            borderRadius: 1,
            overflowX: "auto",
            fontSize: 14,
            mb: 2,
          }}
        >
          {`import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default flatRoutes() satisfies RouteConfig;`}
        </Box>

        <Typography variant="body2" color="text.secondary">
          This automatically scans your <code>app/routes</code> folder and maps
          each file to its corresponding URL — no manual route definitions
          required.
        </Typography>
      </Paper>

      {/* MAIN PAGE */}
      <Typography variant="h6" fontWeight={600} gutterBottom mb={4}>
        🏠 Main Page
      </Typography>
      <RouteCard
        file="app/routes/_index.tsx"
        path="/"
        description="The underscore (_) before index means this file represents the root route (/) — similar to page.tsx in Next.js."
      />

      {/* SINGLE PAGE */}
      <Typography variant="h6" fontWeight={600} sx={{ my: 4 }} gutterBottom>
        📄 Single Page Route
      </Typography>
      <RouteCard
        file="app/routes/about.tsx"
        path="/about"
        description="A simple file named 'about.tsx' creates the /about route."
      />

      {/* NESTED ROUTES */}
      <Typography variant="h6" fontWeight={600} sx={{ my: 4 }} gutterBottom>
        🧩 Nested Routes
      </Typography>
      <RouteCard
        file="app/routes/user._index.tsx"
        path="/user"
        description="Inside the 'user' module, the _index.tsx file maps to /user."
      />
      <RouteCard
        file="app/routes/user.create.tsx"
        path="/user/create"
        description="This nested file creates a sub-route inside /user."
      />
      <RouteCard
        file="app/routes/user.edit.tsx"
        path="/user/edit"
        description="Another static nested route for editing users."
      />

      {/* DYNAMIC ROUTES */}
      <Typography variant="h6" fontWeight={600} sx={{ my: 4 }} gutterBottom>
        🔢 Dynamic Routes
      </Typography>
      <RouteCard
        file="app/routes/user.$slug.tsx"
        path="/user/:slug"
        description="The $ syntax makes this a dynamic route, allowing any value (e.g., /user/12 or /user/hasnain)."
      />

      <Divider sx={{ my: 4 }} />

      {/* FOLDER OVERVIEW */}
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          🗂 Folder Overview
        </Typography>
        <Box
          component="pre"
          sx={{
            backgroundColor: "#f7f7f7",
            p: 2,
            borderRadius: 1,
            overflowX: "auto",
            fontSize: 14,
          }}
        >
          {`app/
  routes/
    _index.tsx          → /
    about.tsx           → /about
    user._index.tsx     → /user
    user.create.tsx     → /user/create
    user.edit.tsx       → /user/edit
    user.$slug.tsx      → /user/:slug`}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
          Each file automatically defines a route — no manual configuration
          needed.
        </Typography>
      </Paper>
    </Box>
  );
}
