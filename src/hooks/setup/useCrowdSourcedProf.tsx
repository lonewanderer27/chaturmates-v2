import { useQuery } from '@tanstack/react-query'
import client from '../../client'

const useCrowdSourcedProf = () => {
  const query = useQuery({
    queryKey: ['crowdSourcedProf'],
    queryFn: async () => {
      const res = await client
        .from("crowd_sourced_professors")
        .select("*")

      return res.data
    }
  })

  return query;
}

export default useCrowdSourcedProf