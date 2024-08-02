import { useQuery } from "@tanstack/react-query";
import useSelfStudentLite from "../student/useSelfStudentLite";
import client from "../../client";
import { useState } from "react";

const useMePendingRequest = (group_vanity_id: string, groupId: string) => {
  const { profile } = useSelfStudentLite();
  const [joining, setJoining] = useState(false);
  const query = useQuery({
    queryKey: [group_vanity_id, "did_i_requested_to_be_a_member", profile?.id],
    queryFn: async () => {
      console.log(
        "did i requested to be a member",
        group_vanity_id,
        profile?.id
      );
      const { data } = await client
        .from("group_members")
        .select("*")
        .eq("profile_id", profile!.id)
        .eq("group_vanity_id", group_vanity_id)
        .eq("approved", false)
        .maybeSingle();

      return data;
    },
  });

  const requesToJoin = async () => {
    setJoining(true);
    const res = await client.from("group_members").insert({
      student_id: profile?.student[0].id!,
      profile_id: profile?.id!,
      group_id: Number(groupId!),
      group_vanity_id: group_vanity_id!,
      is_admin: false,
      approved: false,
      creator: false,
    });
    await query.refetch();
    console.log("toggle join", res);
    setJoining(false);
  };

  const cancelPendingRequest = async () => {
    setJoining(true);
    const res = await client
      .from("group_members")
      .delete()
      .eq("profile_id", profile!.id)
      .eq("group_vanity_id", group_vanity_id)
      .eq("approved", false);
    await query.refetch();
    console.log("cancel pending request", res);
    setJoining(false);
  }

  return {
    ...query,
    toggleJoin: requesToJoin,
    cancelPendingRequest,
    joining
  };
};

export default useMePendingRequest;
