import "./GroupCard.css";
import { Avatar } from "flowbite-react";
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
        <Avatar.Group>
          {props.group.group_members.map((m, i) => {
            if (isValidUrl(m.avatar_url + "")) {
              return (
                <Avatar size={"xs"} img={m.avatar_url!} rounded stacked key={i} />
              )
            } else {
              return (
                <Avatar size={"xs"} rounded stacked key={i} />
              )
            }
          })}
          {approvedMembers.length > 4 && (
            <Avatar.Counter className="h-7 w-7" total={approvedMembers.length - 4} />
          )}
        </Avatar.Group>
      </IonCard>
    </IonCol>
  );
}

GroupCard.defaultProps = {
  icon: peopleCircleOutline,
};
