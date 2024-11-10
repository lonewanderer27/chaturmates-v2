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
  const { profile, student: studentQuery = [] } = useProfile();
  const student = studentQuery[0] ?? null;

  const query = useQuery({
    queryKey: ["student", student?.id],
    queryFn: async () => {
      const res = (await getStudentById(student?.id + "")).data;
      return res;
    },
    enabled: !!student?.id,
  });

  return {
    profile: profile,
    student: student,
    groups: query.data?.groups ?? null,
    followers: query.data?.followers ?? null,
    following: query.data?.following ?? null,
    school: student?.schools ?? null,
    academic_year: student?.academic_years ?? null,
    query,
  };
}