import styled from "styled-components";

function MessageInputBar() {
  return (
    <StyledInputBar>
      <form action="">
        <input type="text" placeholder="Message" />

        <button type="submit">Send</button>
      </form>
    </StyledInputBar>
  );
}

export default MessageInputBar;

const StyledInputBar = styled.div`
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);

  height: 4rem;
  margin-top: auto;
`;
