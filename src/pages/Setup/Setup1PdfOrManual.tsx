import {
  IonButton,
  IonContent,
  IonFooter,
  IonPage,
  IonProgressBar,
  useIonViewWillEnter,
} from "@ionic/react";

import { hideTabBar } from "../../utils/TabBar";
import useSetup from "../../hooks/setup/useSetup";

const Setup1PdfOrManual = () => {
  useIonViewWillEnter(() => {
    hideTabBar();
  });

  const { handleNext } = useSetup();

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div>
          <IonProgressBar value={0.2}></IonProgressBar>
        </div>
      </IonContent>
      <IonFooter className="ion-padding flex justify-end">
        <IonButton className="rounded-full" onClick={handleNext}>
          Continue
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Setup1PdfOrManual;
