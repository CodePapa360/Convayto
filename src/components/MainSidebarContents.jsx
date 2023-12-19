import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../features/authentication/useUser";
import { useConversatoins } from "../features/converse/useConversations";
import { sortConverseByTime } from "../utils/common";
import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import Conversation from "./Conversation";
import { useState } from "react";
import { getMessages, searchPeople } from "../services/apiAuth";
import SearchView from "./SearchView";

function MainSidebarContents({ onSetMyAccountView }) {
  const [isSsearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { user } = useUser();
  const { fullname, username } = user.user_metadata;

  const { data: conversations, isPending } = useConversatoins();
  const queryClient = useQueryClient();

  const sortedConversations =
    conversations?.length > 1
      ? conversations?.sort(sortConverseByTime)
      : conversations;

  // console.log("sorted Conversations", sortedConversations)
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

  async function handleSearch(e) {
    e.preventDefault();
    if (!query) return;

    const res = await searchPeople(query);
    setResults(res);
    setQuery("");
  }

  return (
    <>
      <StyledHeaderBar>
        <ProfileDetails>
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
        </ProfileDetails>

        <SearchBar>
          <button onClick={() => setIsSearching(false)}>⬅</button>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            onClick={() => setIsSearching(true)}
            placeholder="Search people"
          />

          <button onClick={handleSearch}>🔍</button>
        </SearchBar>
      </StyledHeaderBar>

      <UsersContainer>
        {isSsearching && (
          <SearchView onUserClick={setIsSearching} users={results} />
        )}

        {!isSsearching && (
          <ChatsContainer>
            <h2>Conversations</h2>

            <hr />

            <ConversationsContainer>
              {isPending && <p>Loading...</p>}

              {!isPending &&
                sortedConversations?.map((conv) => (
                  <Conversation key={conv.friend.id} conversation={conv} />
                ))}
            </ConversationsContainer>
          </ChatsContainer>
        )}
      </UsersContainer>
    </>
  );
}

export default MainSidebarContents;

const StyledHeaderBar = styled.div`
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);

  /* display: flex; */
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const ProfileDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  > :first-child {
    max-width: 3rem;
  }

  > :last-child {
    display: flex;
    flex-direction: column;
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 0.5rem;

  input {
    width: 100%;
  }
`;

///////
const UsersContainer = styled.div`
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
`;

const ChatsContainer = styled.div``;

const ConversationsContainer = styled.div`
  overflow-y: auto;
  height: 100%;
`;
