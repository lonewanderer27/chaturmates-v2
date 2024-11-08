import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonChip,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
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
import { colorWandOutline, pencilOutline } from "ionicons/icons";
import useSelfGroups from "../../hooks/student/useSelfGroups";
import useSelfFollowing from "../../hooks/student/useSelfFollowing";
import { useToggleTheme } from "../../hooks/useToggleTheme";
import useSelfHobbies from "../../hooks/student/useSelfHobbies";
import useSelfSubjects from "../../hooks/student/useSelfSubjects";
import string from "string";

const Me: FC<RouteComponentProps> = ({ match }) => {
  const rt = useIonRouter();
  const { student } = useSelfStudent();
  const { hobbies } = useSelfHobbies();
  const { subjects } = useSelfSubjects();
  console.log("my hobbies: \n", hobbies);
  console.log("my subjects: \n", subjects);

  const { logout } = useSession();

  const { data: groups } = useSelfGroups();
  const { data: following } = useSelfFollowing();
  console.log("following", following);

  const handleFollowing = () => {
    rt.push(rt.routeInfo.pathname + "/following");
  };

  const handleGroups = () => {
    rt.push(rt.routeInfo.pathname + "/groups");
  };

  const handleUpdate = () => {
    rt.push(rt.routeInfo.pathname + "/update");
  };

  const handleRecommendation = () => {
    rt.push("/recommend");
  }

  useIonViewWillEnter(() => {
    hideTabBar();
  });

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/community" text={""} />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton fill="clear" onClick={handleRecommendation}>
                <IonIcon slot="start" src={colorWandOutline} />
              </IonButton>
              <IonButton fill="clear" onClick={handleUpdate}>
                {/* <IonIcon slot="start" src={pencilOutline} /> */}
                <IonLabel>Edit</IonLabel>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <MemberAvatarLarge avatarUrl={student?.avatar_url} />
        <IonCard className="pt-16 mx-0  z-[-500] shadow-none">
          <IonCardContent>
            <IonGrid>
              <IonRow className="flex justify-end mt-[-70px] pb-4 top-0 ">
                <IonButton size="small" className="invisible">
                  Edit
                </IonButton>
              </IonRow>
              <IonRow className="flex justify-center">
                <IonText color="dark">{student?.full_name ?? "-"}</IonText>
              </IonRow>
              <IonRow className="flex justify-center mt-1">
                <IonText className="text-sm capitalize" color="dark">
                  {student?.block ? student.block : "-"}
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
        {student?.description && (
          <IonCard className="mt-4 mx-0 rounded-xl shadow-none">
            <IonCardContent>
              {student?.description && (
                <>
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
                </>
              )}
            </IonCardContent>
          </IonCard>
        )}
        {subjects.length > 0 && (
          <IonCard className="mt-4 mx-0 rounded-xl shadow-none">
            <IonCardContent>
              <div className="mb-2">
                <IonText className="text-xs font-bold" color="dark">
                  SUBJECTS
                </IonText>
                <br />
              </div>
              <div className="mx-[-5px]">
                {subjects.map((subject) => (
                  <IonChip key={subject.id+subject.title} color="dark">
                    <IonText>
                      {string(subject.title.toLowerCase()).titleCase().s}
                    </IonText>
                  </IonChip>
                ))}
              </div>
            </IonCardContent>
          </IonCard>
        )}
        {hobbies.length > 0 && (
          <IonCard className="mt-4 mx-0 rounded-xl shadow-none">
            <IonCardContent>
              <div className="mb-2">
                <IonText className="text-xs font-bold" color="dark">
                  HOBBIES
                </IonText>
                <br />
              </div>
              <div className="mx-[-5px]">
                {hobbies.map((hobby) => (
                  <IonChip key={hobby.id+hobby.title} color="dark">
                    <IonText>
                      {hobby.title}
                    </IonText>
                  </IonChip>
                ))}
              </div>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
      <IonFooter>
        <IonToolbar className="p-2">
          <IonButton
            color="medium"
            onClick={logout}
            // shape="round"
            expand="block"
            fill="outline"
          >
            Logout
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Me;
