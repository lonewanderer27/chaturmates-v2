import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonPage,
  IonText,
  useIonRouter,
} from "@ionic/react";
import {
  homeOutline,
  hourglassOutline,
} from "ionicons/icons";
import useHideTabs from "../../hooks/useHideTabs";
import { FC } from "react";
import { RouteComponentProps } from "react-router";

const RecommendPending: FC<RouteComponentProps> = () => {
  useHideTabs();

  const rt = useIonRouter();
  const handleGoHome = () => {
    rt.push("/");
  };

  return (
    <IonPage>
      <IonContent className="ion-paddingflex justify-center content-center">
        <div className="w-100 text-center mt-56">
          <IonIcon src={hourglassOutline} size="large" />
          <IonText>
            <h3>Recommendations are on their way</h3>
            <p>Please try again in a few hours.</p>
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

export default RecommendPending;
