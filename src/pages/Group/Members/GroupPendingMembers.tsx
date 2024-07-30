import { IonBackButton, IonButtons, IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'

import { FC } from 'react'
import { RouteComponentProps } from 'react-router';
import StudentItem from '../../../components/SearchPage/StudentItem';
import { hideTabBar } from '../../../utils/TabBar';
import useGroupMembers from '../../../hooks/group/useGroupMembers';

type GroupPendingMembersPageProps = {
  vanity_url: string;
};

const GroupPendingMembers: FC<RouteComponentProps<GroupPendingMembersPageProps>> = ({
  match,
}) => {
  const { data } = useGroupMembers(match.params.vanity_url, true);

  useIonViewWillEnter(() => {
    hideTabBar();
  });
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton
              className="ml-2"
              defaultHref="/discover"
              text={""}
            />
          </IonButtons>
          <IonTitle>Pending Members ({data?.length ?? "-"})</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {data?.map((member) => {
            const klasmeyt = member.students;
            return <StudentItem student={klasmeyt!} key={klasmeyt!.id} />;
          })}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default GroupPendingMembers