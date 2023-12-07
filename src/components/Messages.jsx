import styled from "styled-components";

function Messages() {
  return (
    <StyledMessages>
      <Message>
        <p>
          Lorem ipsum dolor sit
          <span>09:01 PM</span>
        </p>
      </Message>

      <Message className="own-message">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet rerum
          nostrum officia mollitia. Veritatis quodffffffffffg
          <span>09:01 PM</span>
        </p>
      </Message>
    </StyledMessages>
  );
}

export default Messages;

const StyledMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 1rem;
`;

const Message = styled.div`
  /* padding: 0.5rem; */
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 0.5rem 1rem;

  width: fit-content;
  max-width: 80%;

  > p {
    /* word-break: break-word;
    white-space: pre-wrap; */
    /* background-color: rgba(0, 0, 0, 0.1); */
    direction: ltr;
  }

  span {
    float: right;
    font-size: 0.8rem;
    font-style: italic;
    line-height: 2;
    margin-left: 0.5rem;
    color: rgba(0, 0, 0, 0.7);
    user-select: none;
  }

  &.own-message {
    align-self: flex-end;
    background-color: bisque;
  }
`;
