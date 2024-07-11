import { useSearchedUsers } from "./useSearchedUsers";
import Loader from "../../components/Loader";
import UserItem from "../../components/UserItem";
import { useUi } from "../../contexts/UiContext";
import ShortTextMessage from "../../components/ShortTextMessage";

function SearchView() {
  const { users, isShortQuery, isLoading, error } = useSearchedUsers();
  const { closeSearchView } = useUi();

  if (isShortQuery) {
    return <ShortTextMessage>Search for people</ShortTextMessage>;
  }

  if (isLoading) {
    return (
      <ShortTextMessage opacity={100}>
        <Loader text="Searching" size="medium" />
      </ShortTextMessage>
    );
  }

  if (error) {
    return <ShortTextMessage>⚠️ Something went wrong!</ShortTextMessage>;
  }

  if (!users.length) {
    return <ShortTextMessage>No users found!</ShortTextMessage>;
  }

  return (
    <div className="fadeIn p-2">
      {users.map(({ id, avatar_url, fullname, username }) => (
        <UserItem
          key={id}
          id={id}
          avatar={avatar_url}
          name={fullname}
          subtext={username}
          handler={() => closeSearchView({ back: false })}
          shouldReplace={true}
        />
      ))}
    </div>
  );
}

export default SearchView;
