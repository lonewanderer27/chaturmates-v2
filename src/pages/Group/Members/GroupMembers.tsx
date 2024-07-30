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

type GroupMembersPageProps = {
  vanity_url: string;
};

const GroupMembers: FC<RouteComponentProps<GroupMembersPageProps>> = ({
  match,
}) => {
  const { data } = useGroupMembers(match.params.vanity_url, false);

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
              defaultHref="/community"
              text={""}
            />
          </IonButtons>
          <IonTitle>Group Members ({data?.length ?? "-"})</IonTitle>
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
  );
};

export default GroupMembers;
