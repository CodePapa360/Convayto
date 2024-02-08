import { useMessages } from "../features/hooks/useMessages";
import { scrollToBottom } from "../utils/common";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import { sortMessageByTime } from "../utils/common";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
// import { useAppData } from "../contexts/AppDataContext";

function Messages() {
  const {
    pages,
    isFetching,
    isFetchingNextPage,
    isPending,
    fetchNextPage,
    hasNextPage,
  } = useMessages();
  console.log(isFetchingNextPage);

  // console.log(pages);
  const bottomRef = useRef();
  // bottomRef.current && scrollToBottom(bottomRef);

  function test() {
    fetchNextPage();
  }

  if (isPending)
    return (
      <span className="flex-center mb-4 justify-center">
        <Loader size="medium" text="Loading messages" />
      </span>
    );

  return (
    <>
      {/* <button onClick={test}>Load more</button> */}
      {/* {!messages && <p className="flex-center mb-4 opacity-70">No messages!</p>} */}

      {pages && (
        <>
          {hasNextPage && (
            <button
              className="flex items-center justify-center gap-2"
              onClick={test}
            >
              <span>Load more</span>
              {isFetching && <span>{<Loader />}</span>}
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
