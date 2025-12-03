import { Outlet, Link } from "react-router";

export default function BlogLayout() {
  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#3bc046ff",
        borderRadius: "8px",
      }}
    >
      <h1>Blog Layout (Defined in blog.tsx)</h1>
      <nav>
        <Link to="/" style={{ marginRight: "1rem" }}>
          Back to Home
        </Link>
        <Link to="/blog/456">Go to another blog post</Link>
        <Link to="/blog/create">Go to create blog post</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
