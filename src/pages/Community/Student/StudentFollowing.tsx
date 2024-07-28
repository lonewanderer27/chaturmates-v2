import { IonBackButton, IonButton, IonButtons, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import { hideTabBar, showTabBar } from '../../../utils/TabBar';
import useSelfStudent, { useFindStudentById } from '../../../hooks/student';

import { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import StudentItem from '../../../components/SearchPage/StudentItem';

const StudentFollowing: FC<RouteComponentProps> = ({ match }: { match: { params: { student_id: string } } }) => {
  const { following } = useFindStudentById(match.params.student_id);
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
          <IonTitle>Their Following ({following?.length ?? "-"})</IonTitle>
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

export default StudentFollowing;