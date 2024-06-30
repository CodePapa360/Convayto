import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getConvInfoById } from "./apiConvInfo";
import { useUser } from "../authentication/useUser";

function useConvInfo() {
  const { userId: friendUserId } = useParams();
  const { user } = useUser();
  const myUserId = user?.id;

  const {
    data: convInfo,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["convInfo", friendUserId],
    queryFn: () => getConvInfoById({ myUserId, friendUserId }),

    // convInfo is not going to change so we can set staleTime to Infinity
    staleTime: Infinity,
  });

  return { convInfo, isPending, isError, error };
}

export default useConvInfo;
