import { IonLoading, IonPage, IonText } from '@ionic/react';

import { Redirect } from 'react-router';
import { RouteProps } from 'react-router'
import { hideTabBar } from '../../utils/TabBar';
import { showTabBar } from '../../utils/TabBar';
import useProfile from '../../hooks/profile/useProfile';
import useSession from '../../hooks/auth/useSession';

const AuthWrapper = (props: RouteProps) => {
  const { session } = useSession();
  const { profile } = useProfile();

  console.info(session);

  if (session !== undefined && session !== null) {
    if (profile?.students[0].verified === false) {
      hideTabBar();
      return <IonPage>
        <IonText>
          <h1>Unverified</h1>
        </IonText>
      </IonPage>
    }

    // if we're on the continue page,
    // redirect to the home page
    if (props.location?.pathname === "/continue") {
      return <Redirect to="/discover" />
    }

    // we're authenticated, so we can show the tabs
    showTabBar();
    return props.children as unknown as JSX.Element;
  }

  if (session === null) {
    hideTabBar();
    return <Redirect to="/continue" />;
  }

  return <IonLoading/> // loading
}

export default AuthWrapper