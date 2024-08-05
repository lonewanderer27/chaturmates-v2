import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
  IonThumbnail,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";

import { FC, useMemo } from "react";
import { RouteComponentProps } from "react-router";
import useGroupMemsCount from "../../hooks/group/useGroupMemsCount";
import useGroupInfoLite from "../../hooks/group/useGroupInfoLite";
import {
  add,
  addCircle,
  addCircleOutline,
  addCircleSharp,
  chatboxOutline,
  chatbubbleOutline,
  ellipsisVerticalOutline,
  informationCircleOutline,
  informationOutline,
  listOutline,
  peopleCircleOutline,
  peopleOutline,
  personOutline,
  shareOutline,
  shareSocialOutline,
} from "ionicons/icons";
import useAmIAMember from "../../hooks/group/useAmIAMember";
import GroupPreview from "./GroupPreview";
import { hideTabBar } from "../../utils/TabBar";
import useGroupRules from "../../hooks/group/useGroupRules";
import GroupRules from "../../components/Group/GroupRules";

type GroupTimelinePageProps = {
  vanity_url: string;
};

const GroupTimeline: FC<RouteComponentProps<GroupTimelinePageProps>> = (p) => {
  const { data: infoLite } = useGroupInfoLite(p.match.params.vanity_url);
  const { data } = useGroupMemsCount(p.match.params.vanity_url);
  const { data: groupRules } = useGroupRules(p.match.params.vanity_url);
  useIonViewWillEnter(() => {
    hideTabBar();
  });

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

  const AIM = useAmIAMember(p.match.params.vanity_url);
  if (AIM.isLoading) {
    return <IonLoading isOpen={true} />;
  }

  if (AIM.isLoading === false) {
    if (AIM.data === null || AIM.data?.approved === false) {
      return <GroupPreview {...p} />
    }
  }

  const handleCreateNewPost = () => {
    rt.push(rt.routeInfo.pathname + "/new-post");
  }

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
        <IonItem lines="none" className="mx-[-15px]" color="light">
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
          <IonChip id="group_rules">
            <IonIcon icon={listOutline} />
            <IonLabel>Rules</IonLabel>
          </IonChip>
          <IonChip onClick={handleInfo}>
            <IonIcon icon={informationOutline} />
            <IonLabel>About</IonLabel>
          </IonChip>
          {/* <IonChip>
            <IonIcon className="ml-[-4px]" icon={ellipsisVerticalOutline} />
          </IonChip> */}
        </div>
        <GroupRules rules={groupRules ?? []} />
        <IonFab
          slot="fixed"
          vertical="bottom"
          horizontal="end"
          className="ion-padding"
          onClick={handleCreateNewPost}
        >
          <IonFabButton>
            <IonIcon src={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default GroupTimeline;
