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
// import Swiper styles
import 'swiper/css';
// import react slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.class.css';
import '@ionic/react/css/palettes/high-contrast.class.css';
import './theme/high-contrast-dark.css';
import './theme/high-contrast-light.css';
/* Theme variables */
import './theme/variables.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */


import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonList,
  IonToggle,
  IonItem,
  IonFabButton,
  IonFabList,
  IonFab,
  IonButtons,
  IonButton,
  IonModal,
  IonContent,
  IonToolbar,
  IonTitle,
} from '@ionic/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Redirect, Route } from 'react-router-dom';
import {  chatboxOutline, compassOutline, peopleOutline, chevronUpCircle,  colorPalette, globe,add
} from 'ionicons/icons';

import Community from './pages/Community';
import CommunityRoute from './routes/CommunityRoute';
import ContinueRoute from './routes/ContinueRoute';
import Discover from './pages/Discover';
import DiscoverRoute from './routes/DiscoverRoute';
import Inbox from './pages/Inbox';
import { IonReactRouter } from '@ionic/react-router';
import SurveysRoute from './routes/SurveysRoute';
import Threads from './pages/Threads';
import ThreadsRoute from './routes/ThreadsRoute';
import React, { useEffect, useState, useRef, useCallback  } from 'react';
import { Preferences } from '@capacitor/preferences';
import AccessibilitySettings from './components/AccessibilitySettings';


setupIonicReact({
  mode: 'ios'
});

// instantiate tanstack client
export const qClient = new QueryClient();
const App = () => {

  return (
    <QueryClientProvider client={qClient}>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/discover" component={DiscoverRoute} />
              <Route path="/community" component={CommunityRoute} />
              <Route path="/threads" component={ThreadsRoute} />
              <Route path="/continue" component={ContinueRoute} />
              <Route path="/surveys" component={SurveysRoute} />
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


          <IonFab style={{marginBottom: 60}} slot="fixed" vertical="bottom" horizontal="end">
         
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
      
            <IonFabButton id="testColor">
              <IonIcon id="open-modal" icon={colorPalette}></IonIcon>
            </IonFabButton>
            
            <IonFabButton id="testColor">
              <IonIcon icon={globe}></IonIcon>
            </IonFabButton>

          </IonFabList>
        </IonFab>


       <AccessibilitySettings/>


        </IonReactRouter>
      </IonApp>
    </QueryClientProvider>
  )
}

export default App;
