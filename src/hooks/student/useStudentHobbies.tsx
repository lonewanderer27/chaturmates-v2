import { useQuery } from "@tanstack/react-query"
import client from "../../client"

const useStudentHobbies = (studentId: string) => {
  const sHQ = useQuery({
    queryKey: ["studentHobbies"],
    queryFn: async() => {
      // fetch the hobbies
      const rawHobbies = await client
        .from("student_hobbies")
        .select("*")
        .eq("student_id", studentId)

      if (!rawHobbies.data) return []

      // fetch the hobbies
      const hobbies = await client
        .from("hobbies")
        .select("*")
        .in("id", rawHobbies.data.map((hobby) => hobby.hobby_id))

      return hobbies.data
    },
    enabled: !!studentId
  })

  return {
    hobbies: sHQ.data ?? [],
    query: sHQ
  }
}

export default useStudentHobbies;