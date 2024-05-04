import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";

export default function Threads() {
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
