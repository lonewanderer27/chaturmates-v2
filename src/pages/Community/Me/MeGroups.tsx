import { IonBackButton, IonButtons, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import { hideTabBar } from '../../../utils/TabBar';

import GroupItem from '../../../components/SearchPage/GroupItem';
import useSelfStudent from '../../../hooks/student';
import { FC } from 'react';
import { RouteComponentProps } from 'react-router';

const MeGroups: FC<RouteComponentProps> = () => {
  const { groups } = useSelfStudent();
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
          <IonTitle>Your Groups ({groups?.length ?? "-"})</IonTitle>
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

export default MeGroups;