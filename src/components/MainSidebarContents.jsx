import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../features/authentication/useUser";
import { useConversatoins } from "../features/converse/useConversations";
import { sortConverseByTime } from "../utils/common";
import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import Conversation from "./Conversation";
import { useState } from "react";

function MainSidebarContents({ onSetMyAccountView }) {
  const [searchView, setSearchView] = useState(false);
  const { user } = useUser();
  const { fullname, username } = user.user_metadata;

  const { data: conversations, isPending } = useConversatoins();
  const queryClient = useQueryClient();

  const sortedConversations =
    conversations?.length > 1
      ? conversations?.sort(sortConverseByTime)
      : conversations;

  // prefetching messages of other conversations
  // sortedConversations?.slice(0, 5).forEach((conv) => {
  //   const { friend } = conv;
  //   const { id: friendUserId } = friend;
  //   const myUserId = user?.id;

  //   const test = async () => {
  //     // The results of this query will be cached like a normal query
  //     await queryClient.prefetchQuery({
  //       queryKey: ["friend", friendUserId],
  //       queryFn: () => getMessages({ myUserId, friendUserId }),
  //     });
  //   };

  //   test();
  // });

  return (
    <>
      <StyledHeaderBar>
        <Profile onClick={() => onSetMyAccountView(true)}>
          <span>
            <img src="/images/default-avatar.png" alt="Avatar" />
          </span>
          <span>
            <span>{fullname}</span>
            <span>@{username}</span>
          </span>
        </Profile>

        <Logout />

        <SearchBar>
          <input type="text" placeholder="Search people" />
        </SearchBar>
      </StyledHeaderBar>

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
    </>
  );
}

export default MainSidebarContents;

const StyledHeaderBar = styled.div`
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  > :first-child {
  }

  > :last-child {
    display: flex;
    flex-direction: column;
  }
`;

const SearchBar = styled.div`
  input {
    width: 8rem;
  }
`;

///////
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
