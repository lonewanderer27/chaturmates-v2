import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  useIonRouter
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { chatboxEllipsesOutline, homeOutline, newspaperOutline } from 'ionicons/icons';
import Discover from './pages/Discover';
import Home from './pages/Home';
import Inbox from './pages/Inbox';
import Threads from './pages/Threads';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import DiscoverRoute from './routes/DiscoverRoute';
import HomeRoute from './routes/HomeRoute';

setupIonicReact({
  mode: 'ios'
});

const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/discover" component={DiscoverRoute} />
            <Route path="/home" component={HomeRoute} />
            <Route path="/inbox" component={Inbox} exact />
            <Route path="/threads" component={Threads} exact />
            <Route path="/" component={() => <Redirect to="/home" />} exact />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon aria-hidden="true" icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="discover" href="/discover">
              <IonIcon aria-hidden="true" icon={newspaperOutline} />
              <IonLabel>Discover</IonLabel>
            </IonTabButton>
            <IonTabButton tab="threads" href="/threads">
              <IonIcon aria-hidden="true" icon={chatboxEllipsesOutline} />
              <IonLabel>Threads</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
