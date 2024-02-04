import { useMessages } from "../features/hooks/useMessages";
import { scrollToBottom } from "../utils/common";
import Message from "./Message";
import { useRef } from "react";
import { sortMessageByTime } from "../utils/common";
import Loader from "./Loader";
// import { useAppData } from "../contexts/AppDataContext";

function Messages() {
  const { data, isPending, fetchNextPage } = useMessages();
  const messages = data?.messages?.sort(sortMessageByTime);

  const bottomRef = useRef();
  bottomRef.current && scrollToBottom(bottomRef);

  if (isPending)
    return (
      <span className="flex-center mb-4 justify-center">
        <Loader size="medium" text="Loading messages" />
      </span>
    );

  return (
    <>
      {!messages && <p className="flex-center mb-4 opacity-70">No messages!</p>}

      {messages && (
        <>
          <button onClick={() => fetchNextPage}>Load more</button>

          {messages.map((message) => (
            <Message message={message} key={message.id} />
          ))}
        </>
      )}

      <span ref={bottomRef}></span>
    </>
  );
}

export default Messages;
