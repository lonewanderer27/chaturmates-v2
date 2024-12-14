import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { hideTabBar } from "../../utils/TabBar";

import StudentItem from "../../components/SearchPage/StudentItem";
import useSelfStudent from "../../hooks/student";
import { FC } from "react";
import { RouteComponentProps } from "react-router";

const MeFollowing: FC<RouteComponentProps> = () => {
  const { following } = useSelfStudent();
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
            <IonTitle>Your Following ({following?.length ?? "-"})</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonList className="rounded-xl">
            {following?.map((klasmeyt) => (
              <StudentItem student={klasmeyt} key={klasmeyt.id} />
            ))}
          </IonList>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MeFollowing;
