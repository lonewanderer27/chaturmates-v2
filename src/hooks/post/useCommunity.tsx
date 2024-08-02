import { useQuery } from "@tanstack/react-query"
import useSelfStudentLite from "../student/useSelfStudentLite"

const useCommunity = () => {
  const { student } = useSelfStudentLite();

  const { data } = useQuery({
    queryKey: ['community', 'timeline', student?.id],
  })
}

export default useCommunity