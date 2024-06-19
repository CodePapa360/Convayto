import Messages from "./Messages";
import MessageTopBar from "./MessageTopBar";
import MessageInputBar from "./MessageInputBar";

function MessageView() {
  return (
    <div className="relative col-span-2 grid h-screen-safe w-full grid-cols-1 grid-rows-[auto_1fr_auto] overflow-hidden md:col-span-1">
      <MessageTopBar />

      <div tabIndex={-1} className="grid grid-cols-1 items-end overflow-y-auto">
        <Messages />
      </div>

      <MessageInputBar />
    </div>
  );
}

export default MessageView;
