import styled from "styled-components";
import { useMessages } from "../features/converse/useMessages";
import { useUser } from "../features/authentication/useUser";
import { useState } from "react";
import { useSendNewMessage } from "../features/converse/useSendNewMessage";

function MessageInputBar() {
  const [newMessage, setNewMessage] = useState("");
  const { isSending, sendNewMessage } = useSendNewMessage();
  const { user } = useUser();
  const { data, isPending, setData } = useMessages();
  const conversationId = data?.conversationId;
  const friendUserId = data?.frindDetails[0].id;
  const myUserId = user.id;

  function handleSendNewMessage(e) {
    e.preventDefault();
    if (!newMessage) return;

    // Optimistically update the UI
    const optimisticMessage = {
      id: Math.random().toString(),
      conversationId,
      friendUserId,
      content: newMessage,
      sender_id: myUserId,
      created_at: false,
    };

    // setData((prev) => ({
    //   ...prev,
    //   messages: [...(prev.messages || []), optimisticMessage],
    // }));

    // Make the actual request to the server
    sendNewMessage(
      {
        conversationId,
        friendUserId,
        myUserId,
        content: newMessage,
      },
      {
        onSuccess: (dataFromServer) => {
          // Update the UI with the response from the server
          setData((prev) => ({
            ...prev,
            messages: prev.messages.map((message) =>
              message.id === optimisticMessage.id
                ? { ...dataFromServer, created_at: dataFromServer.created_at }
                : message
            ),
          }));

          // Reset the input field
          setNewMessage("");
        },
      }
    );
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

      {/* <button>Test button</button> */}
    </StyledInputBar>
  );
}

export default MessageInputBar;

const StyledInputBar = styled.div`
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);

  height: 4rem;
  margin-top: auto;
`;
