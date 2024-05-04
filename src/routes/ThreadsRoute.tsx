import { IonRouterOutlet } from '@ionic/react'
import React from 'react'
import Threads from '../pages/Threads'
import { Route, RouteComponentProps } from 'react-router'

const ThreadsRoute: React.FC<RouteComponentProps> = ({ match }) => {
  console.log(match);

  return (
    <IonRouterOutlet id="threads">
      <Route path="/threads" component={Threads} exact />
    </IonRouterOutlet>
  )
}

export default ThreadsRoute;
