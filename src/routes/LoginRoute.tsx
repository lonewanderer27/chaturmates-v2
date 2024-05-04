import { IonRouterOutlet } from '@ionic/react'
import React, { useEffect } from 'react'
import { Route, RouteComponentProps } from 'react-router'
import Login from '../pages/Login'
import { hideTabBar, showTabBar } from '../utils/TabBar'

const LoginRoute: React.FC<RouteComponentProps> = ({ match }) => {
  useEffect(() => {
    console.log(match);

    // hide tab bar 
    hideTabBar();

    // upon unmount, show tab bar
    return () => {
      showTabBar();
    }
  }, [])

  return (
    <IonRouterOutlet id="login">
      <Route path="/login" component={Login} exact />
    </IonRouterOutlet>
  )
}

export default LoginRoute