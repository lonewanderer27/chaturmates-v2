import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonPage,
  IonText,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { timeOutline, homeOutline } from "ionicons/icons";
import { FC } from "react";
import { RouteComponentProps } from "react-router";
import { hideTabBar } from "../utils/TabBar";
import useHideTabs from "../hooks/useHideTabs";

const FeatureUnavailable: FC<RouteComponentProps> = () => {
  useHideTabs();
  const history = useIonRouter();

  const handleGoHome = () => {
    history.push("/", "root", "replace");
  };

  const handleNotice = () => {
    history.push("/inbox#notice");
  };

  return (
    <IonPage>
      <IonContent className="ion-padding flex justify-center content-center">
        <div className="w-100 text-center mt-56">
          <IonIcon src={timeOutline} size="large" />
          <IonText>
            <h1>Feature Unavailable</h1>
            <h3 className="mt-8">This feature is not available yet</h3>
            <p>
              Stay tuned for further{" "}
              <span className="underline cursor-pointer" onClick={handleNotice}>
                notice
              </span>
            </p>
          </IonText>
        </div>
      </IonContent>
      <IonFooter className="flex justify-center ion-padding">
        <IonButton onClick={handleGoHome} shape="round">
          {/* <IonIcon slot="start" icon={homeOutline} /> */}
          Go to Home
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default FeatureUnavailable;
