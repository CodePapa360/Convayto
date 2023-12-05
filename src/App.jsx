import { getCurrentUser, logout, sendMessage } from "./services/apiAuth";
import Login from "./Login";
import { useEffect, useState } from "react";
import Signup from "./Signup";
import CreateConversation from "./CreateConversation";

function App() {
  const [userEmail, setUserEmail] = useState("");
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [convId, setConvId] = useState(null);

  const [allMessages, setAllMessages] = useState([]);

  async function handleGetcurrentuser() {
    const data = await getCurrentUser();
    console.log(data);
  }

  function handleLogout() {
    logout();
    setStatus(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!message) return;
    sendMessage(convId, message);

    setMessage("");
  }

  useEffect(function () {
    async function check() {
      const currentUser = await getCurrentUser();
      if (currentUser.session === null) {
        setStatus(false);
      } else {
        setStatus(true);
        setUserEmail(currentUser.session.user.email);
      }
    }

    check();
  }, []);

  return (
    <main>
      <div className={`login-status ${status ? "logged-in" : ""}`}></div>{" "}
      <span>{userEmail}</span>
      <Signup />
      <Login onSetStatus={setStatus} />
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleGetcurrentuser}>Get Current user</button>
      <br />
      <CreateConversation onSetConvId={setConvId} />
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message</label>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          name="message"
          id="message"
        />
        <button type="submit">Send</button>
      </form>
      <br />
      <div>
        {allMessages.map((msg) => (
          <p key={msg.id}>{msg.message}</p>
        ))}
      </div>
    </main>
  );
}

export default App;
