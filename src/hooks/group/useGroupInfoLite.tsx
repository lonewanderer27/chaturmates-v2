import { useQuery } from '@tanstack/react-query'
import client from '../../client';

const useGroupInfoLite = (vanity_url?: string) => {
  const q = useQuery({
    queryKey: ["group_info_lite", vanity_url],
    queryFn: async () => {
      const groupRes = await client
        .from("groups")
        .select("name, description, avatar_url, cover_url")
        .eq("vanity_id", vanity_url!)
        .single();

      return groupRes.data;
    },
  })

  return q;
}

export default useGroupInfoLite