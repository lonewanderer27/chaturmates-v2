import { useQuery } from '@tanstack/react-query'
import client from '../../client'

const useExploreGroups = () => {
  const query = useQuery({
    queryKey: ["groups", "explore"],
    queryFn: async () => {
      const res = await client
        .from("groups")
        .select("*, group_members!group_members_group_id_fkey(*)")
        .eq("admin_uni_group", false)
        .eq("deleted", false)

      // from the list, get all the group_members
      console.log("explore groups", res);
      return res.data;
    }
  })

  return query;
}

export default useExploreGroups