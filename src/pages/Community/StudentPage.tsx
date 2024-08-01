import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
  useIonRouter,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from "@ionic/react";

import { FC } from "react";
import MemberAvatarLarge from "../../components/Me/MemberAvatarLarge";
import { RouteComponentProps } from "react-router";
import { hideTabBar } from "../../utils/TabBar";
import useSession from "../../hooks/auth/useSession";
import useStudentFollowings from "../../hooks/student/useStudentFollowings";
import useStudentInfo from "../../hooks/student/useStudentInfo";
import useStudentGroups from "../../hooks/student/useStudentGroups";

type StudentPageProps = {
  student_id: string;
};

const StudentPage: FC<RouteComponentProps<StudentPageProps>> = ({ match }) => {
  useIonViewWillEnter(() => {
    hideTabBar();
  });

  const { session } = useSession();
  const rt = useIonRouter();
  const { data: groups } = useStudentGroups(match.params.student_id);
  const { data: student } = useStudentInfo(match.params.student_id);
  const { data: following } = useStudentFollowings(match.params.student_id);

  const handleFollowing = () => {
    rt.push(rt.routeInfo.pathname + "/following");
  };

  const handleGroups = () => {
    rt.push(rt.routeInfo.pathname + "/groups");
  };

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
          </IonToolbar>
        </IonHeader>
        <MemberAvatarLarge avatarUrl={student?.avatar_url} />
        <IonCard id="testCard" className="pt-16 rounded-xl  z-[-500] shadow-none mx-0">
          <IonCardContent>
            <IonGrid>
              <IonRow className="flex justify-center">
                <IonText color="dark">{student?.full_name ?? "-"}</IonText>
              </IonRow>
              <IonRow className="flex justify-center mt-1">
                <IonText className="text-sm capitalize" color="dark">
                  {student?.type ?? "-"}
                </IonText>
              </IonRow>
              <IonRow className="flex justify-center mt-2">
                <IonButton
                  shape="round"
                  size="small"
                  className="mx-1"
                  color="light"
                >
                  Direct Message
                </IonButton>
                <IonButton shape="round" size="small" className="mx-1">
                  Follow
                </IonButton>
              </IonRow>
              <IonRow className="text-center mt-2">
                <IonCol className="cursor-pointer" onClick={handleFollowing}>
                  <IonText className="text-2xl" color="dark">
                    {following?.length ?? "-"}
                  </IonText>
                  <br />
                  <IonText className="text-sm" color="dark">
                    following
                  </IonText>
                </IonCol>
                <IonCol className="cursor-pointer" onClick={handleGroups}>
                  <IonText className="text-2xl" color="dark">
                    {groups?.length ?? "-"}
                  </IonText>
                  <br />
                  <IonText className="text-sm" color="dark">
                    groups
                  </IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonCard id="testCard" className="mt-4 rounded-xl mx-0 shadow-none">
          <IonCardContent>
            <div>
              <IonText className="text-xs font-bold" color="dark">
                BIO
              </IonText>
              <br />
            </div>
            <div className="">
              <IonText className="text-sm" color="dark">
                {student?.description}
              </IonText>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default StudentPage;
