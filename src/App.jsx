import {
  getCurrentUser,
  listenMessages,
  logout,
  sendMessage,
} from "./services/apiAuth";
import Signup from "./signup";
import Login from "./Login";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

function App() {
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");

  const [allMessages, setAllMessages] = useState([]);

  // console.log(message);

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

    // setAllMessages((msgs) => [
    //   ...msgs,
    //   {
    //     id: uuid(),
    //     message,
    //   },
    // ]);

    sendMessage(message);

    setMessage("");
  }

  useEffect(function () {
    async function check() {
      const currentUser = await getCurrentUser();
      if (currentUser.session === null) setStatus(false);
      else setStatus(true);
    }

    check();
  }, []);

  return (
    <main>
      <div className={`login-status ${status ? "logged-in" : ""}`}></div>
      {/* <Signup /> */}
      <Login onSetStatus={setStatus} />
      <button onClick={handleLogout}>Logout</button>

      <button onClick={handleGetcurrentuser}>Get Current user</button>
      <br />
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
