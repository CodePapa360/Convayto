import { useUser } from "../features/authentication/useUser";
import SearchedUser from "./SearchedUser";
import { useSearchedUsers } from "../features/converse/useSearchedUsers";
import Loader from "./Loader";

function SearchView({ query, onSetIsSearching }) {
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = () => {
    onSetIsSearching(false);
  };

  const { users, isLoading, error } = useSearchedUsers(query);
  const { user: myUserDetails } = useUser();
  const filteredUsers = users?.filter((user) => user.id !== myUserDetails.id);

  if (query.length < 3)
    return (
      <span className="flex-center mt-4 opacity-70">
        <p>Search for people</p>
      </span>
    );

  if (isLoading)
    return (
      <span className="flex-center mt-4">
        <Loader text="Loading" size="medium" />
      </span>
    );

  if (error)
    return (
      <span className="flex-center mt-4 opacity-70">
        <p>Som ething went wrong</p>
      </span>
    );

  if (filteredUsers.length === 0)
    return (
      <span className="flex-center mt-4 opacity-70">
        <p>No users found</p>
      </span>
    );

  return (
    <div>
      {filteredUsers?.map((user) => (
        <SearchedUser
          onSetIsSearching={onSetIsSearching}
          key={user.id}
          user={user}
        />
      ))}
    </div>
  );
}

export default SearchView;
