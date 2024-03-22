import {
  RiSearchLine,
  RiMenuLine,
  RiCloseFill,
  RiArrowLeftLine,
} from "react-icons/ri";
import { useUser } from "../features/authentication/useUser";
import { useConversatoins } from "../features/hooks/useConversations";
import Signout from "../features/authentication/Signout";
import Conversation from "./Conversation";
import { useEffect, useRef, useState } from "react";
import SearchView from "./SearchView";
import Loader from "./Loader";
import { useUi } from "../contexts/UiContext";
import Dropdown from "./Dropdown";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { useAppData } from "../contexts/AppDataContext";
import { getUserById } from "../services/apiAuth";

function MainSidebarContents() {
  const { currentConversation, setCurrentConversation } = useAppData();
  const { conversations, isPending } = useConversatoins();
  const { openAccountView, isSearchView, openSearchView, closeSearchView } =
    useUi();
  const { user } = useUser();
  const { fullname, username, avatar_url } = user.user_metadata;
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userId: friendUserId } = useParams();
  const navigate = useNavigate();

  const searchInputRef = useRef(null);

  useEffect(() => {
    const currentConvId = currentConversation?.id;
    const currentUserId = currentConversation?.friend?.id;

    if (!currentConvId && !currentUserId) {
      // This will generally happen at first load
      const newCurrentConv = conversations?.find(
        (conv) => conv.friend.id === friendUserId,
      );

      newCurrentConv ? setCurrentConversation(newCurrentConv) : checkFriend();
    } else if (currentUserId !== friendUserId) {
      // this will mostly happen while navigating

      const newCurrentConv = conversations?.find(
        (conv) => conv.friend.id === friendUserId,
      );

      newCurrentConv ? setCurrentConversation(newCurrentConv) : checkFriend();
    } else if (!currentConvId && friendUserId) {
      const newCurrentConv = conversations?.find(
        (conv) => conv.friend.id === friendUserId,
      );
      newCurrentConv && setCurrentConversation(newCurrentConv);
      // console.log("3");
    }

    async function checkFriend() {
      try {
        if (!friendUserId) return;
        // console.log("checking friend");
        const newFriend = await getUserById(friendUserId);

        if (!newFriend) return navigate("/");

        newFriend && setCurrentConversation({ friend: newFriend });
      } catch (error) {
        console.log(error, "error from checkFriend");
      }
    }
  }, [
    friendUserId,
    conversations,
    navigate,
    currentConversation,
    setCurrentConversation,
  ]);

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
      setIsMenuOpen((prev) => !prev);
    }
  }

  return (
    <div className="relative z-30 grid h-dvh select-none grid-cols-1 grid-rows-[auto_1fr] overflow-hidden">
      <div className="border-b border-borderShade p-2 dark:border-borderShade-dark">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="relative">
            <button
              className="relative z-50 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-lg hover:bg-black/10 dark:hover:bg-lightSlate/10"
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
                  onMouseDown={handleMenuBtnClick}
                  onTouchStart={handleMenuBtnClick}
                  className={`${
                    isMenuOpen
                      ? "pointer-events-auto visible"
                      : "pointer-events-none invisible"
                  }  fixed left-0 top-0 z-40  h-dvh w-dvw opacity-0 transition-all duration-200 ease-in-out`}
                ></div>

                {/* DropdownMenu */}

                <Dropdown />
              </>
            )}
          </div>

          {/* Profile */}
          <div
            className="mr-auto grid cursor-pointer grid-cols-[2.5rem_1fr] items-center gap-4 truncate rounded-lg p-2 hover:bg-black/10 dark:hover:bg-lightSlate/10"
            onClick={() => openAccountView()}
          >
            <span className="h-11 w-11 overflow-hidden rounded-full text-black  dark:text-white">
              {avatar_url ? (
                <img
                  draggable="false"
                  src={avatar_url}
                  alt="avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <HiOutlineUserCircle
                  size={55}
                  viewBox="2 2 24 24"
                  opacity={0.5}
                  strokeWidth="1"
                />
              )}
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
            className="flex w-full grow items-center justify-between self-stretch overflow-hidden rounded-full border border-borderShade bg-lightSlate p-2 pl-9 outline-none transition-all duration-200 ease-in-out focus:ring-2 focus:ring-darkViolet dark:border-borderShade-dark dark:bg-lightSlate-dark dark:focus:ring-textViolet-dark"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            onClick={() => openSearchView()}
            placeholder="Search people"
            ref={searchInputRef}
          />

          <span className="pointer-events-none absolute left-3 top-3 text-xl opacity-40">
            <RiSearchLine />
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
