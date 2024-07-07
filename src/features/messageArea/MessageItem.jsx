import { useUser } from "../authentication/useUser";
import { formatTime } from "../../utils/common";

function MessageItem({ message }) {
  const { user } = useUser();

  return (
    <div
      className={`${
        message?.sender_id === user.id
          ? "to-bgAccentDim dark:to-bgAccentDim-dark self-end rounded-br-none bg-gradient-to-br from-bgAccent text-textPrimary-dark dark:from-bgAccent-dark"
          : "rounded-bl-none bg-LightShade"
      } my-1 w-fit max-w-[80%] rounded-2xl px-4 py-2`}
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
