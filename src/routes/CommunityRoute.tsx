import { IonRouterOutlet } from '@ionic/react'
import { Route, RouteComponentProps } from 'react-router'
import Community from '../pages/Community'
import SearchPage from '../pages/Search'
import Inbox from '../pages/Inbox'
import React from 'react'

const CommunityRoute: React.FC<RouteComponentProps> = ({ match }) => {
  console.log(match);

  return (
    <IonRouterOutlet id="community">
      <Route path="/community" component={Community} exact />
      <Route path="/community/search" component={SearchPage} exact />
      <Route path="/community/inbox" component={Inbox} exact />
    </IonRouterOutlet>
  )
}

export default CommunityRoute;
