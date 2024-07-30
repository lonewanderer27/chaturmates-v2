import client from "../../client";
import { useQuery } from "@tanstack/react-query";

export default function useGroupMembers(vanity_url?: string, pending?: boolean) {
  const q = useQuery({
    queryKey: ["group_members", vanity_url, pending],
    queryFn: async () => {
      // Fetch the group_id using the vanity_url from the groups table
      const groupRes = await client
        .from("groups")
        .select("id")
        .eq("vanity_id", vanity_url!)
        .single();

      if (!groupRes.data) {
        throw new Error("Group not found");
      }

      const group_id = groupRes.data.id;

      // Fetch the group members using the group_id
      const memberRes = await client
        .from("group_members")
        .select("*, students(*)")
        .eq("group_id", group_id)
        .eq("approved", pending ? false : true);

      return memberRes.data;
    },
    enabled: !!vanity_url,
  });

  return q;
}
