import {
  RiSearchLine,
  RiMenuLine,
  RiCloseFill,
  RiArrowLeftLine,
} from "react-icons/ri";
import { useUser } from "../authentication/useUser";
import { useConversations } from "./useConversations";
import Signout from "../authentication/Signout";
import ConversationItem from "./ConversationItem";
import { useEffect, useRef, useState } from "react";
import SearchView from "../userSearch/SearchView";
import Loader from "../../components/Loader";
import { useUi } from "../../contexts/UiContext";
import DropdownMenu from "../../components/DropdownMenu";
import { HiOutlineUserCircle } from "react-icons/hi2";

function MainSidebarContents() {
  const { conversations, isPending } = useConversations();
  const {
    openAccountView,
    isSearchView,
    openSearchView,
    closeSearchView,
    isMenuOpen,
    toggleMenu,
  } = useUi();

  const { user } = useUser();
  const { fullname, username, avatar_url } = user.user_metadata;
  const [query, setQuery] = useState("");

  const searchInputRef = useRef(null);

  useEffect(() => {
    setQuery("");
    if (!isSearchView && searchInputRef.current) {
      searchInputRef.current.blur();
    }
  }, [isSearchView]);

  function handleMenuBtnClick() {
    // if is searching then close search view else open menu
    if (isSearchView) {
      closeSearchView();
    } else {
      toggleMenu();
    }
  }

  return (
    <div className="relative z-30 grid h-screen-safe select-none grid-cols-1 grid-rows-[auto_1fr] overflow-hidden">
      <div className="border-b border-borderShade p-2 dark:border-borderShade-dark">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="relative">
            <button
              className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-lg hover:bg-black/10 dark:hover:bg-lightSlate/10"
              onClick={handleMenuBtnClick}
              aria-label="Menu"
            >
              {isSearchView ? (
                <RiArrowLeftLine aria-label="Go back" />
              ) : isMenuOpen ? (
                <RiCloseFill aria-label="Close menu" />
              ) : (
                <RiMenuLine aria-label="Menu icon" />
              )}
            </button>

            {isMenuOpen && <DropdownMenu />}
          </div>

          {/* Profile */}
          <div
            className="mr-auto grid cursor-pointer grid-cols-[2.5rem_1fr] gap-4 truncate rounded-lg p-2 hover:bg-black/10 dark:hover:bg-lightSlate/10"
            onClick={() => openAccountView()}
            role="button"
            tabIndex={0}
          >
            <div className="h-11 w-11 overflow-hidden rounded-full text-black  dark:text-white">
              {avatar_url ? (
                <img
                  draggable="false"
                  src={avatar_url}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <HiOutlineUserCircle
                  size={55}
                  viewBox="2 2 25 25"
                  opacity={0.5}
                  strokeWidth="1"
                />
              )}
            </div>

            <div className="truncate text-left">
              <p className="truncate">{fullname}</p>
              <p className="truncate text-sm opacity-70">@{username}</p>
            </div>
          </div>

          <Signout />
        </div>

        <div className="relative">
          <label htmlFor="searchPeople" className="sr-only">
            Search people
          </label>
          <input
            id="searchPeople"
            className="flex w-full grow items-center justify-between self-stretch overflow-hidden rounded-full border border-borderShade bg-lightSlate p-2 pl-9 outline-none transition-all duration-200 ease-in-out focus:ring-2 focus:ring-darkViolet dark:border-borderShade-dark dark:bg-lightSlate-dark dark:focus:ring-textViolet-dark"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            onClick={() => openSearchView()}
            placeholder="Search people"
            aria-label="Search people"
            ref={searchInputRef}
          />

          <span className="pointer-events-none absolute left-3 top-3 text-xl opacity-40">
            <RiSearchLine aria-label="search icon" />
          </span>
        </div>
      </div>

      <div className="h-full  overflow-auto">
        {isSearchView && <SearchView query={query} />}

        {!isSearchView && (
          <div className="grid h-full grid-rows-[auto_1fr]">
            <h2 className="border-borderShadep border-b p-2 text-lg dark:border-borderShade-dark">
              Chats
            </h2>

            <div className="h-full overflow-auto p-2">
              {isPending && (
                <span className="mt-8 flex flex-col items-center justify-center">
                  <Loader size="medium" text="Loading chats" />
                </span>
              )}

              {!isPending &&
                conversations?.map((conv) => (
                  <ConversationItem
                    key={conv?.friendInfo?.id}
                    conversation={conv}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainSidebarContents;
