import { IonRouterOutlet } from '@ionic/react'
import { Route } from 'react-router'
import Discover from '../pages/Discover'
import SearchPage from '../pages/Discover/Search'
import Inbox from '../pages/Inbox'

export default function DiscoverRoute() {
  return (
    <IonRouterOutlet id="discover">
      <Route path="/discover" component={Discover} exact />
      <Route path="/discover/search" component={SearchPage} exact />
      <Route path="/discover/inbox" component={Inbox} exact />
    </IonRouterOutlet>
  )
}
