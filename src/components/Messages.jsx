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
  // get the position of the last page bottom ref
  const position = lastPageBtm.current?.getBoundingClientRect().y;

  function handleScroll() {
    console.log("scrolling");
    parentEl.current.scrollTo({
      top: 100,
      behavior: "smooth",
    });
  }

  if (isPending)
    return (
      <span className="flex-center mb-4 justify-center">
        <Loader size="medium" text="Loading messages" />
      </span>
    );

  return (
    <div
      ref={parentEl}
      className="mx-auto flex w-full max-w-3xl flex-col gap-2 px-4 pt-2"
    >
      {pages && (
        <>
          {hasNextPage && (
            <span ref={topRef}>
              {isFetchingNextPage && <span>{<Loader />}</span>}
            </span>
          )}

          {pages.map((page, i) => (
            <span key={i}>
              {page.map((message) => (
                <Message key={message.id} message={message} />
              ))}

              {i === 0 && (
                <span onClick={handleScroll} ref={lastPageBtm}>
                  last page end here
                </span>
              )}
            </span>
          ))}
        </>
      )}

      <span ref={bottomRef}></span>
    </div>
  );
}

export default Messages;
