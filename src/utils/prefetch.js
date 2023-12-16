//   prefetching messages of other conversations
//   sortedConversations?.slice(0, 5).forEach((conv) => {
//     const { friend } = conv;
//     const { id: friendUserId } = friend;
//     const myUserId = user?.id;

// import { useQueryClient } from "@tanstack/react-query";
// import { getMessages } from "../services/apiAuth";

//     const test = async () => {
//       // The results of this query will be cached like a normal query
//       await queryClient.prefetchQuery({
//         queryKey: ["friend", friendUserId],
//         queryFn: () => getMessages({ myUserId, friendUserId }),
//       });
//     };

//     test();
//   });

// export const prefetchMessages = ({ friendUserIds, myUserId }) => {
//   const queryClient = useQueryClient();

//   friendUserIds.forEach((conv) => {
//     const { friend } = conv;
//     const { id: friendUserId } = friend;

//     const test = async () => {
//       // The results of this query will be cached like a normal query
//       await queryClient.prefetchQuery({
//         queryKey: ["friend", friendUserId],
//         queryFn: () => getMessages({ myUserId, friendUserId }),
//       });
//     };
//   });
// };
