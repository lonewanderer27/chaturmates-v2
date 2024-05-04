import { IonRouterOutlet } from '@ionic/react'
import { Route } from 'react-router'
import SearchPage from '../pages/Discover/Search'
import Inbox from '../pages/Inbox'
import Home from '../pages/Home'

export default function HomeRoute() {
  return (
    <IonRouterOutlet id="home">
      <Route path="/home" component={Home} exact />
      <Route path="/home/search" component={SearchPage} exact />
      <Route path="/home/inbox" component={Inbox} exact />
    </IonRouterOutlet>
  )
}
