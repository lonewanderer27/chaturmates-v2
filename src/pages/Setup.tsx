import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonPage,
  useIonViewWillEnter,
} from "@ionic/react";

import { IonText } from "@ionic/react";
import { fingerPrintOutline } from "ionicons/icons";
import { hideTabBar } from "../utils/TabBar";
import useSetup from "../hooks/setup/useSetup";

export default function Setup() {
  useIonViewWillEnter(() => {
    hideTabBar();
  });

  const { handleNext } = useSetup();

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="w-100 text-center my-auto">
          <IonIcon src={fingerPrintOutline} size="large" />
          <IonText>
            <h3>Title</h3>
          </IonText>
          <IonText>
            <p>Description</p>
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
