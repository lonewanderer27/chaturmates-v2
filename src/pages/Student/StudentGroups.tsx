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
import GroupItem from "../../components/SearchPage/GroupItem";
import { RouteComponentProps } from "react-router";
import { hideTabBar } from "../../utils/TabBar";
import useStudentGroups from "../../hooks/student/useStudentGroups";
import useStudentInfo from "../../hooks/student/useStudentInfo";

type StudentGroupsPageProps = {
  student_id: string;
};

const StudentGroups: FC<RouteComponentProps<StudentGroupsPageProps>> = ({
  match,
}) => {
  const { data: student } = useStudentInfo(match.params.student_id);
  const { data: groups } = useStudentGroups(match.params.student_id);
  useIonViewWillEnter(() => {
    hideTabBar();
  });

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
            <IonTitle>{student?.full_name?.split(" ")[0] ?? "Their"} Groups ({groups?.length ?? "-"})</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList className="mx-[-15px]">
          {groups?.map((group) => <GroupItem group={group} key={group.id} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default StudentGroups;
