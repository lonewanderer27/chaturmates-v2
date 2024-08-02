import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";

import { FC } from "react";
import { RouteComponentProps } from "react-router";
import StudentItem from "../../../components/SearchPage/StudentItem";
import { hideTabBar } from "../../../utils/TabBar";
import useGroupMembers from "../../../hooks/group/useGroupMembers";
import useProtect from "../../../hooks/group/useProtect";

type GroupPendingMembersPageProps = {
  vanity_url: string;
};

const GroupPendingMembers: FC<
  RouteComponentProps<GroupPendingMembersPageProps>
> = ({ match }) => {
  const { data } = useGroupMembers(match.params.vanity_url, true);

  useIonViewWillEnter(() => {
    hideTabBar();
  });

  useProtect(match.params.vanity_url);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons>
              <IonBackButton
                className="ml-[-5px]"
                defaultHref="/community"
                text={""}
              />
            </IonButtons>
            <IonTitle>Pending Members ({data?.length ?? "-"})</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {data?.map((member) => {
            const klasmeyt = member.students;
            return <StudentItem student={klasmeyt!} key={klasmeyt!.id} />;
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default GroupPendingMembers;
