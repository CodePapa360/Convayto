// import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import { formatTime } from "../utils/common";

function Message({ message }) {
  const { user } = useUser();

  return (
    <div
      className={`${
        message?.sender_id === user.id
          ? "self-end rounded-br-none bg-violet-900"
          : "rounded-bl-none bg-gray-700"
      } w-fit max-w-[80%] rounded-2xl px-4 py-2`}
    >
      <p>
        {message?.content}
        <span className="float-right ml-2 mt-2 select-none text-xs italic opacity-70">
          {formatTime(message?.created_at)}
        </span>
      </p>
    </div>
  );
}

export default Message;

// const StyledMessage = styled.div`
//   /* padding: 0.5rem; */
//   background-color: rgba(0, 0, 0, 0.1);
//   border-radius: 10px;
//   padding: 0.5rem 1rem;

//   width: fit-content;
//   max-width: 80%;

//   span {
//     float: right;
//     font-size: 0.8rem;
//     font-style: italic;
//     line-height: 2;
//     margin-left: 0.5rem;
//     color: rgba(0, 0, 0, 0.7);
//     user-select: none;
//   }

//   &.own-message {
//     align-self: flex-end;
//     background-color: bisque;
//   }
// `;
