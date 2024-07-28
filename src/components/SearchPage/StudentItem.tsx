import "./StudentItem.css";

import { IonAvatar, IonCol, IonIcon, IonItem, IonRow, IonText, useIonRouter, } from "@ionic/react";
import { mail, personCircleOutline } from "ionicons/icons";

import ItemListButton from "../ItemListButton";
import S from "string";
import { StudentType } from "../../types";
import { useMemo } from "react";

export default function StudentItem(props: {
  student: StudentType;
  icon?: string;
  showType?: boolean;
  showBtn?: boolean;
  buttonLabel?: string;
  buttonIcon?: string;
}) {
  const rt = useIonRouter();
  const isValidUrl = useMemo(() => {
    try {
      new URL(props.student.avatar_url + "");
      return true;
    } catch (_) {
      return false;
    }
  }, [props.student.avatar_url]);
  
  function handleClick() {
    // get the main pathname like /community
    const mainPathname = rt.routeInfo.pathname.split("/")[1];
    rt.push("/"+mainPathname+"/student/id/" + props.student.id);
  }

  return (
    <IonItem lines="inset" onClick={handleClick} className="cursor-pointer">
      {props?.student.avatar_url && isValidUrl ? (
        <IonAvatar slot="start" className="mr-3 studentItemLogo">
          <img className="studentItemLogo" src={props!.student.avatar_url} />
        </IonAvatar>
      ) : (
        <IonIcon
          className="studentItemIcon"
          slot="start"
          icon={props.icon}
        ></IonIcon>
      )}
      <IonRow className="ion-align-items-center ml-[-5px]">
        <IonCol>
          <IonText className="studentItemName truncate font-poppins">
            {props?.student.full_name}
          </IonText>
          {props.showType && (
            <IonText className="studentType text-sm mt-[-20px]" color="medium">
              <br />
              {S(props?.student.type + "").capitalize().s}
            </IonText>
          )}
        </IonCol>
      </IonRow>
    </IonItem>
  );
}

StudentItem.defaultProps = {
  icon: personCircleOutline,
  buttonLabel: "Message",
  buttonIcon: mail,
  showBtn: true,
  showType: true,
};
