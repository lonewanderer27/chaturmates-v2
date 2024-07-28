import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";

import { showTabBar } from "../utils/TabBar";

export default function Threads() {
  useIonViewWillEnter(() => {
    showTabBar();
  })

  return (
    <IonPage>
      <IonHeader translucent>
          <IonToolbar>
            <IonTitle>
              Threads
            </IonTitle>
          </IonToolbar>
        </IonHeader>
      <IonContent fullscreen className='ion-padding'>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size="large">
              Threads
            </IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  )
}
