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
import { Route, RouteComponentProps } from "react-router";
import { hideTabBar, showTabBar } from "../../utils/TabBar";
import useSelfStudent, { useFindStudentById } from "../../hooks/student";

import { FC } from "react";
import MemberAvatarLarge from "../../components/Me/MemberAvatarLarge";
import useSession from "../../hooks/auth/useSession";
import useStudentSearch from "../../hooks/student/useStudentSearch";

const StudentPage: FC<RouteComponentProps> = ({ match }: { match: { params: { student_id: string } } }) => {
  useIonViewWillEnter(() => {
    hideTabBar();
  })

  const { session } = useSession();
  const rt = useIonRouter();
  const { student, followers, following, groups } = useFindStudentById(match.params.student_id);

  const handleFollowing = () => {
    rt.push("/community/student/id/" + match.params.student_id + "/following", "forward", "push", {
      
    });
  };

  const handleGroups = () => {
    rt.push(rt.routeInfo.pathname + "/groups");
  };

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
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <MemberAvatarLarge avatarUrl={student?.avatar_url} />
        <IonCard className="pt-16 bg-slate-200 rounded-xl  z-[-500] shadow-none mx-0">
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
              <IonRow className="text-center mt-2">
                <IonCol className="cursor-pointer" onClick={handleFollowing}>
                  <IonText className="text-2xl" color="dark">
                    {following?.length ?? "-"}
                  </IonText>
                  <br />
                  <IonText className="text-sm" color="dark">following</IonText>
                </IonCol>
                <IonCol className="cursor-pointer" onClick={handleGroups}>
                  <IonText className="text-2xl" color="dark">
                    {groups?.length ?? "-"}
                  </IonText>
                  <br />
                  <IonText className="text-sm" color="dark">groups</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonCard className="mt-4 rounded-xl bg-slate-200 mx-0 shadow-none">
          <IonCardContent>
            <div>
              <IonText className="text-xs font-bold" color="dark">BIO</IonText>
              <br />
            </div>
            <div className="">
              <IonText className="text-sm" color="dark">{student?.description}</IonText>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default StudentPage;
