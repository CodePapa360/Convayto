import { useUser } from "../authentication/useUser";
import SearchedUser from "./SearchedUser";
import { useSearchedUsers } from "./useSearchedUsers";
import Loader from "../../components/Loader";
import { MINIMUM_SEARCH_LENGTH } from "../../config";

function SearchView({ query }) {
  const { users, isLoading, error } = useSearchedUsers(query);
  const { user: myUserDetails } = useUser();
  const filteredUsers = users?.filter((user) => user.id !== myUserDetails.id);

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
      {filteredUsers?.map((user) => (
        <SearchedUser key={user.id} user={user} />
      ))}
    </div>
  );
}

export default SearchView;
