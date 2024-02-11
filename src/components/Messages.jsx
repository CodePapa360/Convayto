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
  isIntersecting && console.log("isIntersecting", isIntersecting);

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
            <span ref={topRef}>
              {isFetchingNextPage && <span>{<Loader />}</span>}
            </span>
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
