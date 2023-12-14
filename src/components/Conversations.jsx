import styled from "styled-components";
import { useConversatoins } from "../features/converse/useConversations";
import Conversation from "./Conversation";
import { sortConverseByTime } from "../utils/common";
import { useUser } from "../features/authentication/useUser";
import { getMessages } from "../services/apiAuth";
import { useQueryClient } from "@tanstack/react-query";

function Conversations() {
  const { data: conversations, isPending } = useConversatoins();
  const { user } = useUser();
  const queryClient = useQueryClient();

  const sortedConversations =
    conversations?.length > 1
      ? conversations?.sort(sortConverseByTime)
      : conversations;

  // prefetching messages of other conversations
  sortedConversations?.slice(0, 5).forEach((conv) => {
    const { friend } = conv;
    const { id: friendUserId } = friend;
    const myUserId = user?.id;

    const test = async () => {
      // The results of this query will be cached like a normal query
      await queryClient.prefetchQuery({
        queryKey: ["friend", friendUserId],
        queryFn: () => getMessages({ myUserId, friendUserId }),
      });
    };

    test();
  });

  // const { data, error } = useQuery({
  //   queryKey: ["friend", friendUserId],
  //   queryFn: () => getMessages({ myUserId, friendUserId }),
  //   // Use previousData to update the messages array
  //   select: (data) => ({ ...data, messages: [...(data?.messages || [])] }),
  // });

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
