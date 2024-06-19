import { useUser } from "../authentication/useUser";
import { useSearchedUsers } from "./useSearchedUsers";
import Loader from "../../components/Loader";
import { MINIMUM_SEARCH_LENGTH } from "../../config";
import UserItem from "../../components/UserItem";
import { useUi } from "../../contexts/UiContext";

function SearchView({ query }) {
  const { users, isLoading, error } = useSearchedUsers(query);
  const { user: myUserDetails } = useUser();
  const filteredUsers = users?.filter((user) => user.id !== myUserDetails.id);
  const { closeSearchView } = useUi();

  if (query.length < MINIMUM_SEARCH_LENGTH)
    return (
      <span className="flex-center fadeIn mt-4">
        <p>Search for people</p>
      </span>
    );

  if (isLoading)
    return (
      <span className="flex-center fadeIn mt-4">
        <Loader text="Loading" size="medium" />
      </span>
    );

  if (error)
    return (
      <span className="flex-center fadeIn mt-4">
        <p>Som ething went wrong</p>
      </span>
    );

  if (filteredUsers.length === 0)
    return (
      <span className="flex-center fadeIn mt-4">
        <p>No users found</p>
      </span>
    );

  return (
    <div className="fadeIn p-2">
      {filteredUsers?.map((user) => {
        const { id, avatar_url, fullname, username: subtext } = user;

        return (
          <UserItem
            key={user.id}
            id={id}
            avatar={avatar_url}
            name={fullname}
            subtext={subtext}
            handler={closeSearchView}
          />
        );
      })}
    </div>
  );
}

export default SearchView;
