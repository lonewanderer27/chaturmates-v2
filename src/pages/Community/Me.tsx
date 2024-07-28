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
  useIonViewWillEnter,
} from "@ionic/react";
import { hideTabBar, showTabBar } from "../../utils/TabBar";

import { FC } from "react";
import MemberAvatarLarge from "../../components/Me/MemberAvatarLarge";
import { RouteComponentProps } from "react-router";
import useSelfStudent from "../../hooks/student";
import useSession from "../../hooks/auth/useSession";

const Me: FC<RouteComponentProps> = ({ match }) => {
  const { session } = useSession();
  const rt = useIonRouter();
  const {
    student,
    profile,
    groups,
    school,
    academic_year,
    following,
    followers,
  } = useSelfStudent();

  const handleFollowing = () => {
    rt.push(rt.routeInfo.pathname + "/following");
  };

  const handleGroups = () => {
    rt.push(rt.routeInfo.pathname + "/groups");
  };

  const handleUpdate = () => {
    rt.push(rt.routeInfo.pathname + "/update");
  };

  useIonViewWillEnter(() => {
    hideTabBar();
  })

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
        <IonCard className="pt-16 mx-0 bg-slate-200  z-[-500] shadow-none">
          <IonCardContent>
            <IonGrid>
              <IonRow className="flex justify-end mt-[-70px] pb-4 z-[1000]">
                <IonButton size="small" onClick={handleUpdate}>
                  Edit
                </IonButton>
              </IonRow>
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
        <IonCard className="mt-4 mx-0 rounded-xl bg-slate-200 shadow-none">
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

export default Me;
