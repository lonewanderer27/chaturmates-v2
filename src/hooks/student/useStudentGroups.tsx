import { useQuery } from "@tanstack/react-query";
import client from "../../client";
import { GroupType } from "../../types";

const useStudentGroups = (studentId: string) => {
  const query = useQuery({
    queryKey: ["studentGroups", studentId],
    queryFn: async () => {
      // Get the groups that the student is a member of
      const res = await client
      .from("group_members")
      .select("*, group:group_id(*)")
      .eq("student_id", studentId)
      console.log("groups_members data: ", res.data);

      // Get the group data
      const groups = res.data!.map((group_members: any) => group_members.group);
      console.log("groups data: ", groups);

      return groups;
    },
  });

  return query;
};

export default useStudentGroups;
