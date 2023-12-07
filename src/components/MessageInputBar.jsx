import styled from "styled-components";
import { getCurrentUser } from "../services/apiAuth";

function MessageInputBar() {
  async function getUser() {
    const data = await getCurrentUser();
    console.log(data);
  }

  return (
    <StyledInputBar>
      <form action="">
        <input type="text" placeholder="Message" />

        <button type="submit">Send</button>
      </form>

      <button onClick={getUser}>User</button>
    </StyledInputBar>
  );
}

export default MessageInputBar;

const StyledInputBar = styled.div`
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);

  height: 4rem;
  margin-top: auto;
`;
