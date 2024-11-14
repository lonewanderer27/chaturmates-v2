import client from "../../client";
import { useQuery } from "@tanstack/react-query";
import useSession from "../auth/useSession";
export default function useProfileLite() {
  const { session } = useSession();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await client
        .from("profiles")
        .select("*")
        .eq("id", session!.user.id)
        .single();
      const response = res.data;

      console.log("profile response:", response);
      return response;
    },
    enabled: session !== undefined && session !== null,
  });

  return {
    profile,
    isLoading,
  };
}
