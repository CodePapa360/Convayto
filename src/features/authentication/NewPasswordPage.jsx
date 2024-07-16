import Loader from "../../components/Loader";
import { useUpdateUser } from "../userProfile/useUpdateUser";
import FormContainer from "../../components/FormContainer";
import SubmitBtn from "../../components/SubmitBtn";
import MainContainer from "../../components/MainContainer";
import InputBox from "../../components/InputBox";
import Heading from "../../components/Heading";
import { Controller, useForm } from "react-hook-form";
import { MIN_PASSWORD_LENGTH } from "../../config";
import ResetLinkExpired from "../../components/ResetLinkExpired";
import useCheckRecovery from "./useCheckRecovery";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LogoLarge from "../../components/LogoLarge";

function ResetPassword() {
  const navigate = useNavigate();
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

  const { isRecovery, isLoading } = useCheckRecovery();

  const onSubmit = ({ newPassword, confirmPassword }) => {
    if (!newPassword || !confirmPassword) return;

    updateUser(
      { password: newPassword },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success("Password updated successfully!");
          navigate("/");
        },
      },
    );
  };

  if (isLoading)
    return (
      <MainContainer>
        <Loader size="large" text="Loading" />
      </MainContainer>
    );

  if (!isRecovery && !isLoading) return <ResetLinkExpired />;

  return (
    <MainContainer>
      <LogoLarge />

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Heading>Set new password</Heading>

        <Controller
          name="newPassword"
          control={control}
          rules={{
            required: "Enter a password.",
            minLength: {
              value: MIN_PASSWORD_LENGTH,
              message: `Weak password. Minimum ${MIN_PASSWORD_LENGTH} characters required.`,
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
              disabled={isUpdating}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Confirm your password.",
            validate: (value) =>
              value === getValues().newPassword || "Passwords don't match!",
          }}
          render={({ field }) => (
            <InputBox
              type="password"
              value={field.value}
              onChange={field.onChange}
              onBlur={() => trigger("confirmPassword")}
              placeholder="Confirm password"
              htmlFor="confirmPassword"
              error={errors.confirmPassword?.message}
              disabled={isUpdating}
            />
          )}
        />

        <SubmitBtn disabled={isUpdating}>
          {isUpdating ? (
            <>
              <Loader size="small" />
              <span className="ml-2">Updating...</span>
            </>
          ) : (
            <span>Update</span>
          )}
        </SubmitBtn>
      </FormContainer>
    </MainContainer>
  );
}

export default ResetPassword;
