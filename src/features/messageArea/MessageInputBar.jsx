import { RiSendPlaneFill } from "react-icons/ri";
import { useUser } from "../authentication/useUser";
import { useRef, useState } from "react";
import { useSendNewMessage } from "./useSendNewMessage";
import { v4 as uuid } from "uuid";
import Loader from "../../components/Loader";
import useConvInfo from "./useConvInfo";

function MessageInputBar() {
  const {
    convInfo,
    isPending: isPendingConvInfo,
    isError: isConvInfoError,
  } = useConvInfo();

  const [newMessage, setNewMessage] = useState("");
  const { isSending, sendNewMessage } = useSendNewMessage();
  const { user } = useUser();
  const conversationId = convInfo?.id;
  const friendUserId = convInfo?.friendInfo?.id;
  const myUserId = user?.id;
  const inputRef = useRef(null);

  function handleSendNewMessage(e) {
    e.preventDefault();
    inputRef.current.focus();

    if (!newMessage) return;

    const messageObj = {
      id: uuid(),
      conversation_id: conversationId,
      content: newMessage,
      friendUserId,

      // for optimistic update in the cache
      sender_id: myUserId,
      created_at: new Date(),
      optimistic: true,
    };

    setNewMessage("");

    // Make the actual request to the server
    sendNewMessage(messageObj, {
      onError: (_, message) => {
        setNewMessage(message.content);
      },
    });
  }

  if (isConvInfoError) return null;

  return (
    <div className="px-4 py-2">
      <form className="mx-auto grid max-w-3xl grid-cols-[1fr_auto] overflow-hidden rounded-full border border-transparent bg-bgPrimary shadow-lg dark:border-LightShade/20 dark:bg-LightShade/20">
        <label htmlFor="inputMessage" className="sr-only" />
        <input
          disabled={isPendingConvInfo}
          className="h-12 w-full bg-transparent pl-4 pr-2 outline-none"
          ref={inputRef}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Message"
          id="inputMessage"
          autoComplete="off"
        />

        <button
          className={`m-1 flex h-10 w-10 items-center justify-center rounded-full bg-bgAccent text-2xl text-textPrimary-dark hover:bg-bgAccentDim active:scale-95 disabled:opacity-70 dark:bg-bgAccent-dark dark:hover:bg-bgAccentDim-dark`}
          disabled={isSending || isPendingConvInfo}
          onClick={handleSendNewMessage}
          type="submit"
        >
          {isSending ? (
            <Loader size="small" />
          ) : (
            <RiSendPlaneFill aria-label="send button" />
          )}
        </button>
      </form>
    </div>
  );
}

export default MessageInputBar;
