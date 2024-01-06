import Messages from "../components/Messages";
import MessageTopBar from "../components/MessageTopBar";
import MessageInputBar from "../components/MessageInputBar";

function MessageView() {
  return (
    <div className="relative col-span-2 grid h-dvh w-full grid-cols-1 grid-rows-[auto_1fr_auto] overflow-hidden md:col-span-1">
      <MessageTopBar />

      <div className="grid grid-cols-1 items-end overflow-y-auto">
        <Messages />
      </div>

      <MessageInputBar />
    </div>
  );
}

export default MessageView;
