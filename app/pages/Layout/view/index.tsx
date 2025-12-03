import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function LayoutsExplanationPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        🧩 Layouts in React Router (File-based Routing)
      </Typography>

      <Typography variant="body1" gutterBottom>
        Layouts in <strong>React Router (Remix-style routing)</strong> define
        shared UI or structure across pages — similar to how layouts work in
        Next.js. You can use them to wrap groups of routes, providing common
        elements like navigation bars, sidebars, or authentication wrappers.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        1️⃣ Root Layout (root.tsx)
      </Typography>

      <Typography variant="body1" gutterBottom>
        The <strong>root layout</strong> is defined in the file{" "}
        <code>root.tsx</code>. This file wraps your entire application and is
        the base layout for all routes.
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
        {`// app/root.tsx
export default function RootLayout() {
  return (
    <html>
      <body>
        <header>Global Navbar</header>
        <Outlet /> {/* This renders nested routes */}
      </body>
    </html>
  );
}`}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        2️⃣ Creating a Separate Layout
      </Typography>

      <Typography variant="body1" gutterBottom>
        If you want a <strong>different layout for specific routes</strong>{" "}
        (e.g., authentication pages), you can create a layout file whose name
        starts with <code>_</code>. Files prefixed with <code>_</code>{" "}
        <strong>do not create routes</strong> but act as layout wrappers.
      </Typography>

      <Typography variant="body1" gutterBottom>
        For example, the following structure:
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
        {`app/
  routes/
    _auth.tsx       → Acts as a layout wrapper
    _auth.sign-in.tsx       → Renders inside _auth.tsx
    _auth.sign-up.tsx       → Renders inside _auth.tsx`}
      </Box>

      <Typography variant="body1" sx={{ mt: 1 }}>
        The <code>auth._layout.tsx</code> file wraps all routes starting with{" "}
        <code>auth.</code> — similar to Next.js’ <code>(auth)/</code> folder
        concept.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        3️⃣ Nested Routes Acting as Layouts
      </Typography>

      <Typography variant="body1" gutterBottom>
        When you create a route like <code>profile.tsx</code> and then add
        nested routes like
        <code>profile.setting.tsx</code>, React Router treats{" "}
        <code>profile.tsx</code> as a <strong>layout</strong> automatically.
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
        {`app/
  routes/
    profile.tsx            → Acts as a layout for nested routes
    profile.setting.tsx    → /profile/setting`}
      </Box>

      <Typography variant="body1" sx={{ mt: 1 }}>
        Since there’s <strong>no</strong> <code>profile._index.tsx</code>, the{" "}
        <code>profile.tsx</code> file itself serves as both the page and layout.
        All nested routes like <code>/profile/setting</code> will render inside{" "}
        <code>profile.tsx</code>’s <code>&lt;Outlet /&gt;</code>.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        🔗 Summary
      </Typography>

      <List>
        <ListItem>
          <ListItemText
            primary="root.tsx"
            secondary="Defines the global layout for the entire app."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="_layout.tsx files"
            secondary="Create isolated layout wrappers for a group of related routes."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Nested route layouts"
            secondary="If a route has children, its file acts as the parent layout by default."
          />
        </ListItem>
      </List>
    </Box>
  );
}
