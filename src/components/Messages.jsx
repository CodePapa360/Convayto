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
  const parentEl = useRef(null);
  const lastPageBtm = useRef(null);

  function handleScroll() {
    lastPageBtm.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if (pages?.length > 0 && lastPageBtm.current) {
      // Scroll to the bottom of the last page with a little bit more pixels top

      lastPageBtm.current.scrollIntoView();
    }
  }, [pages]);

  if (isPending)
    return (
      <span className="flex-center mb-4 justify-center">
        <Loader size="medium" text="Loading messages" />
      </span>
    );

  return (
    <div ref={parentEl} className="mx-auto flex w-full max-w-3xl flex-col px-4">
      {pages && (
        <>
          {hasNextPage && (
            <span ref={topRef}>
              {isFetchingNextPage && <span>{<Loader />}</span>}
            </span>
          )}

          {pages.map((page, i) => (
            <>
              <span key={i} className="flex w-full flex-col gap-2 pb-2">
                {page.map((message) => (
                  <Message key={message.id} message={message} />
                ))}
              </span>

              {/* This ref is to track where to keep the view when new page loads on the top */}
              {i === 0 && <span ref={lastPageBtm}></span>}

              {page.length === 0 && (
                <span className="my-4 select-none text-center opacity-30">
                  No more messages
                </span>
              )}
            </>
          ))}
        </>
      )}

      <span ref={bottomRef}></span>
    </div>
  );
}

export default Messages;
