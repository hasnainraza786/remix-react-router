import { Link } from "react-router";

export default function SignUpPage() {
  return (
    <form>
      <h3>Sign Up</h3>
      <input
        type="email"
        placeholder="Email"
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />
      <input
        type="password"
        placeholder="Password"
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />
      <button type="submit" style={{ width: "100%", padding: "0.5rem" }}>
        Sign Up
      </button>
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </form>
  );
}
