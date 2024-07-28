import { IonBackButton, IonButton, IonButtons, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import { hideTabBar, showTabBar } from '../../../utils/TabBar';
import useSelfStudent, { useFindStudentById } from '../../../hooks/student';

import { FC } from 'react';
import GroupItem from '../../../components/SearchPage/GroupItem';
import { RouteComponentProps } from 'react-router';
import { SEARCH_CATEGORY } from '../../../enums/search';

const StudentGroups: FC<RouteComponentProps> = ({ match }: { match: { params: { student_id: string } } }) => {
  const { groups } = useFindStudentById(match.params.student_id);
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