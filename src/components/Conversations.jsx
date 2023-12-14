import styled from "styled-components";
import { useConversatoins } from "../features/converse/useConversations";
import Conversation from "./Conversation";
import { sortConverseByTime } from "../utils/common";

function Conversations() {
  const { data: conversations, isPending } = useConversatoins();

  const sortedConversations =
    conversations?.length > 1
      ? conversations?.sort(sortConverseByTime)
      : conversations;

  return (
    <StyledConversations>
      <h2>Conversations</h2>

      <hr />

      <ConversationsContainer>
        {isPending && <p>Loading...</p>}

        {sortedConversations?.map((conv) => (
          <Conversation key={conv.friend.id} conversation={conv} />
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
