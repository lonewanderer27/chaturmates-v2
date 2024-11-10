import client from "../../client";
import { getStudentById } from "../../services/students";
import useProfile from "../profile/useProfile";
import { useQuery } from "@tanstack/react-query";
import useSession from "../auth/useSession";

export function useFindStudentById(studentId?: string) {
  const query = useQuery({
    queryKey: ["student", studentId],
    queryFn: async () => {
      console.log("useQuery");
      const res = await getStudentById(studentId!);
      console.log("data", res.data);
      return res.data;
    },
    enabled: !!studentId,
  });

  return {
    ...query.data
  }
}

export default function useSelfStudent() {
  const { session } = useSession();
  const { profile } = useProfile();

  const query = useQuery({
    queryKey: ["student, profile id:", profile?.id],
    queryFn: async () => {
      if (!profile?.id) return null;

      const res = await client
        .from('students')
        .select(`
          *,
          schools(*),
          academic_years(*),
          followers:student_followers!student_followers_follower_id_fkey(follower_id(*)),
          following:student_followers!student_followers_following_id_fkey(following_id(*)),
          groups:group_members(group_id(*))
        `)
        .eq('profile_id', profile.id)
        .single();

      console.log("useSelfStudent res", res);

      // Extract followers, following, and groups from the nested relationships
      const followers = res.data?.followers?.map((f) => f.follower_id) || [];
      const following = res.data?.following?.map((f) => f.following_id) || [];
      const groups = res.data?.groups?.map((g) => g.group_id) || [];

      return {
        student: res.data,
        followers,
        following,
        groups,
        school: res.data?.schools,
        academic_year: res.data?.academic_years,
      };
    },
    enabled: !!profile && !!session,
  });

  return {
    profile: profile,
    student: query.data?.student ?? null,
    groups: query.data?.groups ?? null,
    followers: query.data?.followers ?? null,
    following: query.data?.following ?? null,
    school: query.data?.school ?? null,
    academic_year: query.data?.academic_year ?? null,
    query
  };
}
