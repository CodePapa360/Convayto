import { useSearchedUsers } from "./useSearchedUsers";
import Loader from "../../components/Loader";
import UserItem from "../../components/UserItem";
import { useUi } from "../../contexts/UiContext";

function SearchView() {
  const { users, isShortQuery, isLoading, error } = useSearchedUsers();
  const { closeSearchView } = useUi();

  if (isShortQuery) {
    return (
      <RenderMessage>
        <p>Search for people</p>
      </RenderMessage>
    );
  }

  if (isLoading) {
    return (
      <RenderMessage>
        <Loader text="Loading" size="medium" />
      </RenderMessage>
    );
  }

  if (error) {
    return (
      <RenderMessage>
        <p>Something went wrong</p>
      </RenderMessage>
    );
  }

  if (!users.length) {
    return (
      <RenderMessage>
        <p>No users found</p>
      </RenderMessage>
    );
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

function RenderMessage({ children }) {
  return (
    <span className="fadeIn mt-4 flex items-center justify-center">
      {children}
    </span>
  );
}

export default SearchView;
