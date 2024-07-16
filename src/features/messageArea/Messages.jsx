import { useMessages } from "./useMessages";
import MessageItem from "./MessageItem";
import { useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader";
import useIntersectionObserver from "./useIntersectionObserver";
import useScrollBehavior from "./useScrollBehavior";
import ShortTextMessage from "../../components/ShortTextMessage";

function Messages() {
  const {
    pages,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    hasNextPage,
    error,
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
      // Set the top element after 1 second to avoid fetching the next page immediately when user loads the page first time.
      const timeoutId = setTimeout(() => {
        setTopElement(topRef.current);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [hasNextPage]);

  // Fetch next page when the bottom ref is in view
  useEffect(() => {
    if (isIntersectingTop && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersectingTop, hasNextPage, fetchNextPage]);

  ////////////
  // Scroll behavior hook
  ////////////
  useScrollBehavior({
    pages,
    bottomRef,
    lastPageBtm,
    isIntersectingTop,
    isIntersectingBtm,
  });

  /////////////
  // show an error message when there is an error
  /////////////

  if (error) return <ShortTextMessage>⚠️ {error.message}</ShortTextMessage>;

  /////////////
  // show a loader when fetching the first page
  /////////////

  if (isLoading)
    return (
      <ShortTextMessage opacity={100}>
        <Loader size="medium" text="Loading messages" />
      </ShortTextMessage>
    );

  return (
    <div className="grid grid-cols-1 items-end overflow-y-auto">
      <div
        tabIndex={-1}
        className="mx-auto flex w-full max-w-3xl flex-col px-4"
      >
        {pages && !pages[0] && (
          <ShortTextMessage>No messages yet</ShortTextMessage>
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
                    <MessageItem key={message.id} message={message} />
                  ))}

                  {index === 0 && <span ref={lastPageBtm}></span>}
                </span>
              ) : (
                <span
                  key={index}
                  className="mx-auto my-4 h-2 w-2 select-none rounded bg-LightShade/50 opacity-50"
                ></span>
              ),
            )}
          </>
        )}

        <span ref={bottomRef}></span>
      </div>
    </div>
  );
}

export default Messages;
