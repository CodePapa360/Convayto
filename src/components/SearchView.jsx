import { useUser } from "../features/authentication/useUser";
import SearchedUser from "./SearchedUser";
import { useSearchedUsers } from "../features/converse/useSearchedUsers";

function SearchView({ query, onUserClick }) {
  const { users, isLoading, error } = useSearchedUsers(query);

  const { user: myUserDetails } = useUser();
  const filteredUsers = users?.filter((user) => user.id !== myUserDetails.id);

  if (query.length < 3) return <p>Search for people</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  if (filteredUsers.length === 0) return <p>No users found</p>;

  return (
    <div>
      {filteredUsers?.map((user) => (
        <SearchedUser onUserClick={onUserClick} key={user.id} user={user} />
      ))}
    </div>
  );
}

export default SearchView;
