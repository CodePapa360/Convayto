import { RiSendPlaneFill } from "react-icons/ri";
import { useUser } from "../authentication/useUser";
import { useRef, useState } from "react";
import { useSendNewMessage } from "./useSendNewMessage";
import { v4 as uuid } from "uuid";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import useConvInfo from "./useConvInfo";

function MessageInputBar() {
  const { convInfo, isPending: isPendingConvInfo, isError } = useConvInfo();

  const [newMessage, setNewMessage] = useState("");
  const { isSending, sendNewMessage } = useSendNewMessage();
  const { user } = useUser();
  const conversationId = convInfo?.id;
  const friendUserId = convInfo?.friendInfo?.id;
  const myUserId = user?.id;
  const inputRef = useRef(null);
  const queryClient = useQueryClient();

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

    // Make the actual request to the server
    sendNewMessage(messageObj, {
      onSuccess: (newMessage) => {
        // when conversation id is null, it means the conversation is new. So update the convInfo query data with the new conversation id
        if (!conversationId) {
          queryClient.setQueryData(["convInfo", friendUserId], (prevData) => {
            return {
              ...prevData,
              id: newMessage.conversation_id,
            };
          });
        }
      },
    });

    setNewMessage("");
  }

  return (
    <div className="px-4 py-2">
      <form className="mx-auto grid max-w-3xl grid-cols-[1fr_auto] overflow-hidden rounded-full border bg-lightSlate shadow-md dark:border-borderShade-dark dark:bg-lightSlate-dark">
        <label htmlFor="inputMessage" className="sr-only" />
        <input
          className="h-12 w-full bg-transparent pl-4 pr-2 outline-none"
          ref={inputRef}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Message"
          id="inputMessage"
        />

        <button
          className={`m-1 flex h-10 w-10 items-center justify-center rounded-full bg-lightViolet text-2xl text-white hover:bg-lightViolet/80 active:scale-95 disabled:opacity-70 dark:bg-lightViolet-dark`}
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
