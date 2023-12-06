function AppLayout() {
  return (
    <whole-container>
      <left-side>
        <top-bar>
          <profile></profile>
          <search-bar></search-bar>
        </top-bar>
        <chats-section></chats-section>
      </left-side>

      <right-side>
        <container>
          <top-bar>
            <back-button></back-button>
            <user-inof></user-inof>
          </top-bar>

          <message-view></message-view>

          <message-input></message-input>
        </container>
      </right-side>
    </whole-container>
  );
}

export default AppLayout;
