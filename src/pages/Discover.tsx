import { IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonLabel, IonMenuButton, IonPage, IonTabBar, IonTabButton, IonTabs, IonText, IonToolbar } from '@ionic/react'
import NavBtn from '../components/NavBtn'
import { chatboxEllipsesOutline, homeOutline, newspaperOutline, notificationsOutline, searchOutline } from 'ionicons/icons'
import Sidebar from '../components/Sidebar'

export default function Discover() {
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
              {/* <IonText slot="start" className='page-title font-poppins font-bold'>
                Discover
              </IonText> */}
              <IonButtons slot="end">
                <NavBtn
                  route="/discover/search"
                  icon={searchOutline}
                />
                <NavBtn
                  route="/discover/inbox"
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
