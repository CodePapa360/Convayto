import { RiSearchLine, RiMenuLine, RiArrowLeftLine } from "react-icons/ri";
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
import { useUi } from "../contexts/UiContext";

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
    <div className="relative z-30 grid grid-cols-1 grid-rows-[auto_1fr]">
      <div className="border-b border-gray-700 p-2">
        <div className="mb-2 flex items-center justify-between gap-2">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-lg hover:bg-gray-500/30"
            onClick={() => setIsSearching(false)}
          >
            {isSsearching ? <RiArrowLeftLine /> : <RiMenuLine />}
          </button>

          <div
            className="mr-auto flex items-center gap-2"
            onClick={() => onSetMyAccountView(true)}
          >
            <span className="max-w-10">
              <img src="/images/default-avatar.png" alt="Avatar" />
            </span>
            <span className="flex flex-col">
              <span>{fullname}</span>
              <span className="text-sm opacity-70">@{username}</span>
            </span>
          </div>

          <Logout />
        </div>

        <form
          onSubmit={handleSearch}
          className="flex items-center justify-between overflow-hidden rounded-full border border-slate-600 bg-slate-700"
        >
          <input
            className="grow self-stretch bg-transparent pl-4 pr-2 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            onClick={() => setIsSearching(true)}
            placeholder="Search people"
          />

          <button className="m-[2px] items-center justify-center rounded-full bg-violet-500 p-2 text-xl text-white hover:bg-violet-600 active:scale-95">
            <RiSearchLine />
          </button>
        </form>
      </div>

      <div className="p-2">
        {isSsearching && (
          <SearchView onUserClick={setIsSearching} users={results} />
        )}

        {!isSsearching && (
          <div>
            <h2 className="mb-2 border-b border-slate-600 pb-2 text-lg">
              Chats
            </h2>

            <div className="overflow-y-auto">
              {isPending && <p>Loading...</p>}

              {!isPending &&
                sortedConversations?.map((conv) => (
                  <Conversation key={conv.friend.id} conversation={conv} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainSidebarContents;
