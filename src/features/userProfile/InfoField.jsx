import { RiCheckFill, RiEdit2Line } from "react-icons/ri";
import Loader from "../../components/Loader";
import { useEffect, useRef, useState } from "react";
import { useUpdateUser } from "./useUpdateUser";
import { useForm } from "react-hook-form";

function InfoField({
  minLength,
  maxLength,
  label,
  oldValue,
  updateKey,
  regex,
  patternMessage,
}) {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: { [updateKey]: oldValue } });
  const currentValue = watch(updateKey);

  const { updateUser, isUpdating } = useUpdateUser();
  const [isEditing, setIsEditing] = useState(false);

  // const inputRef = useRef();

  // useEffect(() => {
  //   if (isEditing && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [isEditing]);

  function handleUpdate(data, e) {
    if (!isEditing) return setIsEditing(true);

    const cleanValue = data[updateKey].trim();
    if (cleanValue === oldValue) return setIsEditing(false);

    if (isEditing) {
      updateUser(
        { [updateKey]: cleanValue },
        {
          onSuccess: () => {
            setIsEditing(false);
          },
          onError: (err) => {
            setError(updateKey, {
              type: "server",
              message: err.message,
            });
          },
        },
      );
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit(handleUpdate)} className="mt-8">
      <div className="flex items-center justify-between">
        <label
          htmlFor="name"
          className="select-none text-sm font-bold tracking-wider text-textViolet  opacity-80 dark:text-textViolet-dark"
        >
          {label}
        </label>

        {updateKey && (
          <button
            type="submit"
            className="flex h-11 w-11 items-center justify-center rounded-full text-xl text-textViolet 
            hover:bg-black/10 dark:text-textViolet-dark dark:hover:bg-lightSlate/10"
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
            <input
              autoComplete="off"
              id="name"
              type="text"
              // ref={inputRef}
              maxLength={maxLength}
              {...register(updateKey, {
                required: `please enter your ${label}`,
                pattern: {
                  value: regex,
                  message: patternMessage || "Invalid input",
                },
                maxLength: {
                  value: maxLength,
                  message: `Maximum ${maxLength} characters allowed.`,
                },
              })}
              className={`${
                errors[updateKey]
                  ? "border-red-500"
                  : "border-textViolet  dark:border-textViolet-dark"
              } h-10 w-full rounded-md border-b-2  bg-lightSlate px-2  text-base text-deepSlate-dark outline-none   dark:bg-lightSlate-dark dark:text-lightSlate`}
            />
            <span className="mt-3 flex w-11 select-none items-start justify-center text-xs opacity-60">
              {maxLength - currentValue.length}
            </span>
          </div>

          {errors[updateKey] && (
            <p className="mt-1 text-xs text-red-500">
              {errors[updateKey].message}
            </p>
          )}
        </div>
      ) : (
        <p className="self-center truncate px-2 text-base">
          {label === "Username" ? "@" : ""}
          {currentValue}
        </p>
      )}
    </form>
  );
}

export default InfoField;
