import { useState } from "react";
import { updateProfile } from "../services/apiProfileUpdate";

function ResetPassword() {
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
    <div>
      {/* A form to set new password */}
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
    </div>
  );
}

export default ResetPassword;
