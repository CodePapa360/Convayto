import { RiSendPlaneFill } from "react-icons/ri";
import { useMessages } from "../features/hooks/useMessages";
import { useUser } from "../features/authentication/useUser";
import { useRef, useState } from "react";
import { useSendNewMessage } from "../features/hooks/useSendNewMessage";
import { v4 as uuid } from "uuid";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "./Loader";

function MessageInputBar() {
  const [newMessage, setNewMessage] = useState("");
  const { isSending, sendNewMessage } = useSendNewMessage();
  const { user } = useUser();
  const { data, isPending } = useMessages();
  const conversationId = data?.conversationId;
  const friendUserId = data?.friendDetails.id;
  const myUserId = user.id;
  const inputRef = useRef(null);
  const queryClient = useQueryClient();

  function handleSendNewMessage(e) {
    e.preventDefault();
    inputRef.current.focus();

    if (!newMessage) return;

    const messageObj = {
      id: uuid(),
      conversation_id: conversationId,
      friendUserId,
      myUserId,
      content: newMessage,
    };

    // Make the actual request to the server
    sendNewMessage(messageObj, {
      onSuccess: (data) => {
        if (conversationId === null) {
          queryClient.setQueryData(
            ["friend", messageObj.friendUserId],
            (prevData) => ({
              ...prevData,
              messages:
                prevData?.messages === null
                  ? [data]
                  : prevData.messages.map((message) =>
                      message.id === data.id ? data : message,
                    ),
              conversationId: data.conversation_id,
            }),
          );
        }
      },
    });

    const optimisticMessage = {
      id: messageObj.id,
      content: messageObj.content,
      created_at: new Date(),
      sender_id: messageObj.myUserId,
    };

    // Update the cache with the optimistic message
    queryClient.setQueryData(
      ["friend", messageObj.friendUserId],
      (prevData) => ({
        ...prevData,
        messages: [...(prevData.messages || []), optimisticMessage],
      }),
    );

    // Reset the input field
    setNewMessage("");
  }

  return (
    <div className="px-4 pb-4 pt-2">
      <form className="bg-lightSlate border-borderShade mx-auto grid  max-w-3xl grid-cols-[1fr_auto] overflow-hidden rounded-full border">
        <input
          className="h-12 w-full bg-transparent pl-4 pr-2 outline-none"
          ref={inputRef}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Message"
        />

        <button
          className={`m-1 flex h-10 w-10 items-center justify-center rounded-full bg-violet-500 text-2xl text-white hover:bg-violet-600 active:scale-95`}
          disabled={isPending || isSending}
          onClick={handleSendNewMessage}
          type="submit"
        >
          {isSending ? <Loader size="small" /> : <RiSendPlaneFill />}
        </button>
      </form>
    </div>
  );
}

export default MessageInputBar;
