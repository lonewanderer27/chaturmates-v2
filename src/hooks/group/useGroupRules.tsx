import { useQuery } from '@tanstack/react-query'
import client from '../../client'

const useGroupRules = (group_vanity_id: string) => {
  const query = useQuery({
    queryKey: ['group_rules', group_vanity_id],
    queryFn: async () => {
      const res = await client
        .from("group_rules")
        .select("*")
        .eq("group_vanity_id", group_vanity_id)
        .order("order")
      console.log("group_rules: ", res.data)

      return res.data
    }
  })

  return query;
}

export default useGroupRules