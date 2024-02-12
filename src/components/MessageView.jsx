import Messages from "./Messages";
import MessageTopBar from "./MessageTopBar";
import MessageInputBar from "./MessageInputBar";

function MessageView() {
  return (
    <div className="relative col-span-2 grid h-dvh w-full grid-cols-1 grid-rows-[auto_1fr_auto] overflow-hidden md:col-span-1">
      <MessageTopBar />

      <div className="grid grid-cols-1 items-end overflow-y-auto">
        {/* <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 px-4 pt-2"> */}
        <Messages />
        {/* </div> */}
      </div>

      <MessageInputBar />
    </div>
  );
}

export default MessageView;
