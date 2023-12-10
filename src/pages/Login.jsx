import { useState } from "react";
import styled from "styled-components";
import { useLogin } from "../features/authentication/useLogin";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("tanzil@gmail.com");
  const [password, setPassword] = useState("123456789");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <StyledLogin>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />

        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />

        <button type="submit" disabled={isLoading}>
          Login
        </button>
      </form>

      <Link to="/signup">Sign up</Link>
    </StyledLogin>
  );
}

export default Login;

const StyledLogin = styled.div``;
