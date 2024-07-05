import UserList from "./UserList";

function UsersView() {
  return (
    <div className="grid h-full grid-rows-[auto_1fr]">
      <h2 className="border-borderShadep border-b p-2 text-lg dark:border-borderShade-dark">
        Chats
      </h2>

      <div tabIndex={-1} className="h-full overflow-auto p-2">
        <UserList />
      </div>
    </div>
  );
}

export default UsersView;
