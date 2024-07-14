import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { subscribeRealtimeMessage } from "./apiRealtimeMessage";

function useMessageSubscription({ conversation_id, friendUserId }) {
  const queryClient = useQueryClient();
  const subscriptionRef = useRef(null);

  useEffect(
    function () {
      if (!conversation_id) return;

      if (subscriptionRef.current) subscriptionRef.current.unsubscribe();

      function callback(newData) {
        queryClient.setQueryData(["friend", friendUserId], (prevData) => {
          const existingOptimisticMessage = prevData?.pages[0]?.find(
            (message) => message?.id === newData.id,
          );

          if (existingOptimisticMessage) {
            // replace existing optimistic message with server new message
            return {
              ...prevData,
              // replace the new message to the first page's data which id matches the optimistic message
              pages: prevData.pages
                .slice()
                .map((page, index) =>
                  index === 0
                    ? page.map((message) =>
                        message.id === newData.id ? newData : message,
                      )
                    : page,
                ),
            };
          } else {
            return {
              ...prevData,
              // add the new message to the first page's data
              pages: prevData.pages.slice().map((page, index) => {
                return index === 0 ? [...page, newData] : page;
              }),
            };
          }
        });
      }

      subscriptionRef.current = subscribeRealtimeMessage({
        conversation_id,
        callback,
      });

      return () => {
        subscriptionRef.current?.unsubscribe();
        subscriptionRef.current = null;
        // console.log("unsubscribed message");
      };
    },
    [conversation_id, friendUserId, queryClient],
  );
}

export default useMessageSubscription;
