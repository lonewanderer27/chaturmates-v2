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
import { chatboxEllipsesOutline, chatboxOutline, compassOutline, homeOutline, newspaperOutline, peopleOutline } from 'ionicons/icons';
import Community from './pages/Community';
import Discover from './pages/Discover';
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
import CommunityRoute from './routes/CommunityRoute';
import DiscoverRoute from './routes/DiscoverRoute';

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
            <Route path="/community" component={CommunityRoute} />
            <Route path="/threads" component={Threads} exact />
            <Route path="/" component={() => <Redirect to="/discover" />} exact />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="discover" href="/discover">
              <IonIcon aria-hidden="true" icon={compassOutline} />
              <IonLabel>Discover</IonLabel>
            </IonTabButton>
            <IonTabButton tab="community" href="/community">
              <IonIcon aria-hidden="true" icon={peopleOutline} />
              <IonLabel>Community</IonLabel>
            </IonTabButton>
            <IonTabButton tab="threads" href="/threads">
              <IonIcon aria-hidden="true" icon={chatboxOutline} />
              <IonLabel>Threads</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
