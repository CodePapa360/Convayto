import styled from "styled-components";
import { useMessages } from "../features/converse/useMessages";
import { useUser } from "../features/authentication/useUser";
import { useState } from "react";
import { useSendNewMessage } from "../features/converse/useSendNewMessage";
import { useQueryClient } from "@tanstack/react-query";

function MessageInputBar() {
  const quryClient = useQueryClient();

  const [newMessage, setNewMessage] = useState("");
  const { isSending, sendNewMessage } = useSendNewMessage();
  const { user } = useUser();
  const { data, isPending } = useMessages();
  const conversationId = data?.conversationId;
  const friendUserId = data?.frindDetails[0].id;
  const myUserId = user.id;

  const isFirstMessage = conversationId === null;

  // console.log(conversationId, friendUserId, conversationId);

  function handleSendNewMessage(e) {
    e.preventDefault();
    if (!newMessage) return;

    if (isFirstMessage) {
      sendNewMessage(
        {
          conversationId,
          friendUserId,
          myUserId,
          content: newMessage,
        },
        {
          onSuccess: () => {
            quryClient.invalidateQueries({
              queryKey: ["friend"],
            });

            setNewMessage("");
          },
        }
      );
    } else {
      sendNewMessage(
        {
          conversationId,
          friendUserId,
          myUserId,
          content: newMessage,
        },
        {
          onSuccess: () => {
            setNewMessage("");
          },
        }
      );
    }
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
