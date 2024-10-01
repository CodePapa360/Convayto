import {
  APP_NAME,
  EMAIL_REGEX,
  MAX_NAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  NAME_REGEX,
  USERNAME_REGEX,
} from "../../config";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useSignup } from "./useSignup";
import useCheckUsernameAvailability from "./useCheckUsernameAvailability";
import Loader from "../../components/Loader";
import Heading from "../../components/Heading";
import MainContainer from "../../components/MainContainer";
import FormContainer from "../../components/FormContainer";
import InputBox from "../../components/InputBox";
import SubmitBtn from "../../components/SubmitBtn";
import TextLink from "../../components/TextLink";
import EmailConfirmation from "../../components/EmailConfirmation";
import LogoLarge from "../../components/LogoLarge";

function Signup() {
  document.title = APP_NAME + " - Sign up";
  const { signup, isPending, isSuccess } = useSignup();
  // const isSuccess = true;
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { isChecking, isBusy, isTaken, checkUsername, reset } =
    useCheckUsernameAvailability();

  useEffect(() => {
    const isAuthenticated = false;
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (isChecking) {
      setError("username", {
        type: "checking",
        message: "Checking...",
      });
      return;
    } else if (isTaken) {
      setError("username", {
        type: "server",
        message: "Username is already taken.",
      });
      return;
    } else {
      clearErrors("username");
    }
  }, [isChecking, isTaken, setError, clearErrors]);

  const onSubmit = ({ fullname, username, email, password }) => {
    if (isChecking || isTaken) return;

    const cleanFullname = fullname.trim();
    const cleanUsername = username.trim();
    const cleanEmail = email.trim();

    if (!isChecking && !isTaken && !isBusy) {
      signup(
        {
          fullname: cleanFullname,
          username: cleanUsername,
          email: cleanEmail,
          password,
        },
        {
          onSuccess: () => {
            reset();
          },
        },
      );
    }
  };

  return (
    <MainContainer>
      <LogoLarge />

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        {isSuccess ? (
          <EmailConfirmation />
        ) : (
          <>
            <Heading addClass="text-3xl">Sign up</Heading>

            <Controller
              name="fullname"
              control={control}
              rules={{
                required: "Enter your full name.",
                pattern: {
                  value: NAME_REGEX,
                  message:
                    "Only letters, numbers, and single spaces are allowed.",
                },
                maxLength: {
                  value: MAX_NAME_LENGTH,
                  message: `Maximum ${MAX_NAME_LENGTH} characters allowed.`,
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
                  disabled={isPending}
                />
              )}
            />

            <Controller
              name="username"
              control={control}
              rules={{
                required: "Please enter a username.",
                pattern: {
                  value: USERNAME_REGEX,
                  message:
                    "Only lowercase letters, numbers, underscores, and dashes are allowed.",
                },
                minLength: {
                  value: MIN_USERNAME_LENGTH,
                  message: `Minimum ${MIN_USERNAME_LENGTH} characters required.`,
                },
                maxLength: {
                  value: MAX_USERNAME_LENGTH,
                  message: `Maximum ${MAX_USERNAME_LENGTH} characters allowed.`,
                },
              }}
              render={({ field }) => (
                <InputBox
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={() => {
                    trigger("username");
                    checkUsername(field.value);
                  }}
                  placeholder="Username"
                  htmlFor="username"
                  error={errors.username?.message}
                  disabled={isPending}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Enter your email.",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Invalid email. Please enter a valid email.",
                },
              }}
              render={({ field }) => (
                <InputBox
                  type="email"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={() => trigger("email")}
                  placeholder="Email"
                  htmlFor="email"
                  error={errors.email?.message}
                  disabled={isPending}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: "Enter a password.",
                minLength: {
                  value: MIN_PASSWORD_LENGTH,
                  message: `Minimum ${MIN_PASSWORD_LENGTH} characters required.`,
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
                  disabled={isPending}
                />
              )}
            />

            <SubmitBtn
              disabled={isPending || isChecking || isTaken || isBusy}
              type="submit"
            >
              {isPending ? (
                <>
                  <Loader size="small" />
                  <span className="ml-2">Signing up...</span>
                </>
              ) : (
                <span>Sign up</span>
              )}
            </SubmitBtn>

            <p>
              Already a user? <TextLink to="/signin">Sign in</TextLink>
            </p>
          </>
        )}
      </FormContainer>
    </MainContainer>
  );
}

export default Signup;
