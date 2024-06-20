import { useSignup } from "./useSignup";
import Loader from "../../components/Loader";
import Heading from "../../components/Heading";
import MainContainer from "../../components/MainContainer";
import FormContainer from "../../components/FormContainer";
import InputBox from "../../components/InputBox";
import SubmitBtn from "../../components/SubmitBtn";
import TextLink from "../../components/TextLink";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  EMAIL_REGEX,
  MAX_NAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  NAME_REGEX,
  USERNAME_REGEX,
} from "../../config";

function Signup() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { signup, isPending } = useSignup();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = false;
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const onSubmit = ({ fullname, username, email, password }) => {
    const cleanFullname = fullname.trim();
    const cleanUsername = username.trim();
    const cleanEmail = email.trim();

    signup({
      fullname: cleanFullname,
      username: cleanUsername,
      email: cleanEmail,
      password,
    });
  };

  return (
    <MainContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Heading addClass="text-3xl">Sign up</Heading>

        <Controller
          name="fullname"
          control={control}
          rules={{
            required: "Name is required",
            pattern: {
              value: NAME_REGEX,
              message: "Only letters, numbers, and single spaces are allowed",
            },
            minLength: {
              value: 1,
              message: `Minimum ${1} characters required`,
            },
            maxLength: {
              value: MAX_NAME_LENGTH,
              message: `Maximum ${MAX_NAME_LENGTH} characters allowed`,
            },
          }}
          render={({ field }) => (
            <InputBox
              type="text"
              value={field.value}
              onChange={field.onChange}
              onBlur={() => trigger("fullname")}
              placeholder="Full name"
              htmlFor="fullname"
              error={errors.fullname?.message}
            />
          )}
        />

        <Controller
          name="username"
          control={control}
          rules={{
            required: "Username is required",
            pattern: {
              value: USERNAME_REGEX,
              message:
                "Only lowercase letters, numbers, underscores, and dashes are allowed",
            },
            minLength: {
              value: MIN_USERNAME_LENGTH,
              message: `Minimum ${MIN_USERNAME_LENGTH} characters required`,
            },
            maxLength: {
              value: MAX_USERNAME_LENGTH,
              message: `Maximum ${MAX_USERNAME_LENGTH} characters allowed`,
            },
          }}
          render={({ field }) => (
            <InputBox
              type="text"
              value={field.value}
              onChange={field.onChange}
              onBlur={() => trigger("username")}
              placeholder="Username"
              htmlFor="username"
              error={errors.username?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: EMAIL_REGEX,
              message:
                "Invalid email address. Please enter a valid email address",
            },
          }}
          render={({ field }) => (
            <InputBox
              type="email"
              value={field.value}
              onChange={field.onChange}
              onBlur={() => trigger("email")}
              placeholder="email"
              htmlFor="email"
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: MIN_PASSWORD_LENGTH,
              message: `Weak password. Minimum ${MIN_PASSWORD_LENGTH} characters required`,
            },
          }}
          render={({ field }) => (
            <InputBox
              type="password"
              value={field.value}
              onChange={field.onChange}
              onBlur={() => trigger("password")}
              placeholder="Password"
              htmlFor="password"
              error={errors.password?.message}
            />
          )}
        />

        <SubmitBtn disabled={isPending} type="submit">
          {isPending ? <Loader size="small" /> : "Sign up"}
        </SubmitBtn>

        <p>
          Already a user? <TextLink to="/signin">Sign in</TextLink>
        </p>
      </FormContainer>
    </MainContainer>
  );
}

export default Signup;
