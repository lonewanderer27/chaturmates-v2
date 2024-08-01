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

const Setup2CourseYrLevelType = () => {
  useIonViewWillEnter(() => {
    hideTabBar();
  });

  const { handleNext } = useSetup();

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div>
          <IonProgressBar value={0.4}></IonProgressBar>
        </div>
      </IonContent>
      <IonFooter className="ion-padding flex justify-end">
        <IonButton className="rounded-full" onClick={handleNext}>
          Next
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Setup2CourseYrLevelType;
