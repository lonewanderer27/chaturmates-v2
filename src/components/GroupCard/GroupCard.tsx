import "./GroupCard.css";
import {
  IonAvatar,
  IonBadge,
  IonCard,
  IonCol,
  IonIcon,
  IonImg,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { peopleCircleOutline, personCircleOutline } from "ionicons/icons";
import { isValidUrl } from "../../utils/ValidUrl";
import { GroupMemberType, GroupType, StudentType } from "../../types";
import useAmIAMember from "../../hooks/group/useAmIAMember";
import { useEffect, useMemo, useState } from "react";

interface GT extends GroupType {
  group_members: GroupMemberType[];
}

interface GroupCardProps {
  group: GT;
  icon: string;
}

export default function GroupCard(props: GroupCardProps) {
  const rt = useIonRouter();
  const handleView = () => {
    rt.push(
      "/" +
      rt.routeInfo.pathname.split("/")[1] +
      "/group/vu/" +
      props.group.vanity_id,
      "forward",
      "push"
    );
  };

  const [approvedMembers, setApprovedMembers] = useState<GroupMemberType[]>([]);
  useEffect(() => {
    setApprovedMembers(
      props.group.group_members.filter((m) => m.approved === true)
    );
  }, [props.group.group_members]);

  return (
    <IonCol size="6" className="flex flex-column w-full cursor-pointer">
      <IonCard
        className="groupCard ion-padding ion-no-margin w-full font-poppins"
        onClick={handleView}
      >
        <IonRow>
          <IonAvatar>
            {props.group.avatar_url && isValidUrl(props.group.avatar_url) ? (
              <img className="groupCardAvatar aspect-square" src={props.group.avatar_url} />
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
        <div className="avatar-group -space-x-3 rtl:space-x-reverse ml-[-2px]">
          {approvedMembers.map((m, i) => {
            if (i <= 5)
              return (
                <div className="avatar">
                  <div className="w-6 h-auto">
                    {isValidUrl(m.avatar_url + "") ? (
                      <img src={m.avatar_url + ""} />
                    ) : (
                      <IonIcon className="text-3xl m-[-3px]" icon={personCircleOutline} />
                    )}
                  </div>
                </div>
              )
          })}
          {approvedMembers.length > 6 && <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-6 h-auto">
              <IonText>
                <span>+{approvedMembers.length - 6}</span>
              </IonText>
            </div>
          </div>}
        </div>
      </IonCard>
    </IonCol>
  );
}

GroupCard.defaultProps = {
  icon: peopleCircleOutline,
};
