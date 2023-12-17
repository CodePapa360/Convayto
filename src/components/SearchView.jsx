import { useUser } from "../features/authentication/useUser";
import SearchedUser from "./SearchedUser";

function SearchView({ users, onUserClick }) {
  const { user: myUserDetails } = useUser();
  const filteredUsers = users.filter((user) => user.id !== myUserDetails.id);

  return (
    <div>
      {filteredUsers.length === 0 && <p>No users found</p>}

      {filteredUsers.map((user) => (
        <SearchedUser onUserClick={onUserClick} key={user.id} user={user} />
      ))}
    </div>
  );
}

export default SearchView;
