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
import EmailSent from "../../components/EmailSent";

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
    isError,
    error,
  } = useResetPasswordForEmail();

  function onSubmit({ email }) {
    resetPassword(email);
  }

  return (
    <MainContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        {isSuccess ? (
          <EmailSent />
        ) : (
          <>
            <Heading>Reset your password</Heading>
            <p className="mb-4 text-center text-sm">
              Enter your email address below and we'll send you a link to reset
              your password.
            </p>

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
                  placeholder="Email"
                  htmlFor="email"
                  error={errors.email?.message}
                />
              )}
            />

            <SubmitBtn isPending={isResetting} disabled={isResetting}>
              {isResetting && <Loader customClasses="mr-2" size="small" />}
              <span>Send</span>
            </SubmitBtn>

            <TextLink to="/signin" addClass="flex items-center justify-center">
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
