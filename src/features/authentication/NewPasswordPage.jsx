import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { Link, useNavigate } from "react-router-dom";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaExclamationTriangle, FaAngleUp } from "react-icons/fa";
import Loader from "../../components/Loader";
import { useUpdateUser } from "../userProfile/useUpdateUser";
import FormContainer from "../../components/FormContainer";
import SubmitBtn from "../../components/SubmitBtn";
import MainContainer from "../../components/MainContainer";
import InputBox from "../../components/InputBox";
import Heading from "../../components/Heading";
import { Controller, useForm } from "react-hook-form";
import { MIN_PASSWORD_LENGTH } from "../../config";

function ResetPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { updateUser, isUpdating } = useUpdateUser();
  const navigate = useNavigate();
  const [urlRefreshToken, setUrlRefreshToken] = useState("");
  const { session } = useUser();
  const refreshToken = session?.refresh_token;

  // extract the refreshtocken from the window url
  const urlHash = window?.location?.hash?.split("&");
  const token = urlHash[3]?.split("=")[1];

  useEffect(() => {
    if (token !== undefined && token !== "") {
      return setUrlRefreshToken(token);
    }
  }, [token]);

  const isRecovery = refreshToken === urlRefreshToken;

  const onSubmit = ({ newPassword, confirmPassword }) => {
    if (!newPassword || !confirmPassword) return;

    updateUser(
      { password: newPassword },
      {
        onSuccess: () => {
          navigate("/");
        },
        onError: (err) => {
          console.log(err);
        },
      },
    );
  };

  return (
    <MainContainer>
      {isRecovery && (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Heading>Set new password</Heading>

          <Controller
            name="newPassword"
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
                onBlur={() => trigger("newPassword")}
                placeholder="New password"
                htmlFor="newPassword"
                error={errors.newPassword?.message}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Password is required",
              validate: (value) =>
                value === getValues().newPassword ||
                "The passwords do not match",
            }}
            render={({ field }) => (
              <InputBox
                type="password"
                value={field.value}
                onChange={field.onChange}
                onBlur={() => trigger("confirmPassword")}
                placeholder="Confirm new password"
                htmlFor="confirmPassword"
                error={errors.confirmPassword?.message}
              />
            )}
          />

          <SubmitBtn disabled={isUpdating}>
            {isUpdating ? <Loader size="small" /> : <RiLoginCircleLine />}
            <span className="ml-2">Update</span>
          </SubmitBtn>
        </FormContainer>
      )}

      {!isRecovery && (
        <>
          <FaExclamationTriangle className="mb-4 text-4xl text-red-500 sm:text-5xl" />

          <Heading>
            Oops! The password reset link is invalid or expired.
          </Heading>

          <p className="mb-4 text-center text-gray-500 dark:text-gray-400">
            The link you clicked to reset your password might be incorrect,
            expired, or used already. Please request a new password reset.
          </p>

          <Link
            to="/reset-password"
            className="inline-flex items-center gap-1 rounded-md bg-darkViolet px-4 py-2 font-bold text-white"
          >
            Request new password reset
            <FaAngleUp />
          </Link>
        </>
      )}
    </MainContainer>
  );
}

export default ResetPassword;
