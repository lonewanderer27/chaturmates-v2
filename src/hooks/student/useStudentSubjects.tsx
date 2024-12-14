import { useQuery } from '@tanstack/react-query'
import client from '../../client'

const useStudentSubjects = (studentId: string) => {
  const query = useQuery({
    queryKey: ["studentSubjects"],
    queryFn: async () => {
      // fetch the ids of the subjects
      const rawSubjects = await client
        .from("students_subjects")
        .select("*")
        .eq("student_id", studentId)

      if (!rawSubjects.data) return []

      // fetch the subjects
      const subjects = await client
        .from("subjects")
        .select("*")
        .in("id", rawSubjects.data.map((subject) => subject.subject_id))

      return subjects.data
    },
    enabled: !!studentId
  })

  return query;
}

export default useStudentSubjects