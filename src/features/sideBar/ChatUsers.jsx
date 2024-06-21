import { useConversations } from "./useConversations";
import { useUi } from "../../contexts/UiContext";
import Loader from "../../components/Loader";
import UserItem from "../../components/UserItem";

function ChatUsers() {
  const { conversations, isPending } = useConversations();
  const { closeSidebar } = useUi();

  return (
    <div className="grid h-full grid-rows-[auto_1fr]">
      <h2 className="border-borderShadep border-b p-2 text-lg dark:border-borderShade-dark">
        Chats
      </h2>

      <div tabIndex={-1} className="h-full overflow-auto p-2">
        {isPending && (
          <span className="mt-8 flex flex-col items-center justify-center">
            <Loader size="medium" text="Loading chats" />
          </span>
        )}

        {!isPending &&
          conversations?.map((conv) => {
            const id = conv?.friendInfo?.id;
            const avatar_url = conv?.friendInfo?.avatar_url;
            const fullname = conv?.friendInfo?.fullname;
            const lastMessage = conv?.last_message?.content;

            return (
              <UserItem
                key={id}
                id={id}
                avatar={avatar_url}
                name={fullname}
                subtext={lastMessage}
                handler={closeSidebar}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ChatUsers;
