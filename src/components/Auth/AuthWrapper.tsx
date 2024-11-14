import { IonLoading } from "@ionic/react";

import { Redirect } from "react-router";
import { RouteProps } from "react-router";
import { hideTabBar } from "../../utils/TabBar";
import { showTabBar } from "../../utils/TabBar";
import useSession from "../../hooks/auth/useSession";

const AuthWrapper = (props: RouteProps) => {
  const { session } = useSession();

  if (session !== undefined && session !== null) {
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
  if (session === null && session === null) {
    hideTabBar();
    return <Redirect to="/continue" />;
  }

  return <IonLoading />; // loading
};

export default AuthWrapper;
