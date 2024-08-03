import client from "../../client";
import { useQuery } from "@tanstack/react-query";
import useSession from "../auth/useSession";
import { useIonAlert, useIonRouter } from "@ionic/react";
import { useState } from "react";

export default function useProfile() {
  const { session } = useSession();
  const [alert] = useIonAlert();
  const [alerted, setAlerted] = useState(false);
  const rt = useIonRouter();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await client
        .from("profiles")
        .select(
          "*, students(*), professors(*), professor:professors(*), student:students(*)"
        )
        .eq("id", session!.user.id)
        .single();
      const response = res.data;

      if (res.data?.students.length === 0 && res.data?.professors.length === 0) {
        if (rt.routeInfo.pathname.includes("/setup") == false && rt.routeInfo.pathname.includes("/continue") == false) {
          if (alerted == false) {
            alert({
              backdropDismiss: false,
              header: "Profile Incomplete",
              message: "You need to complete your profile before you can continue.",
              buttons: [
                {
                  text: "Okay",
                  handler: () => {
                    rt.push("/setup");
                  },
                },
              ],
            });
            setAlerted(true);
          }
        }
      }

      console.log("profile response:", response);
      return response;
    },
    enabled: session !== undefined && session !== null,
  });

  return {
    profile,
    isLoading,
  };
}
