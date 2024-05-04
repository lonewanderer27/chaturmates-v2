import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar } from '@ionic/react'
import NavBtn from '../components/NavBtn'
import { notificationsOutline, personOutline, searchOutline } from 'ionicons/icons'
import Sidebar from '../components/Sidebar'

export default function Community() {
  return (
    <>
      <Sidebar />
      <IonPage id="sidebar-content">
        <IonContent className='ion-padding'>
          <IonHeader collapse='condense'>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton></IonMenuButton>
              </IonButtons>
              <IonButtons slot="end">
                <NavBtn
                  route="/community/me"
                  icon={personOutline}  
                />
                <NavBtn
                  route="/community/search"
                  icon={searchOutline}
                />
                <NavBtn
                  route="/community/inbox"
                  icon={notificationsOutline}
                />
              </IonButtons>
            </IonToolbar>
          </IonHeader>
        </IonContent>
      </IonPage >
    </>
  )
}
