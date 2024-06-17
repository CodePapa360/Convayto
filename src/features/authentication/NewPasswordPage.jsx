import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { Link, useNavigate } from "react-router-dom";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaExclamationTriangle, FaAngleUp } from "react-icons/fa";
import Loader from "../../components/Loader";
import { useUpdateUser } from "../userProfile/useUpdateUser";
import Form from "../../components/Form";
import FormBtn from "../../components/FormBtn";
import MainContainer from "../../components/MainContainer";
import InputBox from "../../components/InputBox";
import Heading from "../../components/Heading";

function ResetPassword() {
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

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPassword) return;

    if (newPassword !== confirmPassword)
      return console.log("Password did not match!");

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
        <Form onSubmit={handleSubmit}>
          <Heading size="2xl">Set new password</Heading>

          <InputBox
            type="password"
            value={newPassword}
            onChange={setNewPassword}
            placeholder="New password"
            htmlFor="newPassword"
          />

          <InputBox
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm new password"
            htmlFor="confirmPassword"
          />

          <FormBtn disabled={isUpdating}>
            {isUpdating ? <Loader size="small" /> : <RiLoginCircleLine />}
            <span className="ml-2">Update</span>
          </FormBtn>
        </Form>
      )}

      {!isRecovery && (
        <>
          <FaExclamationTriangle className="mb-4 text-4xl text-red-500 sm:text-5xl" />

          <Heading size="2xl">
            Oops! The password reset link is invalid or expired.
          </Heading>

          <p className="mb-4 text-center text-gray-500 dark:text-gray-400">
            The link you clicked to reset your password might be incorrect,
            expired, or used already. Please request a new password reset.
          </p>

          <Link
            to="/forgot-password"
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
