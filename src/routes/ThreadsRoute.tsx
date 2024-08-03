import { IonRouterOutlet } from '@ionic/react'
import React from 'react'
import Threads from '../pages/Threads'
import { Route, RouteComponentProps } from 'react-router'
import FeatureUnavailable from './FeatureUnavailable'

const ThreadsRoute: React.FC<RouteComponentProps> = ({ match }) => {
  console.log(match);

  return (
    <IonRouterOutlet id="threads">
      <Route path={match.url} component={FeatureUnavailable} exact />
    </IonRouterOutlet>
  )
}

export default ThreadsRoute;
