import { useQuery } from '@tanstack/react-query'
import client from '../../client'

const useHobbies = () => {
  const hq = useQuery({
    queryKey: ["hobbies"],
    queryFn: async () => {
      const hobbiesRes = await client
        .from("hobbies")
        .select("*")

      return hobbiesRes.data
    }
  })

  return hq;
}

export default useHobbies