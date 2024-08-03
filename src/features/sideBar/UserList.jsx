import ShortTextMessage from "../../components/ShortTextMessage";
import { useConversations } from "./useConversations";
import { useUi } from "../../contexts/UiContext";
import Loader from "../../components/Loader";
import UserItem from "../../components/UserItem";

function UserList() {
  const { conversations, isPending, error } = useConversations();
  const { closeSidebar } = useUi();

  if (isPending)
    return (
      <ShortTextMessage opacity={100}>
        <Loader size="medium" text="Loading chats" />
      </ShortTextMessage>
    );

  if (error) return <ShortTextMessage>⚠️ {error.message}</ShortTextMessage>;

  if (!conversations?.length)
    return (
      <ShortTextMessage>
        No chats yet. Start a new conversation!
      </ShortTextMessage>
    );

  if (conversations)
    return conversations.map((conv) => {
      const id = conv?.friendInfo?.id;

      if (!id) return null;

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
    });
}

export default UserList;
