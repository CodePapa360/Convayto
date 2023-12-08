import styled from "styled-components";
import {
  openConversation,
  getCurrentUser,
  sendMessage,
} from "../services/apiAuth";

function MessageInputBar() {
  async function testFn() {
    const data = await getCurrentUser();
    console.log(data);
  }

  // function testFn() {
  //   openConversation("5a3ec70c-0c72-4198-a820-595734eb861a");
  // }

  // function testFn() {
  //   sendMessage({
  //     conversation_id: "9aec9eae-54f8-48e7-93b4-b10cc1f78f0d",
  //     content: "testing",
  //   });
  // }

  return (
    <StyledInputBar>
      <form action="">
        <input type="text" placeholder="Message" />

        <button type="submit">Send</button>
      </form>

      <button onClick={testFn}>Test button</button>
    </StyledInputBar>
  );
}

export default MessageInputBar;

const StyledInputBar = styled.div`
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);

  height: 4rem;
  margin-top: auto;
`;
