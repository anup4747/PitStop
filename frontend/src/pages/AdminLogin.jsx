import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, saveSession, signIn, signOut } from "../lib/auth";
import "./Auth.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const data = await signIn({ email, password });
      if (!data?.session?.access_token) {
        throw new Error("Login succeeded without an access token.");
      }

      const profileData = await getProfile(data.session);
      const role = String(profileData.profile?.role || "")
        .trim()
        .toLowerCase();

      if (role !== "admin") {
        await signOut(data.session);
        setError("This account does not have admin access.");
        return;
      }

      saveSession(data.session, true);
      navigate("/admin", { replace: true });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card-simple">
        <Link to="/" className="auth-back-link">
          Back to shop
        </Link>
        <div className="auth-simple-header">
          <div className="auth-brand-badge">
            <span className="brand-mark">PS</span>
          </div>
          <h1>
            PitStop <em>Admin</em>
          </h1>
          <p>Sign in with your existing Supabase account.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="admin-login-email">Email</label>
            <input
              id="admin-login-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="admin-login-password">Password</label>
            <input
              id="admin-login-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Checking access..." : "Login"}
          </button>
        </form>
        <p className="auth-switch">
          <Link to="/login">Use customer login</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
