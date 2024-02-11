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
  const element = topRef.current;
  const bottomRef = useRef();

  const isIntersecting = useIntersectionObserver(element);
  isIntersecting && console.log("isIntersecting", isIntersecting);

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, fetchNextPage, hasNextPage]);

  if (isPending)
    return (
      <span className="flex-center mb-4 justify-center">
        <Loader size="medium" text="Loading messages" />
      </span>
    );

  return (
    <>
      {pages && (
        <>
          {hasNextPage && (
            <button
              ref={topRef}
              className="flex items-center justify-center gap-2"
              // onClick={test}
            >
              <span>Load</span>
              {isFetchingNextPage && <span>{<Loader />}</span>}
            </button>
          )}

          {pages.map((group) => {
            return group.map((msg) => <Message key={msg.id} message={msg} />);
          })}
        </>
      )}

      <span ref={bottomRef}></span>
    </>
  );
}

export default Messages;
