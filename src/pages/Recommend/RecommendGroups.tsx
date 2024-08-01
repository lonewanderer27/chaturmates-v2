import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonPage,
  IonText,
} from "@ionic/react";
import { fingerPrintOutline, hourglassOutline } from "ionicons/icons";
import useHideTabs from "../../hooks/useHideTabs";

export default function RecommendGroups() {
  useHideTabs();

  const handleNext = () => {
    // Your handleNext function logic here
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="w-100 text-center my-auto">
          <IonIcon src={hourglassOutline} size="large" />
          <IonText>
            <h3>Suggestions are on their way</h3>
            <p>Please try again in a few hours.</p>
          </IonText>
        </div>
      </IonContent>
      <IonFooter className="ion-padding flex justify-end">
        <IonButton className="rounded-full" onClick={handleNext}>
          Continue
        </IonButton>
      </IonFooter>
    </IonPage>
  );
}
