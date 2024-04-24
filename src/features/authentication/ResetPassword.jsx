import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { useNavigate } from "react-router-dom";
import { RiLoginCircleLine } from "react-icons/ri";
import Loader from "../../components/Loader";
import { useUpdateUser } from "../hooks/useUpdateUser";

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
    <div className="bg- flex min-h-screen items-center justify-center bg-deepSlate text-black dark:bg-deepSlate-dark dark:text-white">
      {isRecovery ? (
        <div className="w-full max-w-80 rounded-xl bg-mediumSlate p-6 dark:bg-mediumSlate-dark">
          <h1 className="mb-8 text-center text-xl  uppercase">
            Update password
          </h1>
          <form onSubmit={handleSubmit} className="mb-4 flex flex-col">
            <div className="input-container mb-4 w-full">
              <div className="relative">
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="off"
                  type="password"
                  id="newPassword"
                  className="peer block w-full appearance-none rounded-lg border-2 border-deepSlate bg-transparent px-2.5 pb-2.5 pt-4 text-sm focus:border-textViolet-dark focus:outline-none focus:ring-0 dark:focus:border-textViolet-dark"
                  placeholder=" "
                />
                <label
                  htmlFor="newPassword"
                  className="pointer-events-none absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-mediumSlate px-2 text-sm text-lightSlate-dark transition-all duration-100 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2  peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-textViolet-dark dark:bg-mediumSlate-dark dark:text-gray-400 peer-focus:dark:text-textViolet-dark rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                >
                  New password
                </label>
              </div>

              {/* <p className="output-message"></p> */}
            </div>

            <div className="input-container mb-4 w-full">
              <div className="relative">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="off"
                  type="password"
                  id="confirmPassword"
                  className="peer block w-full appearance-none rounded-lg border-2 border-deepSlate bg-transparent px-2.5 pb-2.5 pt-4 text-sm focus:border-textViolet-dark focus:outline-none focus:ring-0 dark:focus:border-textViolet-dark"
                  placeholder=" "
                />
                <label
                  htmlFor="confirmPassword"
                  className="pointer-events-none absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-mediumSlate px-2 text-sm text-lightSlate-dark transition-all duration-100 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2  peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-textViolet-dark dark:bg-mediumSlate-dark dark:text-gray-400 peer-focus:dark:text-textViolet-dark rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                >
                  Confirm new password
                </label>
              </div>

              {/* <p className="output-message"></p> */}
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="flex items-center justify-center rounded-md bg-lightViolet p-3 font-bold uppercase leading-6 tracking-wider text-lightSlate transition-all duration-200 hover:bg-darkViolet active:scale-95 disabled:pointer-events-none disabled:bg-darkViolet dark:bg-lightViolet-dark"
            >
              {isUpdating ? <Loader size="small" /> : <RiLoginCircleLine />}
              <span className="ml-2">Update</span>
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p>⚠️ Email link is invalid or has expired!</p>
          <button
            className="rounded-md bg-mediumSlate px-4 py-2 text-mediumSlate-dark dark:bg-mediumSlate dark:text-deepSlate-dark"
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
