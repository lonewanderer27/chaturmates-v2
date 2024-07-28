import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'

import { showTabBar } from '../utils/TabBar';

export default function Inbox() {
  useIonViewWillEnter(() => {
    showTabBar();
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inbox</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/discover' />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding'>
        <IonSegment>
          <IonSegmentButton>
            Following
          </IonSegmentButton>
          <IonSegmentButton>
            Notices
          </IonSegmentButton>
        </IonSegment>
      </IonContent>
    </IonPage>
  )
}
