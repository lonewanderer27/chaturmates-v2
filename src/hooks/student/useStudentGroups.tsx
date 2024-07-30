import { useQuery } from '@tanstack/react-query'
import client from '../../client'

const useStudentGroupsLite = (studentId: string) => {
  const query = useQuery({
    queryKey: ["studentGroups", studentId],
    queryFn: async() => {
      const res = await client
        .from("group_members")
        .select("*")
        .eq("student_id", studentId)
        .eq("approved", true)

      return res.data
    }
  })

  return query;
}

export default useStudentGroupsLite