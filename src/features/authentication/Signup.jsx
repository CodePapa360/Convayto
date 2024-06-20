import { useState } from "react";
import { useSignup } from "./useSignup";
import Loader from "../../components/Loader";
import Heading from "../../components/Heading";
import MainContainer from "../../components/MainContainer";
import FormContainer from "../../components/FormContainer";
import InputBox from "../../components/InputBox";
import SubmitBtn from "../../components/SubmitBtn";
import TextLink from "../../components/TextLink";

function Signup() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("123456789");

  const { signup, isPending } = useSignup();

  function handleSubmit(e) {
    e.preventDefault();

    signup(
      { fullname, username, email, password },
      {
        onSettled: () => {
          setFullname("");
          setUsername("");
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  return (
    <MainContainer>
      <FormContainer onSubmit={handleSubmit}>
        <Heading addClass="text-3xl">Sign up</Heading>

        <InputBox
          value={fullname}
          onChange={setFullname}
          placeholder="Full name"
          htmlFor="fullname"
        />

        <InputBox
          value={username}
          onChange={setUsername}
          placeholder="Username"
          htmlFor="username"
        />

        <InputBox
          value={email}
          onChange={setEmail}
          placeholder="Email"
          htmlFor="email"
        />

        <InputBox
          value={password}
          onChange={setPassword}
          placeholder="Password"
          htmlFor="password"
          type="password"
        />

        <SubmitBtn disabled={isPending}>
          {isPending && <Loader size="small" />}
          <span className="ml-2">Sign up</span>
        </SubmitBtn>

        <p>
          Already a user? <TextLink to="/signin">Sign in</TextLink>
        </p>
      </FormContainer>
    </MainContainer>
  );
}

export default Signup;
