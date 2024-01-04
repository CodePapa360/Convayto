import {
  RiSearchLine,
  RiMenuLine,
  RiCloseFill,
  RiArrowLeftLine,
} from "react-icons/ri";
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
import { useUi } from "../contexts/UiContext";
import { useSignout } from "../features/authentication/useSignout";

function MainSidebarContents() {
  const { logout } = useSignout();

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
      <div className="border-b border-gray-700 p-2">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="relative">
            <button
              className="relative z-50 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-lg hover:bg-slate-500/30"
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

                <div
                  className={`fadeIn absolute left-4 top-10 z-50 mt-2 min-w-[15rem] select-none divide-y divide-gray-200 rounded-lg bg-white p-2 opacity-100 shadow-2xl transition-[opacity,margin] duration-200 ease-in-out dark:divide-gray-700 dark:border dark:border-gray-700 dark:bg-gray-800`}
                >
                  <div className="py-2 first:pt-0 last:pb-0">
                    <button
                      className="flex w-full items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                      onClick={() => openAccountView()}
                    >
                      My Account
                    </button>

                    <a
                      className="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                      href="#"
                    >
                      Dark Mode
                    </a>

                    <a
                      className="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                      href="https://github.com/CodePapa360/ConverseMe/issues"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Report Bug
                    </a>

                    <a
                      className="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                      href="#"
                    >
                      About
                    </a>
                  </div>
                  <div className="py-2 first:pt-0 last:pb-0">
                    <button
                      className="flex w-full items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                      onClick={() => logout()}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile */}
          <div
            className="mr-auto grid cursor-pointer grid-cols-[2.5rem_1fr] items-center gap-2 truncate  rounded-lg p-2 hover:bg-slate-500/30"
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
            className="bg-transparentf flex w-full grow items-center justify-between self-stretch overflow-hidden rounded-full border border-slate-600 bg-slate-700 p-2 pl-9 outline-none"
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
