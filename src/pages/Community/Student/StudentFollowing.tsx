import { IonBackButton, IonButtons, IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'

import { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import StudentItem from '../../../components/SearchPage/StudentItem';
import { hideTabBar } from '../../../utils/TabBar';
import useStudentFollowings from '../../../hooks/student/useStudentFollowings';

type StudentFollowingPageProps = {
  student_id: string
}

const StudentFollowing: FC<RouteComponentProps<StudentFollowingPageProps>> = ({ match }) => {
  const { data: following } = useStudentFollowings(match.params.student_id);
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