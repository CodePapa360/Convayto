import { RiSearchLine, RiMenuLine, RiArrowLeftLine } from "react-icons/ri";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../features/authentication/useUser";
import { useConversatoins } from "../features/converse/useConversations";
import { sortConverseByTime } from "../utils/common";
import Signout from "../features/authentication/Signout";
import Conversation from "./Conversation";
import { useEffect, useState } from "react";
import { getMessages } from "../services/apiAuth";
import SearchView from "./SearchView";
import Loader from "./Loader";

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

    // prefetch();
  });

  return (
    <div className="relative z-30 grid grid-cols-1 grid-rows-[auto_1fr]">
      <div className="border-b border-gray-700 p-2">
        <div className="mb-2 flex items-center justify-between gap-2">
          <button
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg hover:bg-slate-500/30"
            onClick={() => setIsSearching(false)}
          >
            {isSsearching ? <RiArrowLeftLine /> : <RiMenuLine />}
          </button>

          <div
            className="mr-auto grid cursor-pointer grid-cols-[2.5rem_1fr] items-center gap-2 truncate  rounded-lg p-2 hover:bg-slate-500/30"
            onClick={() => onSetMyAccountView(true)}
          >
            <span>
              <img src="./images/default-avatar.svg" alt="Avatar" />
            </span>

            <span className="flex flex-col truncate">
              <span className="truncate">{fullname}</span>
              <span className="truncate text-sm opacity-70">@{username}</span>
            </span>
          </div>

          <Signout />
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
              {isPending && (
                <span className="mt-8 flex flex-col items-center justify-center">
                  <Loader size="medium" text="Loading chats" />
                </span>
              )}

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
