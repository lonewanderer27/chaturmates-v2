import { useQuery } from '@tanstack/react-query'
import client from '../../client'

const useFetchSubjects = () => {
  const query = useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const res = await client
        .from('subjects')
        .select('*')
        .order("title")

      return res.data
    },
  })

  return query;
}

export default useFetchSubjects