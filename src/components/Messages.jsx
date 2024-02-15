import { useMessages } from "../features/hooks/useMessages";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import useIntersectionObserver from "../features/hooks/useIntersectionObserver";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAppData } from "../contexts/AppDataContext";

function Messages() {
  // const { userId: friendUserId } = useParams();
  const { currentConversation } = useAppData();
  const friendUserId = currentConversation?.friend.id;
  const queryClient = useQueryClient();

  const {
    pages,
    isFetching,
    isFetchingNextPage,
    isPending,
    fetchNextPage,
    hasNextPage,
  } = useMessages();

  const topRef = useRef(null);
  const bottomRef = useRef();
  const [topElement, setTopElement] = useState(null);

  const isIntersecting = useIntersectionObserver(topElement);

  // Top ref depends on hasNextPage so we need to update it when it changes
  useEffect(() => {
    if (topRef.current) {
      setTopElement(topRef.current);
    }
  }, [hasNextPage]);

  // Fetch next page when the bottom ref is in view
  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  ////////////
  ///////////
  const lastPageBtm = useRef(null);

  useEffect(() => {
    if (pages?.length > 0 && lastPageBtm.current) {
      lastPageBtm.current.scrollIntoView();
    }
  }, [pages]);

  if (isPending)
    return (
      <span className="flex-center mb-4 justify-center">
        <Loader size="medium" text="Loading messages" />
      </span>
    );

  // console.log(pages, "pages");

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-4">
      {pages[0] && (
        <>
          {hasNextPage && (
            <span ref={topRef}>{isFetchingNextPage && <Loader />}</span>
          )}

          {pages.map((page, index) =>
            page.length ? (
              <span key={index} className="flex w-full flex-col">
                {page.map((message) => (
                  <Message key={message.id} message={message} />
                ))}

                {index === 0 && <span ref={lastPageBtm}></span>}
              </span>
            ) : (
              <span
                key={index}
                className="my-4 select-none text-center opacity-30"
              >
                No more messages
              </span>
            ),
          )}
        </>
      )}

      <span ref={bottomRef}></span>
    </div>
  );
}

export default Messages;
