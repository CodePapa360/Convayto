import {
  RiSearchLine,
  RiMenuLine,
  RiCloseFill,
  RiArrowLeftLine,
} from "react-icons/ri";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../features/authentication/useUser";
import { useConversatoins } from "../features/hooks/useConversations";
import { sortConverseByTime } from "../utils/common";
import Signout from "../features/authentication/Signout";
import Conversation from "./Conversation";
import { useEffect, useState } from "react";
import { getMessages } from "../services/apiAuth";
import SearchView from "./SearchView";
import Loader from "./Loader";
import { useUi } from "../contexts/UiContext";
import Dropdown from "./Dropdown";

function MainSidebarContents() {
  const { openAccountView, isSearchView, toggleSearchView } = useUi();
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setQuery("");
  }, [isSearchView]);

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

  // const menuRef = useRef(null);
  // const menuBtnRef = useRef(null);

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (
  //       menuRef.current &&
  //       !menuRef.current.contains(event.target) &&
  //       menuBtnRef.current &&
  //       !menuBtnRef.current.contains(event.target)
  //     ) {
  //       setIsMenuOpen(false);
  //     }
  //   }

  //   document.addEventListener("mouseover", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mouseover", handleClickOutside);
  //   };
  // }, [menuRef, menuBtnRef]);

  function handleMenuBtnClick() {
    // if is searching then close search view else open menu
    if (isSearchView) {
      toggleSearchView();
    } else {
      setIsMenuOpen((prev) => !prev);
    }
  }

  return (
    <div className="relative z-30 grid select-none grid-cols-1 grid-rows-[auto_1fr]">
      <div className="border-borderShade border-b p-2">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="relative">
            <button
              className="hover:bg-lightSlate/50 relative z-50 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-lg"
              onClick={handleMenuBtnClick}
            >
              {isSearchView ? (
                <RiArrowLeftLine />
              ) : isMenuOpen ? (
                <RiCloseFill />
              ) : (
                <RiMenuLine />
              )}
            </button>

            {isMenuOpen && (
              <>
                {/* Overlay */}
                <div
                  onClick={handleMenuBtnClick}
                  className={`${
                    isMenuOpen
                      ? "pointer-events-auto visible"
                      : "pointer-events-none invisible"
                  }  fixed left-0 top-0 z-40  h-dvh w-dvw opacity-0 transition-all duration-200 ease-in-out`}
                ></div>

                {/* Menu */}

                <Dropdown />
              </>
            )}
          </div>

          {/* Profile */}
          <div
            className="hover:bg-lightSlate/50 mr-auto grid cursor-pointer grid-cols-[2.5rem_1fr] items-center gap-2 truncate rounded-lg p-2"
            onClick={() => openAccountView()}
          >
            <span>
              <img
                draggable="false"
                src="./images/default-avatar.svg"
                alt="Avatar"
              />
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
            className="bg-lightSlate border-borderShade flex w-full grow items-center justify-between self-stretch overflow-hidden rounded-full border p-2 pl-9 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            onClick={() => toggleSearchView()}
            placeholder="Search people"
          />

          <span className="pointer-events-none absolute left-3 top-3 text-xl text-white opacity-40">
            <RiSearchLine />
          </span>
        </div>
      </div>

      <div className="p-2">
        {isSearchView && <SearchView query={query} />}

        {!isSearchView && (
          <div>
            <h2 className="border-borderShade mb-2 border-b pb-2 text-lg">
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
