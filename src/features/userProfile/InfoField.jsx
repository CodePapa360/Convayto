import { RiCheckFill, RiEdit2Line } from "react-icons/ri";
import Loader from "../../components/Loader";
import { useEffect, useRef, useState } from "react";
import { useUpdateUser } from "./useUpdateUser";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

function InfoField({
  minLength = 1,
  maxLength,
  label,
  oldValue = "",
  updateKey = "none",
  regex,
  patternMessage,
  checkUsername,
  isChecking,
  isTaken,
  isBusy,
  reset,
}) {
  const {
    handleSubmit,
    watch,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm({ defaultValues: { [updateKey]: oldValue } });
  const currentValue = watch(updateKey);
  const remainingChars = maxLength - currentValue.length;

  const { updateUser, isUpdating } = useUpdateUser();
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  ///////////////
  // For username checking
  ///////////////
  useEffect(() => {
    if (updateKey !== "username") return;

    if (isChecking) {
      setError(updateKey, {
        type: "checking",
        message: "Checking...",
      });
    } else if (isTaken) {
      setError(updateKey, {
        type: "server",
        message: "Username is already taken.",
      });
    } else {
      clearErrors(updateKey);
    }
  }, [isChecking, isTaken, setError, clearErrors, updateKey]);

  /////////////////
  // Handle update
  /////////////////

  function handleUpdate(data) {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    const cleanValue = data[updateKey].trim();
    if (cleanValue === oldValue) {
      setIsEditing(false);
      reset && reset();
      return;
    }

    if (!isUpdating && !isBusy && !isTaken) {
      updateUser(
        { [updateKey]: cleanValue },
        {
          onSuccess: () => {
            toast.dismiss();
            toast.success(`Updated ${label.toLowerCase()} successfully!`);
            setIsEditing(false);
            reset && reset();
          },
          onError: (err) => {
            setError(updateKey, {
              type: "server",
              message: err.message,
            });
          },
        },
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(handleUpdate)} className="mt-5">
      <div className="flex h-11 items-center justify-between">
        <label
          htmlFor={updateKey}
          className="select-none text-sm font-bold tracking-wider text-textAccent opacity-80 dark:text-textAccent-dark"
        >
          {label}
        </label>
        {updateKey !== "none" && (
          <button
            disabled={isUpdating || isBusy || isTaken}
            type="submit"
            className="flex h-11 w-11 items-center justify-center rounded-full text-xl text-textAccent hover:bg-LightShade/20 dark:text-textAccent-dark"
          >
            {isUpdating ? (
              <Loader />
            ) : isEditing ? (
              <RiCheckFill aria-label="Update" />
            ) : (
              <RiEdit2Line aria-label="Edit" />
            )}
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col">
          <div className="flex justify-between">
            <Controller
              name={updateKey}
              control={control}
              rules={{
                required: `Enter your ${label}`,
                pattern: {
                  value: regex,
                  message: patternMessage || "Invalid input.",
                },
                maxLength: {
                  value: maxLength,
                  message: `Maximum ${maxLength} characters allowed.`,
                },
                minLength: {
                  value: minLength,
                  message: `Minimum ${minLength} characters required.`,
                },
                validate: (value) => {
                  if (updateKey === "username")
                    return checkUsername(value, oldValue);

                  return true;
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  autoComplete="off"
                  autoCapitalize="none"
                  onBlur={() => field.onBlur()}
                  id={updateKey}
                  type="text"
                  ref={(e) => {
                    field.ref(e);
                    inputRef.current = e;
                  }}
                  maxLength={maxLength}
                  className={`${
                    errors[updateKey] && errors[updateKey].type !== "checking"
                      ? "border-RedColor"
                      : "border-textAccent dark:border-textAccent-dark"
                  } h-10 w-full rounded-md border-b-2 bg-bgSecondary px-2 text-base text-textPrimary outline-none dark:bg-LightShade/20 dark:text-textPrimary-dark`}
                />
              )}
            />

            <span className="mt-3 flex w-11 select-none items-start justify-center text-xs text-textAccent dark:text-textAccent-dark">
              {remainingChars}
            </span>
          </div>

          {errors[updateKey] && errors[updateKey].message && (
            <p
              className={`mt-1 text-xs ${
                errors[updateKey].type === "checking"
                  ? "text-textAccent-dark"
                  : "text-RedColor"
              }`}
            >
              {errors[updateKey].message}
            </p>
          )}
        </div>
      ) : (
        <p className="self-center text-base">
          {label === "Username" ? "@" : ""}
          {currentValue}
        </p>
      )}
    </form>
  );
}

export default InfoField;
