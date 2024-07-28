import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import { notificationsOutline, personOutline, searchOutline } from 'ionicons/icons'

import NavBtn from '../components/NavBtn'
import Sidebar from '../components/Sidebar'
import { showTabBar } from '../utils/TabBar'
import useSession from '../hooks/auth/useSession'

export default function Community() {
  const { session } = useSession();
  useIonViewWillEnter(() => {
    showTabBar();
  })

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
