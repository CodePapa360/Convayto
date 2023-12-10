import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getConversations } from "../services/apiAuth";
import { useUser } from "../features/authentication/useUser";
import { useConversatoins } from "../features/converse/useConversations";
import Conversation from "./Conversation";

function Conversations() {
  const navigate = useNavigate();

  const { data: conversations, isPending } = useConversatoins();

  function handlClick() {
    navigate("/userId?1234");
  }

  return (
    <StyledConversations>
      <h2>Conversations</h2>

      <hr />

      <ConversationsContainer>
        {isPending && <p>Loading...</p>}

        {conversations?.map((conv, i) => (
          <Conversation key={conv.user.id} conversation={conv} />
        ))}
      </ConversationsContainer>
    </StyledConversations>
  );
}

export default Conversations;

const StyledConversations = styled.div`
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
`;

const ConversationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100vh;
  height: 100dvh;
`;
