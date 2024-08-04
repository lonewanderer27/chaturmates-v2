import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonThumbnail,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";

import { FC, useMemo } from "react";
import { RouteComponentProps } from "react-router";
import useGroupMemsCount from "../../hooks/group/useGroupMemsCount";
import useGroupInfoLite from "../../hooks/group/useGroupInfoLite";
import {
  chatboxOutline,
  chatbubbleOutline,
  informationCircleOutline,
  informationOutline,
  listOutline,
  peopleCircleOutline,
  peopleOutline,
  personOutline,
  shareOutline,
  shareSocialOutline,
} from "ionicons/icons";
import useProtect from "../../hooks/group/useProtect";
import useAmIAMember from "../../hooks/group/useAmIAMember";

type GroupTimelinePageProps = {
  vanity_url: string;
};

const GroupTimeline: FC<RouteComponentProps<GroupTimelinePageProps>> = ({
  match,
}) => {
  const { data: infoLite } = useGroupInfoLite(match.params.vanity_url);
  const { data } = useGroupMemsCount(match.params.vanity_url);

  const isValidUrl = useMemo(() => {
    try {
      new URL(infoLite!.avatar_url + "");
      return true;
    } catch (_) {
      return false;
    }
  }, [infoLite?.avatar_url]);

  const rt = useIonRouter();
  const handleMembers = () => {
    rt.push(rt.routeInfo.pathname + "/members");
  };
  const handleInfo = () => {
    rt.push(rt.routeInfo.pathname + "/info");
  }

  useProtect(match.params.vanity_url);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/community" text="" />
            </IonButtons>
            {/* <IonButtons slot="end">
              <IonButton>
                <IonIcon icon={shareSocialOutline} />
              </IonButton>
            </IonButtons> */}
          </IonToolbar>
        </IonHeader>
        <IonItem lines="none" className="mx-[-10px]">
          {infoLite?.avatar_url && isValidUrl ? (
            <IonThumbnail slot="start">
              <img src={infoLite?.avatar_url!} className="rounded-full" />
            </IonThumbnail>
          ) : (
            <IonIcon
              slot="start"
              icon={peopleCircleOutline}
              className="text-6xl"
            />
          )}
          <IonLabel>
            <h3 className="font-semibold">
              <IonIcon src={peopleOutline} /> {data}
            </h3>
            <h1 className="font-bold">{infoLite?.name}</h1>
          </IonLabel>
        </IonItem>
        <div className="my-3">
          {/* <IonChip>
            <IonIcon icon={chatbubbleOutline} />
            <IonLabel>Chat</IonLabel>
          </IonChip> */}
          <IonChip onClick={handleMembers}>
            <IonIcon icon={peopleOutline} />
            <IonLabel>Members</IonLabel>
          </IonChip>
          {/* <IonChip>
            <IonIcon icon={listOutline} />
            <IonLabel>Rules</IonLabel>
          </IonChip> */}
          <IonChip onClick={handleInfo}>
            <IonIcon icon={informationOutline} />
            <IonLabel>About</IonLabel>
          </IonChip>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GroupTimeline;
