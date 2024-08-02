import { IonLoading, IonPage, IonText } from "@ionic/react";

import { Redirect } from "react-router";
import { RouteProps } from "react-router";
import { hideTabBar } from "../../utils/TabBar";
import { showTabBar } from "../../utils/TabBar";
import useProfile from "../../hooks/profile/useProfile";
import useSession from "../../hooks/auth/useSession";
import { useIonAlert } from "@ionic/react";
import { useEffect } from "react";

const AuthWrapper = (props: RouteProps) => {
  const { session } = useSession();
  const { profile, isLoading } = useProfile();
  const [alert] = useIonAlert();

  useEffect(() => {
    if (profile !== undefined && isLoading === false) {
      console.log("profile:", profile);
      console.log("isLoading:", isLoading);
      if (
        profile?.student[0] === null ||
        profile?.professor[0] === null ||
        profile?.student[0]?.verified === false ||
        profile?.professor[0]?.verified === false
      ) {
        console.log(
          "student or professor profile not set up for this account!"
        );
        console.log("student: ", profile?.student[0]);
        console.log("professor: ", profile?.professor[0]);
        if (window.location.pathname.includes("/setup") == false) {
          // they haven't set up their profile yet
          alert({
            header: "Profile not set up",
            message: "You need to set up your profile before you can continue.",
            buttons: [
              {
                text: "OK",
                handler: () => {
                  window.location.href = "/setup";
                },
              },
            ],
          });
        }
      }
    }
  }, [session, profile]);

  if (session !== undefined && session !== null && profile !== undefined) {
    // we're authenticated, so we can show the tabs
    showTabBar();
    return props.children as unknown as JSX.Element;
  }

  // if we're on the continue page,
  // redirect to the home page
  if (props.location?.pathname === "/continue") {
    return <Redirect to="/discover" />;
  }

  // if we're not authenticated, redirect to the continue page
  if (session === null && session === null && profile === undefined) {
    hideTabBar();
    return <Redirect to="/continue" />;
  }

  return <IonLoading />; // loading
};

export default AuthWrapper;
