import { useNavigate } from "react-router-dom";
import { RiLoginCircleLine } from "react-icons/ri";
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

  const { isRecovery, isLoading } = useCheckRecovery();

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
      {isLoading ? (
        <Loader size="large" text="Loading" />
      ) : !isRecovery ? (
        <ResetLinkExpired />
      ) : (
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
            {isUpdating && <Loader size="small" />}
            <span>Update</span>
          </SubmitBtn>
        </FormContainer>
      )}
    </MainContainer>
  );
}

export default ResetPassword;
