import { useUser } from "../features/authentication/useUser";
import SearchedUser from "./SearchedUser";

function SearchView({ users, onUserClick }) {
  const { user: myUserDetails } = useUser();
  const filteredUsers = users.filter((user) => user.id !== myUserDetails.id);

  if (!users) return <p>Search for people</p>;
  if (filteredUsers.length === 0) return <p>No users found</p>;

  return (
    <div>
      {filteredUsers.map((user) => (
        <SearchedUser onUserClick={onUserClick} key={user.id} user={user} />
      ))}
    </div>
  );
}

export default SearchView;
