import { useQuery } from '@tanstack/react-query'
import client from '../../client'

const useFetchAcademicYears = () => {
  const query = useQuery({
    queryKey: ['academicYears'],
    queryFn: async () => {
      const res = await client
        .from('academic_years')
        .select('*')

      return res.data
    },
  })

  return query;
}

export default useFetchAcademicYears