import { IonPage, IonContent, IonHeader, IonToolbar, IonText, IonButtons, IonTitle } from "@ionic/react";
import { searchOutline, notificationsOutline } from "ionicons/icons";
import NavBtn from "../components/NavBtn";

export default function Threads() {
  return (
    <IonPage>
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
