import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
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
import useGroupMemsCount from "../../../hooks/group/useGroupMemsCount";
import { shareOutline } from "ionicons/icons";
import useSelfStudent from "../../../hooks/student";

type GroupMembersPageProps = {
  vanity_url: string;
};

const GroupMembers: FC<RouteComponentProps<GroupMembersPageProps>> = ({
  match,
}) => {
  const { student: meStudent } = useSelfStudent();
  const { data } = useGroupMembers(match.params.vanity_url, true);
  const { data: count } = useGroupMemsCount(match.params.vanity_url);

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
          <IonTitle>Group Members ({count})</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {data?.map((member) => {
            const klasmeyt = member.students;
            if (klasmeyt!.id === meStudent!.id) {
              return <StudentItem student={klasmeyt!} key={klasmeyt!.id} me />;
            }
            return <StudentItem student={klasmeyt!} key={klasmeyt!.id} />;
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default GroupMembers;
