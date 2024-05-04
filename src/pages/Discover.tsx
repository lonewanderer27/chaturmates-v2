import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonText, IonToolbar } from '@ionic/react'
import NavBtn from '../components/NavBtn'
import { notificationsOutline, searchOutline } from 'ionicons/icons'
import Sidebar from '../components/Sidebar'

export default function Discover() {
  return (
    <>
      <Sidebar/>
      <IonPage id="sidebar-content">
        <IonContent className='ion-padding'>
          <IonHeader collapse='condense'>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton></IonMenuButton>
              </IonButtons>
              {/* <IonText slot="start" className='page-title font-poppins font-bold'>
                Discover
              </IonText> */}
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
    </>
  )
}
