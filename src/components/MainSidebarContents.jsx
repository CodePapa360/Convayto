import { RiSearchLine, RiMenuLine, RiArrowLeftLine } from "react-icons/ri";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../features/authentication/useUser";
import { useConversatoins } from "../features/converse/useConversations";
import { sortConverseByTime } from "../utils/common";
import Logout from "../features/authentication/Signout";
import Conversation from "./Conversation";
import { useEffect, useState } from "react";
import { getMessages } from "../services/apiAuth";
import SearchView from "./SearchView";

function MainSidebarContents({ onSetMyAccountView }) {
  const [isSsearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery("");
  }, [isSsearching]);

  const { user } = useUser();
  const { fullname, username } = user.user_metadata;

  const { data: conversations, isPending } = useConversatoins();
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

    const prefetch = async () => {
      // The results of this query will be cached like a normal query
      await queryClient.prefetchQuery({
        queryKey: ["friend", friendUserId],
        queryFn: () => getMessages({ myUserId, friendUserId }),
      });
    };

    prefetch();
  });

  return (
    <div className="relative z-30 grid grid-cols-1 grid-rows-[auto_1fr]">
      <div className="border-b border-gray-700 p-2">
        <div className="mb-2 flex items-center justify-between gap-2">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-lg hover:bg-slate-500/30"
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

        <div className="relative">
          <input
            className="bg-transparentf flex w-full grow items-center justify-between self-stretch overflow-hidden rounded-full border border-slate-600 bg-slate-700 p-2 pl-9 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            onClick={() => setIsSearching(true)}
            placeholder="Search people"
          />

          <span className="pointer-events-none absolute left-3 top-3 text-xl text-white opacity-40">
            <RiSearchLine />
          </span>
        </div>
      </div>

      <div className="p-2">
        {isSsearching && (
          <SearchView query={query} onUserClick={setIsSearching} />
        )}

        {!isSsearching && (
          <div>
            <h2 className="mb-2 border-b border-slate-600 pb-2 text-lg">
              Chats
            </h2>

            <div>
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
