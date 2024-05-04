import { IonRouterOutlet } from '@ionic/react'
import { Route, RouteComponentProps } from 'react-router'
import SearchPage from '../pages/Search'
import Inbox from '../pages/Inbox'
import Discover from '../pages/Discover'
import React from 'react'

const DiscoverRoute: React.FC<RouteComponentProps> = ({ match }) => {
  console.log(match);

  return (
    <IonRouterOutlet id="discover">
      <Route path="/discover" component={Discover} exact />
      <Route path="/discover/search" component={SearchPage} exact />
      <Route path="/discover/inbox" component={Inbox} exact />
    </IonRouterOutlet>
  )
}

export default DiscoverRoute;