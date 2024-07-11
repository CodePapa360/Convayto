import { useEffect } from "react";
import { useSignin } from "./useSignin";
import Loader from "../../components/Loader";
import { RiLoginCircleLine } from "react-icons/ri";
import { useUser } from "./useUser";
import Heading from "../../components/Heading";
import InputBox from "../../components/InputBox";
import TextLink from "../../components/TextLink";
import SubmitBtn from "../../components/SubmitBtn";
import MainContainer from "../../components/MainContainer";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { Controller, useForm } from "react-hook-form";

function Signin() {
  const { signin, isPending } = useSignin();
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      email: "tanzil@gmail.com",
      password: "123456789",
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

  return (
    <MainContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Heading addClass="text-3xl">Sign in</Heading>

        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <InputBox
              type="text"
              value={field.value || ""}
              onChange={field.onChange}
              placeholder="Email"
              htmlFor="email"
              error={errors.email?.message}
              onBlur={() => trigger("email")}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <InputBox
              type="password"
              value={field.value || ""}
              onChange={field.onChange}
              placeholder="Password"
              htmlFor="password"
              error={errors.password?.message}
              onBlur={() => trigger("password")}
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
