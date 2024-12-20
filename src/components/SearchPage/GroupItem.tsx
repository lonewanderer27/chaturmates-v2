import "./GroupItem.css";

import {
  IonAvatar,
  IonButton,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import ItemListButton from "../ItemListButton";
import { peopleCircleOutline } from "ionicons/icons";
import { useMemo } from "react";
import useSelfStudent from "../../hooks/student";
import { GroupType } from "../../types";
import useAmIAMember from "../../hooks/group/useAmIAMember";
import { ExpandedGroupMemberType } from "../../services/groups";

export default function GroupItem(props: {
  group: GroupType & {
    memberCount?: number;
    group_members: ExpandedGroupMemberType[];
  };
  icon?: string;
  buttonLabel?: string;
  hideButton?: boolean;
}) {
  const rt = useIonRouter();
  const { groups } = useSelfStudent();

  const isValidUrl = useMemo(() => {
    try {
      new URL(props.group.avatar_url + "");
      return true;
    } catch (_) {
      return false;
    }
  }, [props.group.avatar_url]);

  const { data: amIAMember } = useAmIAMember(props.group.vanity_id);
  function handleView() {
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

    // get the main pathname like /discover
    const mainPathname = rt.routeInfo.pathname.split("/")[1];
    rt.push("/" + mainPathname + "/group/vu/" + props.group.vanity_id);
  }

  function handleJoin() {
    // TODO: Join functionality
  }

  console.log("groupitem: group_members", props.group.group_members);

  return (
    <IonItem lines="full" onClick={handleView} className="cursor-pointer">
      {props.group.avatar_url && isValidUrl ? (
        <IonAvatar slot="start" className="mr-3 groupItemLogo ">
          <img className="groupItemLogo" src={props.group.avatar_url} />
        </IonAvatar>
      ) : (
        <IonIcon
          className="groupItemIcon mr-1 ml-[-5px]"
          slot="start"
          icon={props.icon}
        ></IonIcon>
      )}
      <IonLabel>
        <h2 className="truncate">{props.group.name}</h2>
        <p className="groupType text-sm mt-[-30px]" color="medium">
          {props.group.approx_members_count} Members
        </p>
      </IonLabel>
      
    </IonItem>
  );
}

GroupItem.defaultProps = {
  icon: peopleCircleOutline,
  buttonLabel: "Join",
};
