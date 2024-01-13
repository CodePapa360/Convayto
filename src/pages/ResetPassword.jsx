import { useEffect, useState } from "react";
import { updateProfile } from "../services/apiProfileUpdate";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const [urlRefreshToken, setUrlRefreshToken] = useState(false);
  const { session } = useUser();
  const refreshToken = session?.refresh_token;
  // console.log("From user", refreshToken);

  // extract the refreshtocken from the window url
  const urlHash = window?.location?.hash?.split("&");
  const token = urlHash[3]?.split("=")[1];
  // const isError = urlHash[2]?.split("=")[1];
  // console.log("From url", token);

  useEffect(() => {
    if (token !== undefined && token !== "") {
      return setUrlRefreshToken(token);
    }
  }, [token]);

  const isRecovery = refreshToken === urlRefreshToken;

  // console.log("isRecovery", isRecovery);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      try {
        updateProfile({ password: newPassword });
        console.log("Password changed successfully");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <div className="bg- flex min-h-screen items-center justify-center bg-deepSlate text-black dark:bg-deepSlate-dark dark:text-white">
      {isRecovery ? (
        <form onSubmit={handleSubmit}>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="New Password"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Confirm Password"
          />

          <button type="submit" value="Reset Password">
            Change
          </button>
        </form>
      ) : (
        <div>
          <p>Invalid token</p>
          <button onClick={() => navigate("/")}>Home</button>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
