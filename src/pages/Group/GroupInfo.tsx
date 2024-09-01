import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { FC, useState } from "react";
import { RouteComponentProps } from "react-router";
import useGroupMemsCount from "../../hooks/group/useGroupMemsCount";
import useGroupInfoLite from "../../hooks/group/useGroupInfoLite";
import { Share } from '@capacitor/share';
import MemberAvatarLarge from "../../components/Me/MemberAvatarLarge";
import { peopleOutline, shareSocialOutline } from "ionicons/icons";
import useAmIAdmin from "../../hooks/group/useAmIAdmin";
import dayjs from "dayjs";
import useAmIAMember from "../../hooks/group/useAmIAMember";
import GroupPreview from "./GroupPreview";
import useGroupRules from "../../hooks/group/useGroupRules";
import { hideTabBar } from "../../utils/TabBar";

type GroupInfoPageProps = {
  vanity_url: string;
};

const GroupInfo: FC<RouteComponentProps<GroupInfoPageProps>> = (p) => {
  const { data: infoLite } = useGroupInfoLite(p.match.params.vanity_url);
  const { data: AmIAdmin, isLoading: AmIAdminLoading } = useAmIAdmin(p.match.params.vanity_url);
  const { data: groupRules } = useGroupRules(p.match.params.vanity_url);

  const rt = useIonRouter();

  const handleShare = async () => {
    await Share.share({
      title: 'Share Group',
      text: 'Check out this group in Chat-Ur-Meyts App!',
      url: window.location.href,
      dialogTitle: 'Share Group'
    });
  };

  const handleMembers = () => {
    rt.push(
      "/" +
      rt.routeInfo.pathname.split("/")[1] +
      "/group/vu/" +
      p.match.params.vanity_url +
      "/members",
      "forward",
      "push"
    );
  };

  const handlePendingMembers = () => {
    rt.push(
      "/" +
      rt.routeInfo.pathname.split("/")[1] +
      "/group/vu/" +
      p.match.params.vanity_url +
      "/members/pending",
      "forward",
      "push"
    );
  };

  const AIM = useAmIAMember(p.match.params.vanity_url);
  if (AIM.isLoading) {
    return <IonLoading isOpen={true} />;
  }

  if (AIM.isLoading === false) {
    if (AIM.data === null || AIM.data?.approved === false) {
      return <GroupPreview {...p} />;
    }
  }

  const [showAllRules, setShowAllRules] = useState(false);
  const displayedRules = groupRules ? (showAllRules ? groupRules : groupRules.slice(0, 3)) : [];

  useIonViewWillEnter(() => {
    hideTabBar();
  });

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton
                defaultHref={"/" + rt.routeInfo.pushedByRoute}
                text=""
              />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={handleShare}>
                <IonIcon icon={shareSocialOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <MemberAvatarLarge avatarUrl={infoLite?.avatar_url} />
        <IonCard className="pt-16 mx-0 bg-slate-200  z-[-500] shadow-none">
          <IonCardContent>
            <IonGrid>
              <IonRow className="flex justify-center">
                <IonText color="dark">{infoLite?.name ?? "-"}</IonText>
              </IonRow>
              <IonRow className="pt-[10px] flex justify-center">
                <IonChip onClick={handleMembers}>
                  <IonIcon icon={peopleOutline} />
                  <IonLabel>Members</IonLabel>
                </IonChip>
                {AmIAdminLoading === false && AmIAdmin ? (
                  <IonChip onClick={handlePendingMembers}>
                    <IonIcon icon={peopleOutline} />
                    <IonLabel>Pending</IonLabel>
                  </IonChip>
                ) : null}
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonList className="rounded-xl px-1 mt-4" lines="none">
          <IonListHeader>
            <IonLabel className="uppercase text-xs">CREATED ON</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonText className="text-sm">
              {dayjs(infoLite?.created_at).format("MMMM D, YYYY")}
            </IonText>
          </IonItem>
        </IonList>
        <IonList className="rounded-xl px-1 mt-4 ion-padding-bottom" lines="none">
          <IonListHeader>
            <IonLabel className="uppercase text-xs">DESCRIPTION</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel>
              <h3>{infoLite?.description}</h3>
            </IonLabel>
          </IonItem>
        </IonList>
        <IonList className="rounded-xl px-1 mt-4" color="light">
          <IonListHeader>
            <IonLabel className="uppercase text-xs">RULES</IonLabel>
            {groupRules && groupRules.length > 3 && (
              <IonButton size="small" onClick={() => setShowAllRules(!showAllRules)}>
                {showAllRules ? "Show Less" : "See All"}
              </IonButton>
            )}
          </IonListHeader>
          {displayedRules.map((rule, i) => (
            <IonItem key={i}>
              <IonLabel>
                <h3>{rule.title}</h3>
                <p>{rule.description}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default GroupInfo;