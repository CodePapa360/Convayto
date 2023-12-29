// import styled from "styled-components";
import Messages from "../components/Messages";
import MessageTopBar from "../components/MessageTopBar";
import MessageInputBar from "../components/MessageInputBar";

function MessageView() {
  return (
    <div className="col-span-2 grid h-dvh w-full grid-cols-1 grid-rows-[auto_1fr_auto] md:col-span-1">
      <MessageTopBar />

      <div className="mx-auto grid w-full max-w-3xl items-end overflow-y-auto pt-4">
        <Messages />
      </div>

      <MessageInputBar />
    </div>
  );
}

export default MessageView;
