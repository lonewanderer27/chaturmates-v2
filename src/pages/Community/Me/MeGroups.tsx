import { IonBackButton, IonButton, IonButtons, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react'

import GroupItem from '../../../components/SearchPage/GroupItem';
import { SEARCH_CATEGORY } from '../../../enums/search';
import useSelfStudent from '../../../hooks/student';

const MeGroups = () => {
  const { groups } = useSelfStudent();

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