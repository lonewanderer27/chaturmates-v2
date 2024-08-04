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
  IonLabel,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { FC } from "react";
import { RouteComponentProps } from "react-router";
import useGroupMemsCount from "../../hooks/group/useGroupMemsCount";
import useGroupInfoLite from "../../hooks/group/useGroupInfoLite";
import useProtect from "../../hooks/group/useProtect";
import { Share } from '@capacitor/share';
import MemberAvatarLarge from "../../components/Me/MemberAvatarLarge";
import { peopleOutline, shareSocialOutline } from "ionicons/icons";
import useAmIAdmin from "../../hooks/group/useAmIAdmin";

type GroupInfoPageProps = {
  vanity_url: string;
};

const GroupInfo: FC<RouteComponentProps<GroupInfoPageProps>> = ({ match }) => {
  const { data: infoLite } = useGroupInfoLite(match.params.vanity_url);
  const { data: AmIAdmin, isLoading: AmIAdminLoading } = useAmIAdmin(match.params.vanity_url);
  useProtect(match.params.vanity_url);

  const rt = useIonRouter();
  const handleShare = async () => {
    // msg: check out this group
    // share the page url based on this page
    // share the group name
    await Share.share({
      title: 'Share Group',
      text: 'Check out this group in Chat-Ur-Meyts App!',
      url: window.location.href,
      dialogTitle: 'Share Group'
    })
  }
  const handleMembers = () => {
    rt.push(
      "/" +
      rt.routeInfo.pathname.split("/")[1] +
      "/group/vu/" +
      match.params.vanity_url +
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
      match.params.vanity_url +
      "/members/pending",
      "forward",
      "push"
    );
  };

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
                    <IonLabel>Pending Members</IonLabel>
                  </IonChip>
                ) : null}
              </IonRow>
              {/* <IonRow className="flex justify-center mt-2">
                <IonButton
                  shape="round"
                  size="small"
                  className="mx-1"
                  color="light"
                  onClick={handleMembers}
                >
                  Members
                </IonButton>
                {PRLoading === false && pendingRequest ? (
                  <IonButton
                    shape="round"
                    size="small"
                    className="mx-1"
                    onClick={cancelPendingRequest}
                  >
                    {joining ? <IonSpinner name="dots" /> : "Cancel Request"}
                  </IonButton>
                ) : (
                  <IonButton
                    shape="round"
                    size="small"
                    className="mx-1"
                    onClick={() => {
                      if (PRLoading) return;
                      toggleJoin();
                    }}
                  >
                    {PRLoading || joining ? (
                      <IonSpinner name="dots" />
                    ) : (
                      "Request to Join"
                    )}
                  </IonButton>
                )}
              </IonRow> */}
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonCard className="mt-4 mx-0 rounded-xl bg-slate-200 shadow-none">
          <IonCardContent>
            <div>
              <IonText className="text-xs font-bold" color="dark">
                DESCRIPTION
              </IonText>
              <br />
            </div>
            <div className="">
              <IonText className="text-sm" color="dark">
                {infoLite?.description}
              </IonText>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default GroupInfo;
