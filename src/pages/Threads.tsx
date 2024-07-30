import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";

import { showTabBar } from "../utils/TabBar";

export default function Threads() {
  useIonViewWillEnter(() => {
    showTabBar();
  });

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonText
              slot="start"
              className="page-title font-poppins font-bold"
              color="secondary"
            >
              Threads
            </IonText>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
}
