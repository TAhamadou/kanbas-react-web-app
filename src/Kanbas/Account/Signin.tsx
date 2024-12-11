import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) {
        setError("Invalid credentials");
        return;
      }
      dispatch(setCurrentUser(user));
      navigate("/Kanbas/Dashboard");
    } catch (err) {
      setError("An error occurred during sign in");
    }
  };

  return (
    <div className="signin-container">
      <h1>Sign In</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        id="wd-username"
        value={credentials.username || ""}
        onChange={(e) => setCredentials({
          ...credentials,
          username: e.target.value
        })}
        placeholder="Username"
        className="form-control mb-2"
      />
      <input
        id="wd-password"
        value={credentials.password || ""}
        onChange={(e) => setCredentials({
          ...credentials,
          password: e.target.value
        })}
        placeholder="Password"
        type="password"
        className="form-control mb-2"
      />
      <button
        onClick={signin}
        className="btn btn-primary w-100 mb-2"
        id="wd-signin-btn"
      >
        Sign in
      </button>
      <Link to="/Kanbas/Account/Signup" id="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}