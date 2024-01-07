import { useUser } from "../features/authentication/useUser";
import { formatTime } from "../utils/common";

function Message({ message }) {
  const { user } = useUser();

  return (
    <div
      className={`${
        message?.sender_id === user.id
          ? "bg-darkViolet dark:bg-darkViolet-dark self-end rounded-br-none text-white"
          : "rounded-bl-none bg-mediumSlate dark:bg-mediumSlate-dark"
      } w-fit max-w-[80%] rounded-2xl bg-mediumSlate px-4 py-2 dark:bg-mediumSlate-dark`}
    >
      <p>
        {message?.content}
        <span className="float-right ml-2 mt-2 select-none text-xs opacity-70">
          {formatTime(message?.created_at)}
        </span>
      </p>
    </div>
  );
}

export default Message;
