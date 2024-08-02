import "./GroupCard.css";

import {
  IonAvatar,
  IonBadge,
  IonCard,
  IonCol,
  IonIcon,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { peopleCircleOutline, personCircleOutline } from "ionicons/icons";
import { isValidUrl } from "../../utils/ValidUrl";
import { GroupMemberType, GroupType, StudentType } from "../../types";
import useAmIAMember from "../../hooks/group/useAmIAMember";

interface GT extends GroupType {
  group_members: GroupMemberType[];
}

interface GroupCardProps {
  group: GT;
  icon: string;
}

export default function GroupCard(props: GroupCardProps) {
  const rt = useIonRouter();
  const { data: amIAMember } = useAmIAMember(props.group.vanity_id);
  const handleView = () => {
    // check if user is a member of the group
    if (amIAMember && amIAMember.approved === false) {
      rt.push(
        "/" +
          rt.routeInfo.pathname.split("/")[1] +
          "/group/vu/" +
          props.group.vanity_id +
          "/preview",
        "forward",
        "push"
      );
      return;
    }

    rt.push(
      "/" +
        rt.routeInfo.pathname.split("/")[1] +
        "/group/vu/" +
        props.group.vanity_id,
      "forward",
      "push"
    );
  };

  return (
    <IonCol size="6" className="flex flex-column w-full cursor-pointer">
      <IonCard
        className="groupCard ion-padding ion-no-margin w-full font-poppins"
        onClick={handleView}
      >
        <IonRow>
          <IonAvatar>
            {props.group.avatar_url && isValidUrl(props.group.avatar_url) ? (
              <img className="groupCardAvatar" src={props.group.avatar_url} />
            ) : (
              <IonIcon className="groupCardIcon" src={props.icon}></IonIcon>
            )}
          </IonAvatar>
        </IonRow>
        <IonRow className="my-2">
          <IonText className="text-ellipsis font-semibold text-lg font-poppins truncate">
            {props.group.name}
          </IonText>
        </IonRow>
        <IonRow>
          {props.group.group_members.filter((s) => s.approved).length > 4 && (
            <>
              {props.group.group_members
                .filter((s) => s.approved)
                .slice(0, 4)
                .map((member, index) => {
                  if (member.avatar_url) {
                    return (
                      <IonAvatar
                        key={"avatar:" + index}
                        className="groupMemberAvatar"
                      >
                        <img src={member.avatar_url!} />
                      </IonAvatar>
                    );
                  } else {
                    return (
                      <IonIcon
                        key={"ionicon:members:" + index}
                        className="groupMemberIcon"
                        src={personCircleOutline}
                      ></IonIcon>
                    );
                  }
                })}
              <IonBadge color="light" className="groupCountBadge">
                <IonText>
                  +
                  {props.group.group_members.filter((s) => s.approved).length -
                    4}
                </IonText>
              </IonBadge>
            </>
          )}
          {props.group.group_members.filter((s) => s.approved).length <= 4 && (
            <>
              {props.group.group_members
                .filter((s) => s.approved)
                .map((member, index) => {
                  if (member.avatar_url) {
                    return (
                      <IonAvatar
                        key={"avatar:" + index}
                        className="groupMemberAvatar"
                      >
                        <img src={member.avatar_url} />
                      </IonAvatar>
                    );
                  } else {
                    return (
                      <IonIcon
                        key={"ionicon:members:" + index}
                        className="groupMemberIcon"
                        src={personCircleOutline}
                      ></IonIcon>
                    );
                  }
                })}
            </>
          )}
        </IonRow>
      </IonCard>
    </IonCol>
  );
}

GroupCard.defaultProps = {
  icon: peopleCircleOutline,
};
