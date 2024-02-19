import { useMessages } from "../features/hooks/useMessages";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import useIntersectionObserver from "../features/hooks/useIntersectionObserver";

function Messages() {
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
  const lastPageBtm = useRef(null);
  const [topElement, setTopElement] = useState(null);

  const isIntersectingTop = useIntersectionObserver(topElement);
  const isIntersectingBtm = useIntersectionObserver(bottomRef.current);

  // Top ref depends on hasNextPage so we need to update it when it changes
  useEffect(() => {
    if (topRef.current) {
      setTopElement(topRef.current);
    }
  }, [hasNextPage]);

  // Fetch next page when the bottom ref is in view
  useEffect(() => {
    if (isIntersectingTop && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersectingTop, hasNextPage, fetchNextPage]);

  ////////////
  ///////////

  useEffect(() => {
    // 1. if there is no pages, return
    if (!pages || pages[0] === undefined) return;

    // 2. if the bottom ref is in view, scroll to the bottom
    if (isIntersectingBtm)
      return bottomRef?.current?.scrollIntoView({ behavior: "smooth" });

    //3. if the conversation id is missing that it is a optimistic message which is sent by me and need to be scrolled to the bottom
    // 3.1 if there is no pages, return
    if (!pages[0]) return console.log("no pages");
    // get the last page
    const lastPage = pages[pages.length - 1];
    // get the last message of the last page
    const lastMessage = lastPage[lastPage.length - 1];

    if (lastMessage?.conversation_id === undefined)
      return bottomRef?.current?.scrollIntoView({ behavior: "smooth" });

    // 4. if there is only one page, then it means it's the first render so we need to scroll to the bottom otherwise it will start fetching the next page automatically
    if (pages.length === 1)
      return bottomRef?.current?.scrollIntoView({ behavior: "smooth" });

    // 5. if the top ref is in view, scroll to the last page's bottom ref to keep the view where it was
    if (!pages.length) return;
    if (!lastPageBtm.current) return;
    if (isIntersectingTop) return lastPageBtm.current.scrollIntoView();
  }, [pages]);

  // console.log("pages", pages);
  ////////////
  // show a loader when fetching the first page
  if (isPending)
    return (
      <span className="flex-center mb-4 justify-center">
        <Loader size="medium" text="Loading messages" />
      </span>
    );

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-4">
      {!pages && (
        <span className="flex-center my-4 select-none opacity-60">
          No messages yet
        </span>
      )}

      {pages && pages[0] && (
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
                className="mx-auto my-4 h-2 w-2 select-none  rounded bg-lightSlate opacity-60 dark:bg-lightSlate-dark"
              ></span>
            ),
          )}
        </>
      )}

      <span ref={bottomRef}></span>
    </div>
  );
}

export default Messages;
