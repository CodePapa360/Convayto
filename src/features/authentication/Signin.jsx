import { useEffect, useState } from "react";
import { useSignin } from "./useSignin";
import Loader from "../../components/Loader";
import { RiLoginCircleLine } from "react-icons/ri";
import { useUser } from "./useUser";
import Heading from "../../components/Heading";
import InputBox from "../../components/InputBox";
import TextLink from "../../components/TextLink";
import FormBtn from "../../components/FormBtn";
import MainContainer from "../../components/MainContainer";
import { useNavigate } from "react-router-dom";
import From from "../../components/Form";

function Signin() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  const [email, setEmail] = useState("tanzil@gmail.com");
  const [password, setPassword] = useState("123456789");
  const { signin, isPending } = useSignin();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    signin(
      { email, password },
      {
        onSuccess: () => {
          setEmail("");
          setPassword("");
          navigate("/", {
            replace: true,
          });
        },
      },
    );
  }

  return (
    <MainContainer>
      <From onSubmit={handleSubmit}>
        <Heading size="3xl">Sign in</Heading>

        <InputBox
          type="text"
          value={email}
          onChange={setEmail}
          placeholder="Email address"
          htmlFor="email"
        />

        <InputBox
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Password"
          htmlFor="password"
        />

        <TextLink to="/forgot-password" text="Forgot password?" />

        <FormBtn disabled={isPending}>
          {isPending ? <Loader size="small" /> : <RiLoginCircleLine />}
          <span className="ml-2">Sign in</span>
        </FormBtn>

        <p>
          Don't have an account? <TextLink to="/signup" text="Sign up" />
        </p>
      </From>
    </MainContainer>
  );
}

export default Signin;
