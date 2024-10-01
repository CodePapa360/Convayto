import { useEffect } from "react";
import { useSignin } from "./useSignin";
import Loader from "../../components/Loader";
import { useUser } from "./useUser";
import Heading from "../../components/Heading";
import InputBox from "../../components/InputBox";
import TextLink from "../../components/TextLink";
import SubmitBtn from "../../components/SubmitBtn";
import MainContainer from "../../components/MainContainer";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { Controller, useForm } from "react-hook-form";
import LogoLarge from "../../components/LogoLarge";
import DemoAccounts from "./DemoAccounts";
import { APP_NAME } from "../../config";

function Signin() {
  document.title = APP_NAME + " - Sign in";
  const { signin, isPending } = useSignin();
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    const { email, password } = data;

    if (!email || !password) return;

    signin(
      { email, password },
      {
        onSuccess: () => {
          navigate("/", {
            replace: true,
          });
        },
      },
    );
  };

  const handleDemoLogin = (email, password) => {
    setValue("email", email);
    setValue("password", password);
  };

  return (
    <MainContainer>
      <LogoLarge />

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Heading addClass="text-3xl">Sign in</Heading>

        <DemoAccounts onDemoLogin={handleDemoLogin} />

        <Controller
          name="email"
          control={control}
          rules={{
            required: "Enter your email.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email. Please enter a valid email.",
            },
          }}
          render={({ field }) => (
            <InputBox
              type="email"
              value={field.value || ""}
              onChange={field.onChange}
              placeholder="Email"
              htmlFor="email"
              error={errors.email?.message}
              onBlur={() => trigger("email")}
              disabled={isPending}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: "Enter a password." }}
          render={({ field }) => (
            <InputBox
              type="password"
              value={field.value || ""}
              onChange={field.onChange}
              placeholder="Password"
              htmlFor="password"
              error={errors.password?.message}
              onBlur={() => trigger("password")}
              disabled={isPending}
            />
          )}
        />

        <TextLink to="/reset-password" addClass="mb-4">
          Forgot password?
        </TextLink>

        <SubmitBtn disabled={isPending}>
          {isPending ? (
            <>
              <Loader size="small" />
              <span className="ml-2">Signing in...</span>
            </>
          ) : (
            <span>Sign in</span>
          )}
        </SubmitBtn>

        <p>
          Don't have an account? <TextLink to="/signup">Sign up</TextLink>
        </p>
      </FormContainer>
    </MainContainer>
  );
}

export default Signin;
