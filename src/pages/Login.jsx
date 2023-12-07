import { useState } from "react";
import styled from "styled-components";
import { useLogin } from "../features/authentication/useLogin";

function Login() {
  const [email, setEmail] = useState("virame7800@gyxmz.com");
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

        <button type="submit">Login</button>
      </form>
    </StyledLogin>
  );
}

export default Login;

const StyledLogin = styled.div``;
