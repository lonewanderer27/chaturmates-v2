import { IonBackButton, IonButtons, IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'

import { FC } from 'react';
import GroupItem from '../../../components/SearchPage/GroupItem';
import { RouteComponentProps } from 'react-router';
import { hideTabBar } from '../../../utils/TabBar';
import useStudentGroups from '../../../hooks/student/useStudentGroups';

type StudentGroupsPageProps = {
  student_id: string
}

const StudentGroups: FC<RouteComponentProps<StudentGroupsPageProps>> = ({ match }) => {
  const { data: groups } = useStudentGroups(match.params.student_id);
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
          <IonTitle>Their Groups ({groups?.length ?? "-"})</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {groups?.map((group) => (
            <GroupItem group={group} key={group.id} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default StudentGroups;