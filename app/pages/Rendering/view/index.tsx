// app/routes/rendering-explanation.tsx
import * as React from "react";
import {
  Box,
  Typography,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function RenderingExplanationPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1000, mx: "auto" }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        🔁 Rendering Process in React Router (File-based Routing)
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        This page explains how rendering works inside each route file in React
        Router’s file-based routing system. Each route can export up to four key
        functions: <code>middleware</code>, <code>loader</code>,{" "}
        <code>action</code>, and a <code>default</code> component.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        1) Four route exports
      </Typography>
      <List dense>
        <ListItem>
          <ListItemText
            primary="middleware"
            secondary="Runs first on every request. Can block, redirect, or allow access."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="loader"
            secondary="Runs server-side on GET requests or initial page load."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="action"
            secondary="Runs server-side for POST, PATCH, PUT, DELETE requests."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="default"
            secondary="The React component rendered on the client after hydration."
          />
        </ListItem>
      </List>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">2) Execution Order</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        The router runs exports in this order:
        <br />
        <strong>middleware → loader/action → default</strong>
        <br />
        Middleware decides whether to allow or block the request. If successful,
        the router then executes the loader or action depending on the request
        type.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">3) Server-side Rendering (SSR)</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        On the first page load, both <code>loader</code> and <code>action</code>{" "}
        execute on the server. They can safely call secure APIs or access server
        secrets. The result is embedded in the HTML sent to the browser.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">4) Hydration and CSR</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Once the server sends the HTML and JS bundle, React hydrates the app and
        runs the <code>default</code> component on the client. From this point,
        all navigation and rendering happen on the client.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">5) API Calls</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Any secure or backend API calls should happen inside <code>loader</code>{" "}
        or <code>action</code>, not inside client components. These functions
        run only on the server.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">6) Accessing Loader Data</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Data fetched by the <code>loader</code> can be accessed in the default
        component using <code>useLoaderData()</code>.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">7) The Action Function</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        The <code>action</code> handles POST, PATCH, PUT, or DELETE requests. It
        receives a <code>request</code> object from which you can extract form
        data using <code>await request.formData()</code>.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">8) Submitting from the Client</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        You can trigger the <code>action</code> in two main ways:
      </Typography>
      <List dense>
        <ListItem>
          <ListItemText
            primary="<Form method='post'>"
            secondary="A declarative HTML-like form that submits to the nearest route action."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="useSubmit()"
            secondary="A programmatic way to trigger a submission with JS."
          />
        </ListItem>
      </List>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">9) Field Naming & Method</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Each input in the <code>&lt;Form&gt;</code> must have a{" "}
        <code>name</code> attribute. This is how data is sent and extracted on
        the server. The form should also specify the <code>method</code> (like
        "post").
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">10) useSubmit Options</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        <code>useSubmit(data, {`{ method, action }`})</code> allows sending data
        programmatically. If <code>action</code> is omitted, it defaults to the
        nearest parent route with an <code>action</code> export.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Example Route File
      </Typography>
      <Paper
        variant="outlined"
        sx={{ p: 2, borderRadius: 2, backgroundColor: "#fafafa", mb: 3 }}
      >
        <pre style={{ fontSize: 13, overflowX: "auto" }}>
          {`// app/routes/user.$id.tsx
import { redirect } from "react-router";
import { useLoaderData, Form, useSubmit } from "react-router-dom";

// --- Middleware ---
export async function authMiddleware({ request }) {
  const cookie = request.headers.get("cookie") || "";
  const hasToken = cookie.includes("token=");
  const url = new URL(request.url);

  if (url.pathname.startsWith("/auth")) return null;
  if (!hasToken) return redirect("/auth/sign-in");
  return null;
}

export const middleware = [authMiddleware];

// --- Loader ---
export async function loader({ params }) {
  const res = await fetch("https://dummyjson.com/users/" + params.id);
  if (!res.ok) throw new Response("User not found", { status: 404 });
  const user = await res.json();
  return { user };
}

// --- Action ---
export async function action({ request, params }) {
  const fd = await request.formData();
  const name = fd.get("name");
  await fetch("https://dummyjson.com/users/" + params.id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return redirect("/user/" + params.id);
}

// --- Default component ---
export default function UserPage() {
  const { user } = useLoaderData();
  const submit = useSubmit();

  return (
    <div>
      <h3>{user.name}</h3>
      <Form method="post">
        <input name="name" defaultValue={user.name} />
        <button type="submit">Update</button>
      </Form>
      <button onClick={() => submit({ name: "Quick" }, { method: "post" })}>
        Quick Update
      </button>
    </div>
  );
}`}
        </pre>
      </Paper>

      <Typography variant="h6" gutterBottom>
        🔄 Lifecycle Summary
      </Typography>
      <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", mb: 3 }}>
        {`Request -> middleware -> loader/action (server)
-> server returns HTML + JS
-> browser hydrates
-> default component runs (CSR)
-> useLoaderData() provides data
-> client forms use action for mutations`}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" fontWeight={600}>
        ✅ Summary
      </Typography>
      <Typography variant="body2">
        In React Router’s file-based routing, the request lifecycle follows a
        clear pattern: <strong>middleware → loader/action → render</strong>. Use
        loaders for server reads, actions for writes, and keep logic modular and
        secure inside these server functions.
      </Typography>
    </Box>
  );
}
