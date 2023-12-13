//////////////////
//Static
///////////////////////

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "../../services/apiAuth";
import { useUser } from "../authentication/useUser";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { subscribeRealtime } from "../../services/apiRealtime";

let subscription;

export function useMessages() {
  const { userId: friendUserId } = useParams();
  const { user } = useUser();
  const queryClient = useQueryClient(); // Get the query client

  const { data, isPending, error } = useQuery({
    queryKey: ["friend", friendUserId],
    queryFn: () => getMessages({ myUserId: user.id, friendUserId }),
    // Use previousData to update the messages array
    select: (data) => ({ ...data, messages: [...(data?.messages || [])] }),
  });

  const conversationId = data?.conversationId;

  useEffect(
    function () {
      // if()
      if (subscription && subscription?.topic === conversationId) return;

      if (subscription) {
        // console.log(subscription);
        subscription.unsubscribe();
      }

      subscription = subscribeRealtime({
        conversationId,
        callback: (newData) => {
          // Update the React Query cache with the new message
          queryClient.setQueryData(["friend", friendUserId], (prevData) => {
            return {
              ...prevData,
              messages: [...(prevData.messages || []), newData.new],
            };
          });
        },
      });

      return () => {
        subscription.unsubscribe();
        console.log("unsubscribed");
      };
    },
    [conversationId]
  );

  if (error) {
    console.error(
      "Error fetching conversations (from custom hook):",
      error.message
    );
  }

  // Return the query data and a function to set data
  return {
    data,
    isPending,
    setData: (newData) =>
      queryClient.setQueryData(["friend", friendUserId], newData),
  };
}
/////////////////

// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getMessages } from "../../services/apiAuth";
// import { useUser } from "../authentication/useUser";
// import { useParams } from "react-router-dom";
// import { useRealtimeMessages } from "../../services/apiAuth";

// export function useMessages() {
//   const { userId: friendUserId } = useParams();
//   const { user } = useUser();
//   const queryClient = useQueryClient();

//   // Subscribe to real-time messages
//   useRealtimeMessages(friendUserId);

//   const { data, isPending, error } = useQuery({
//     queryKey: ["friend", friendUserId],
//     queryFn: () => getMessages({ myUserId: user.id, friendUserId }),
//     // Use previousData to update the messages array
//     select: (data) => ({ ...data, messages: [...(data?.messages || [])] }),
//   });

//   if (error) {
//     console.error(
//       "Error fetching conversations (from custom hook):",
//       error.message
//     );
//   }

//   // Return the query data and a function to set data
//   return {
//     data,
//     isPending,
//     setData: (newData) =>
//       queryClient.setQueryData(["friend", friendUserId], newData),
//   };
// }

//////////////////////////
///////////////////////

// function callback(payload) {
//   console.log("Change received!", payload);
// }

// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getMessages } from "../../services/apiAuth";
// import { useUser } from "../authentication/useUser";
// import { useParams } from "react-router-dom";
// import { subscribeToMessages } from "../../services/apiAuth";
// import { useEffect } from "react";

// export function useMessages() {
//   const { userId: friendUserId } = useParams();
//   const { user } = useUser();
//   const queryClient = useQueryClient();

//   const { data, isPending, error } = useQuery({
//     queryKey: ["friend", friendUserId],
//     queryFn: () => getMessages({ myUserId: user.id, friendUserId }),
//     select: (data) => ({ ...data, messages: [...(data?.messages || [])] }),
//   });

//   if (error) {
//     console.error(
//       "Error fetching conversations (from custom hook):",
//       error.message
//     );
//   }

//   useEffect(() => {
//     const subscription = subscribeToMessages(
//       data?.conversationId,
//       friendUserId,
//       user,
//       (newData) => {
//         queryClient.setQueryData(["friend", friendUserId], newData);
//       }
//     );

//     return () => subscription.unsubscribe();
//   }, [friendUserId, data?.conversationId, user.id]);

//   return {
//     data,
//     isPending,
//   };
// }
