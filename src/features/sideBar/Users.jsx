import { useConversations } from "./useConversations";
import { useUi } from "../../contexts/UiContext";
import Loader from "../../components/Loader";
import UserItem from "../../components/UserItem";
import ShortTextMessage from "../../components/ShortTextMessage";

function Users() {
  const { conversations, isPending } = useConversations();
  const { closeSidebar } = useUi();

  return (
    <div className="grid h-full grid-rows-[auto_1fr]">
      <h2 className="border-borderShadep border-b p-2 text-lg dark:border-borderShade-dark">
        Chats
      </h2>

      <div tabIndex={-1} className="h-full overflow-auto p-2">
        {!conversations?.length && !isPending && (
          <ShortTextMessage>No chats yet</ShortTextMessage>
        )}

        {isPending && (
          <ShortTextMessage opacity={100}>
            <Loader size="medium" text="Loading chats" />
          </ShortTextMessage>
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

export default Users;
