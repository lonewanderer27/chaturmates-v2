import useProfile from '../profile/useProfile';
import { useQuery } from '@tanstack/react-query';
import client from '../../client';

const useSelfDraftStudent = () => {
  const { profile } = useProfile();

  const draftStudentQuery = useQuery({
    queryKey: ['draftStudent', profile?.id],
    queryFn: async () => {
      const { data, error } = await client
        .from("draft_students")
        .select("*")
        .eq("user_id", profile!.id)
        .limit(1)
        .maybeSingle()

      if (error) {
        throw new Error(error.message);  // Throwing an error for React Query to catch
      }
      return data;
    },
    enabled: !!profile,
    retry: 2
  });

  return draftStudentQuery; // Return the query result to the component
};

export default useSelfDraftStudent
