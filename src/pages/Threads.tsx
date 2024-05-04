import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";

export default function Threads() {
  return (
    <IonPage>
      <IonContent fullscreen className='ion-padding'>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle>
              Threads
            </IonTitle>
          </IonToolbar>
        </IonHeader>

      </IonContent>
    </IonPage>
  )
}
