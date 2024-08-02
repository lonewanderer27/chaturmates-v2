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
  const { profile } = useProfile();
  const [alert] = useIonAlert();

  useEffect(() => {
    if (session !== undefined && session !== null && profile !== undefined) {
      if (profile?.student.length == 0 || profile?.professor.length == 0) {
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
  }, [session, profile, alert]);

  if (session !== undefined && session !== null && profile !== undefined) {
    // if (profile?.student.length == 0 || profile?.professor.length == 0) {
    //   if (window.location.pathname.includes("/setup") == false) {
    //     // they haven't set up their profile yet
    //     alert({
    //       header: "Profile not set up",
    //       message: "You need to set up your profile before you can continue.",
    //       buttons: [
    //         {
    //           text: "OK",
    //           handler: () => {
    //             window.location.href = "/setup";
    //           },
    //         },
    //       ],
    //     });
    //   }
    // }

    // we're authenticated, so we can show the tabs
    showTabBar();
    return props.children as unknown as JSX.Element;
  }

  // if we're on the continue page,
  // redirect to the home page
  if (props.location?.pathname === "/continue") {
    return <Redirect to="/discover" />;
  }

  if (session === null && session === null && profile === undefined) {
    hideTabBar();
    return <Redirect to="/continue" />;
  }

  return <IonLoading />; // loading
};

export default AuthWrapper;
