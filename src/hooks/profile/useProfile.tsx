import client from "../../client";
import { useQuery } from "@tanstack/react-query";
import useSession from "../auth/useSession";

export default function useProfile() {
  const { session } = useSession();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = (
        await client
          .from("profiles")
          .select("*, students(*), professors(*), professor:professors(*), student:students(*)")
          .eq("id", session!.user.id)
          .single()
      ).data;
      console.log("profile response:", response);
      return response;
    },
    enabled: session !== undefined && session !== null,
  });

  return {
    profile,
  };
}
