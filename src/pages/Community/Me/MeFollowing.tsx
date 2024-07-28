import { IonBackButton, IonButton, IonButtons, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import { hideTabBar, showTabBar } from '../../../utils/TabBar';

import StudentItem from '../../../components/SearchPage/StudentItem';
import useSelfStudent from '../../../hooks/student';

const MeFollowing = () => {
  const { following } = useSelfStudent();
  useIonViewWillEnter(() => {
    hideTabBar();
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton className='ml-2' defaultHref="/community" text={""} />
          </IonButtons>
          <IonTitle>Your Following ({following?.length ?? "-"})</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {following?.map((klasmeyt) => (
            <StudentItem student={klasmeyt} key={klasmeyt.id} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default MeFollowing;