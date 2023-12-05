import { useState } from "react";
import { createConversation } from "./services/apiAuth";

function CreateConversation({ onSetConvId }) {
  const [id, setId] = useState("");

  async function handleCreation(e) {
    e.preventDefault();

    if (!id) return;
    const data = await createConversation(id);
    onSetConvId(data.id);
  }

  return (
    <form action="">
      <h2>Create conversation</h2>
      <label htmlFor="id">Id</label>
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        id="id"
        type="email"
      />

      <button onClick={handleCreation} type="submit">
        Create
      </button>
    </form>
  );
}

export default CreateConversation;
