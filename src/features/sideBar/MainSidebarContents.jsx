import { RiSearchLine } from "react-icons/ri";
import { useUser } from "../authentication/useUser";
import { useConversations } from "./useConversations";
import SignoutButton from "../authentication/SignoutButton";
import { useEffect, useRef, useState } from "react";
import SearchView from "../userSearch/SearchView";
import Loader from "../../components/Loader";
import { useUi } from "../../contexts/UiContext";
import DropdownMenu from "../../components/DropdownMenu";
import Profile from "../../components/Profile";
import IconButton from "../../components/IconButton";
import UserItem from "../../components/UserItem";

function MainSidebarContents() {
  const { conversations, isPending } = useConversations();
  const {
    openAccountView,
    isSearchView,
    openSearchView,
    closeSearchView,
    isMenuOpen,
    toggleMenu,
    closeSidebar,
    searchQuery,
    updateSearchQuery,
  } = useUi();

  const { user } = useUser();
  const userData = user?.user_metadata;

  const searchInputRef = useRef(null);

  useEffect(() => {
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
            <IconButton onClick={handleMenuBtnClick}>
              {isSearchView && <IconButton.Back />}
              {isMenuOpen && <IconButton.Close />}
              {!isSearchView && !isMenuOpen && <IconButton.Menu />}
            </IconButton>

            {isMenuOpen && <DropdownMenu />}
          </div>

          <Profile userData={userData} onClick={openAccountView} />

          <SignoutButton />
        </div>

        <div className="relative">
          <label htmlFor="searchPeople" className="sr-only">
            Search people
          </label>
          <input
            id="searchPeople"
            className="flex w-full grow items-center justify-between self-stretch overflow-hidden rounded-full border border-borderShade bg-lightSlate p-2 pl-9 outline-none transition-all duration-200 ease-in-out focus:ring-2 focus:ring-darkViolet dark:border-borderShade-dark dark:bg-lightSlate-dark dark:focus:ring-textViolet-dark"
            value={searchQuery}
            onChange={(e) => updateSearchQuery(e.target.value)}
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
        {isSearchView && <SearchView />}

        {!isSearchView && (
          <div className="grid h-full grid-rows-[auto_1fr]">
            <h2 className="border-borderShadep border-b p-2 text-lg dark:border-borderShade-dark">
              Chats
            </h2>

            <div tabIndex={-1} className="h-full overflow-auto p-2">
              {isPending && (
                <span className="mt-8 flex flex-col items-center justify-center">
                  <Loader size="medium" text="Loading chats" />
                </span>
              )}

              {!isPending &&
                conversations?.map(
                  ({
                    friendInfo: { id, avatar_url, fullname },
                    last_message: { content: subtext },
                  }) => (
                    <UserItem
                      key={id}
                      id={id}
                      avatar={avatar_url}
                      name={fullname}
                      subtext={subtext}
                      handler={closeSidebar}
                    />
                  ),
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainSidebarContents;
