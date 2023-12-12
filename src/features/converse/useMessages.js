//////////////////
//Static
///////////////////////

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "../../services/apiAuth";
import { useUser } from "../authentication/useUser";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { subscribeRealtime } from "../../services/apiRealtime";

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

  const previousConversationIdRef = useRef(null);
  const conversationId = data?.conversationId;

  useEffect(() => {
    // Unsubscribe from the previous room when conversationId changes
    if (
      previousConversationIdRef.current &&
      previousConversationIdRef.current !== conversationId
    ) {
      previousConversationIdRef.current = null;
      console.log("Unsubscribed from the previous room");
    }

    // Subscribe to the new room if conversationId is available
    if (conversationId) {
      const subscription = subscribeRealtime({ conversationId });
      previousConversationIdRef.current = conversationId;

      return () => {
        subscription.unsubscribe();
        console.log("Unsubscribed from the current room");
      };
    }
  }, [conversationId]);

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
