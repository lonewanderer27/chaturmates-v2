import "./GroupItem.css";

import {
  IonAvatar,
  IonButton,
  IonCol,
  IonIcon,
  IonItem,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import ItemListButton from "../ItemListButton";
import { peopleCircleOutline } from "ionicons/icons";
import { useMemo } from "react";
import useSelfStudent from "../../hooks/student";
import { GroupType } from "../../types";

export default function GroupItem(props: {
  group: GroupType;
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

  function handleView() {
    // get the main pathname like /discover
    const mainPathname = rt.routeInfo.pathname.split("/")[1];
    rt.push("/"+mainPathname + "/group/vu/" + props.group.vanity_id);
  }

  function handleJoin() {
    // TODO: Join functionality
  }

  return (
    <IonItem lines="inset" onClick={handleView} className="cursor-pointer">
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
      <IonRow className="ion-align-items-center ml-[-5px]">
        <IonCol>
          <IonText className="groupName truncate font-poppins">
            {props.group.name}
          </IonText>
          {/* <br />
          <IonText className="groupCount text-sm" color="medium">
            {props.group.group_members.length} Members
          </IonText> */}
        </IonCol>
      </IonRow>
      {props.hideButton === false && <>
        {/* Only show join button if group is not found in the groups array */}
      {groups && groups.find((group) => group.id === props.group.id) ? (
        <ItemListButton buttonLabel={"Visit"} />
      ) : (
        <ItemListButton buttonLabel={props.buttonLabel} onClick={handleJoin} />
      )}
      </>}
    </IonItem>
  );
}

GroupItem.defaultProps = {
  icon: peopleCircleOutline,
  buttonLabel: "Join",
};
