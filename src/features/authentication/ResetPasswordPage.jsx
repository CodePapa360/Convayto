import Loader from "../../components/Loader";
import useResetPasswordForEmail from "./useResetPasswordForEmail";
import { RiArrowLeftSLine } from "react-icons/ri";
import Heading from "../../components/Heading";
import MainContainer from "../../components/MainContainer";
import FormContainer from "../../components/FormContainer";
import InputBox from "../../components/InputBox";
import SubmitBtn from "../../components/SubmitBtn";
import TextLink from "../../components/TextLink";
import { Controller, useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../../config";
import RecoveryEmailSent from "../../components/RecoveryEmailSent";
import LogoLarge from "../../components/LogoLarge";

function ResetPasswordPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const {
    resetPassword,
    isPending: isResetting,
    isSuccess,
  } = useResetPasswordForEmail();

  function onSubmit({ email }) {
    resetPassword(email);
  }

  return (
    <MainContainer>
      <LogoLarge />

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        {isSuccess ? (
          <RecoveryEmailSent />
        ) : (
          <>
            <Heading>Reset your password</Heading>
            <p className="mb-4 text-center text-sm">
              Enter your email below and we'll send you a recovery link to reset
              your password.
            </p>

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
                  disabled={isResetting}
                />
              )}
            />

            <SubmitBtn isPending={isResetting} disabled={isResetting}>
              {isResetting ? (
                <>
                  <Loader size="small" />
                  <span className="ml-2">Sending...</span>
                </>
              ) : (
                <span className="">Send</span>
              )}
            </SubmitBtn>

            <TextLink
              to="/signin"
              addClass="flex items-center justify-center self-center"
            >
              <RiArrowLeftSLine />
              Back to Sign in
            </TextLink>
          </>
        )}
      </FormContainer>
    </MainContainer>
  );
}

export default ResetPasswordPage;
