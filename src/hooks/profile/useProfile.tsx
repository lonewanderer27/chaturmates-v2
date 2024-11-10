import client from "../../client";
import { useQuery } from "@tanstack/react-query";
import useSession from "../auth/useSession";
import { useIonAlert, useIonRouter } from "@ionic/react";
import { useState } from "react";

export default function useProfile() {
  const { session } = useSession();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await client
        .from("profiles")
        .select(
          "*, students(*), professors(*), professor:professors(*), student:students(*, schools(*), academic_years(*))"
        )
        .eq("id", session!.user.id)
        .single();
      const response = res.data;

      console.log("profile response:", response);
      return response;
    },
    enabled: session !== undefined && session !== null,
  });

  return {
    profile,
    student: profile?.student,
    isLoading,
  };
}
