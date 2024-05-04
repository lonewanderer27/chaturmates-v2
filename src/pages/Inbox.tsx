import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react'

export default function Inbox() {
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
