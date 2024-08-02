import { useQuery } from '@tanstack/react-query'
import client from '../../client'

const useFetchColleges = () => {
  const query = useQuery({
    queryKey: ['colleges'],
    queryFn: async () => {
      const res = await client
        .from('colleges')
        .select('*')
        .order("title")

      return res.data
    },
  })

  return query;
}

export default useFetchColleges