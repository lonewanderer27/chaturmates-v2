/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
// import Swiper styles
import "swiper/css";
// import react slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";
/* Theme variables */
import "./theme/variables.css";

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  useIonRouter,
} from "@ionic/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Redirect, Route, useLocation } from "react-router-dom";
import {
  chatboxEllipsesOutline,
  chatboxOutline,
  compassOutline,
  compassSharp,
  homeOutline,
  newspaperOutline,
  peopleOutline,
  peopleSharp,
} from "ionicons/icons";

import AuthWrapper from "./components/Auth/AuthWrapper";
import Community from "./pages/Community";
import CommunityRoute from "./routes/CommunityRoute";
import ContinueRoute from "./routes/ContinueRoute";
import Discover from "./pages/Discover";
import DiscoverRoute from "./routes/DiscoverRoute";
import Inbox from "./pages/Inbox";
import { IonReactRouter } from "@ionic/react-router";
import SetupRoute from "./routes/SetupRoute";
import SurveysRoute from "./routes/SurveysRoute";
import TabIconChangerWrapper from "./TabIconChangerWrapper";
import Threads from "./pages/Threads";
import ThreadsRoute from "./routes/ThreadsRoute";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

setupIonicReact({
  mode: "ios",
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
              <TabIconChangerWrapper>
                <AuthWrapper>
                  <Route path="/discover" component={DiscoverRoute} />
                  <Route path="/community" component={CommunityRoute} />
                  <Route path="/threads" component={ThreadsRoute} />
                  <Route path="/surveys" component={SurveysRoute} />
                  <Route path="/setup" component={SetupRoute} />
                  <Route
                    path="/"
                    component={() => <Redirect to="/discover" />}
                    exact
                  />
                </AuthWrapper>
                <Route path="/continue" component={ContinueRoute} />
              </TabIconChangerWrapper>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="discover" href="/discover">
                <IonIcon
                  id="discoverTabButton"
                  aria-hidden="true"
                  icon={
                    location.pathname === "/discover"
                      ? compassSharp
                      : compassOutline
                  }
                />
                <IonLabel>Discover</IonLabel>
              </IonTabButton>
              <IonTabButton tab="community" href="/community">
                <IonIcon
                  id="communityTabButton"
                  aria-hidden="true"
                  icon={
                    location.pathname === "/community"
                      ? peopleSharp
                      : peopleOutline
                  }
                />
                <IonLabel>Community</IonLabel>
              </IonTabButton>
              <IonTabButton tab="threads" href="/threads">
                <IonIcon
                  id="threadsTabButton"
                  aria-hidden="true"
                  icon={
                    location.pathname === "/threads"
                      ? chatboxEllipsesOutline
                      : chatboxOutline
                  }
                />
                <IonLabel>Threads</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </QueryClientProvider>
  );
};

export default App;
