import { IonButtons, IonContent, IonHeader, IonPage, IonText, IonToolbar } from '@ionic/react'
import { notificationsOutline, notificationsSharp, searchCircleOutline, searchOutline } from 'ionicons/icons'
import NavBtn from '../components/NavBtn'

export default function Home() {
  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonText slot="start" className="page-title font-poppins font-bold">
              Chat-ur-Meyts
            </IonText>
            <IonButtons slot="end">
              <NavBtn
                route="/search"
                icon={searchOutline}
              />
              <NavBtn
                route="/notifications"
                icon={notificationsOutline}
              />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  )
}
