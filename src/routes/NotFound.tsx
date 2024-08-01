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
import { sadOutline, homeOutline } from "ionicons/icons";
import { FC } from "react";
import { RouteComponentProps } from "react-router";
import { hideTabBar } from "../utils/TabBar";

const NotFound: FC<RouteComponentProps> = () => {
  useIonViewWillEnter(() => {
    hideTabBar();
  });
  const history = useIonRouter();

  const handleGoHome = () => {
    history.push("/");
  };

  return (
    <IonPage>
      <IonContent className="ion-padding flex justify-center content-center">
        <div className="w-100 text-center mt-40">
          <IonIcon src={sadOutline} size="large" />
          <IonText>
            <h1>404</h1>
            <h3>Page Not Found</h3>
            <p>The page you are looking for does not exist.</p>
          </IonText>
        </div>
      </IonContent>
      <IonFooter className="flex justify-center ion-padding">
        <IonButton onClick={handleGoHome} className="rounded-full">
          <IonIcon slot="start" icon={homeOutline} />
          Go to Home
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default NotFound;
