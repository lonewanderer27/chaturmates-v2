import { useQuery } from '@tanstack/react-query'

const useStudentByVanityUrl = (student_vanity_url: string) => {
  const student = useQuery({
    queryKey: ['student', student_vanity_url],
    queryFn: async () => {
      
    }
  })
}

export default useStudentByVanityUrl