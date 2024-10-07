import useProfile from '../profile/useProfile';
import { useQuery } from '@tanstack/react-query';
import client from '../../client';

const useSelfStudentLite = () => {
  const { profile } = useProfile();

  const query = useQuery({
    queryKey: ['student', 'lite'],
    queryFn: async () => {
      const res = await client
        .from("students")
        .select("*")
        .eq("profile_id", profile!.id)
        .single();

      return res.data;
    }
  })

  return {
    profile: profile ?? null,
    student: query.data ?? null,
    query
  }
}

export default useSelfStudentLite;