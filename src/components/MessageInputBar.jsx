import styled from "styled-components";
import { useMessages } from "../features/converse/useMessages";
import { useUser } from "../features/authentication/useUser";
import { useState } from "react";
import { useSendNewMessage } from "../features/converse/useSendNewMessage";
import { v4 as uuid } from "uuid";
import { useQueryClient } from "@tanstack/react-query";

function MessageInputBar() {
  const [newMessage, setNewMessage] = useState("");
  const { isSending, sendNewMessage } = useSendNewMessage();
  const { user } = useUser();
  const { data, isPending } = useMessages();
  const conversationId = data?.conversationId;
  const friendUserId = data?.frindDetails.id;
  const myUserId = user.id;

  const queryClient = useQueryClient();

  function handleSendNewMessage(e) {
    e.preventDefault();
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
                      message.id === data.id ? data : message
                    ),
              conversationId: data.conversation_id,
            })
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
      })
    );

    // Reset the input field
    setNewMessage("");
  }

  return (
    <StyledInputBar>
      <form action="">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Message"
        />

        <button
          disabled={isPending || isSending}
          onClick={handleSendNewMessage}
          type="submit"
        >
          Send
        </button>
      </form>
    </StyledInputBar>
  );
}

export default MessageInputBar;

const StyledInputBar = styled.div`
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);

  height: 4rem;
  margin-top: auto;
`;
