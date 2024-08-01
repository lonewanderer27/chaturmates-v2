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
      const res = (
        await client
          .from("students")
          .select("*, schools(*), academic_years(*)")
          .eq("profile_id", profile!.id)
          .single()
      ).data;
      console.log("useSelfStudent res", res);
      return res;
    },
    enabled: !!profile && !!session,
  });

  const query2 = useQuery({
    queryKey: ["student", query.data?.id],
    queryFn: async () => {
      const res = (await getStudentById(query.data?.id + "")).data;
      return res;
    },
    enabled: !!query.data?.id,
  });

  return {
    profile: profile,
    student: query.data ?? null,
    groups: query2.data?.groups ?? null,
    followers: query2.data?.followers ?? null,
    following: query2.data?.following ?? null,
    school: query.data?.schools ?? null,
    academic_year: query.data?.academic_years ?? null,
  };
}
