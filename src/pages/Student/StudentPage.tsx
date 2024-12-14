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
  IonSpinner,
  IonText,
  IonToolbar,
  useIonRouter,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from "@ionic/react";

import { FC } from "react";
import AvatarLarge from "../../components/Me/AvatarLarge";
import { RouteComponentProps } from "react-router";
import { hideTabBar } from "../../utils/TabBar";
import useSession from "../../hooks/auth/useSession";
import useStudentFollowings from "../../hooks/student/useStudentFollowings";
import useStudentInfo from "../../hooks/student/useStudentInfo";
import useStudentGroups from "../../hooks/student/useStudentGroups";
import useFollow from "../../hooks/student/useFollow";

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
  const {
    data: follow,
    isLoading,
    requesToFollow,
    unfollow,
    loading,
  } = useFollow(match.params.student_id);

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
        <div className="flex justify-center mb-[-80px] z-[500]">
          <AvatarLarge avatarUrl={student?.avatar_url} />
        </div>
        <IonCard className="pt-16 rounded-xl  z-[-500]  mx-0">
          <IonCardContent>
            <IonGrid>
              <IonRow className="flex justify-center">
                <IonText color="dark">{student?.full_name ?? "-"}</IonText>
              </IonRow>
              <IonRow className="flex justify-center mt-1">
                <IonText className="text-sm capitalize" color="dark">
                  {student?.block ? student.block : "-"}
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
                {
                  <IonButton
                    shape="round"
                    size="small"
                    className="mx-1"
                    onClick={() => {
                      if (isLoading) return;
                      if (follow) {
                        unfollow();
                      } else {
                        requesToFollow();
                      }
                    }}
                  >
                    {loading || isLoading ? (
                      <IonSpinner name="dots" />
                    ) : follow ? (
                      <IonText color="light">Unfollow</IonText>
                    ) : (
                      <IonText color="light">Follow</IonText>
                    )}
                  </IonButton>
                }
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
        {student?.description && (
          <IonCard className="mt-4 rounded-xl  mx-0 ">
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
        )}
      </IonContent>
    </IonPage>
  );
};

export default StudentPage;
