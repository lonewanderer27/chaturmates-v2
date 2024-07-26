import { IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonToolbar } from '@ionic/react'
import { notificationsOutline, personOutline, searchOutline, accessibilityOutline } from 'ionicons/icons'

import NavBtn from '../components/NavBtn'
import Sidebar from '../components/Sidebar'
import useSession from '../hooks/auth/useSession'

export default function Community() {
  const { session } = useSession();

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
                  route="community/me"
                  icon={personOutline}
                />
                <NavBtn
                  route="community/search"
                  icon={searchOutline}
                />
                <NavBtn
                  route="community/inbox"
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
