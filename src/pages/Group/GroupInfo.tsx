import {
  IonBackButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { FC } from "react";
import { RouteComponentProps } from "react-router";
import useGroupMemsCount from "../../hooks/group/useGroupMemsCount";
import useGroupInfoLite from "../../hooks/group/useGroupInfoLite";
import useProtect from "../../hooks/group/useProtect";
import useAmIAMember from "../../hooks/group/useAmIAMember";

type GroupInfoPageProps = {
  vanity_url: string;
};

const GroupInfo: FC<RouteComponentProps<GroupInfoPageProps>> = ({ match }) => {
  const { data: membersCount } = useGroupMemsCount(match.params.vanity_url);
  useProtect(match.params.vanity_url);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton defaultHref="/community" text="" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonChip>
          <IonLabel>Chat</IonLabel>
        </IonChip>
        <IonChip>
          <IonLabel>{membersCount!} Members</IonLabel>
        </IonChip>
        <IonChip>
          <IonLabel>About</IonLabel>
        </IonChip>
      </IonContent>
    </IonPage>
  );
};

export default GroupInfo;
