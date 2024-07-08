import { useUser } from "../authentication/useUser";
import { formatTime } from "../../utils/common";

function MessageItem({ message }) {
  const { user } = useUser();

  return (
    <div
      className={`${
        message?.sender_id === user.id
          ? "self-end rounded-br-none bg-gradient-to-br from-bgAccent to-bgAccentDim text-textPrimary-dark dark:from-bgAccent-dark dark:to-bgAccentDim-dark"
          : "rounded-bl-none bg-bgPrimary dark:bg-LightShade/20"
      } my-1 w-fit max-w-[80%] rounded-2xl px-4 py-2 shadow-md`}
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

export default MessageItem;
