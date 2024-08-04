import {
  IonCard,
  IonCol,
  IonIcon,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";

import { ComponentProps } from "react";
import { GroupPostTypeWGroupInfo } from "../../types/group/Post";
import { GroupType } from "../../types";
import { personCircleOutline } from "ionicons/icons";

type IonCardProps = ComponentProps<typeof IonCard>;

export default function PostCard(
  props: IonCardProps & {
    group?: GroupType;
    post?: GroupPostTypeWGroupInfo;
    icon?: string;
  }
) {
  const rt = useIonRouter();
  const handleClick = () => {
    // get the main pathname like /discover
    const mainPathname = rt.routeInfo.pathname.split("/")[1];
    console.log(mainPathname);
    console.log("props.group: " + props.group);
    rt.push(
      `/${mainPathname}/group/vu/${props.group?.vanity_id}/post/${props.post?.id}`
    );
  };

  return (
    <IonCard
      className="studentCard ion-padding m-2 font-poppins"
      onClick={handleClick}
    >
      <IonRow>
        {props.group?.admin_uni_group === false && <IonCol size="1">
          <IonIcon
            className="postIcon ml-[-10px] text-3xl"
            src={props.icon}
          ></IonIcon>
        </IonCol>}
        <IonCol className="flex content-center">
          <IonText className="ml-[-5px]">
            <span className="text-xl font-bold text-ellipsis line-clamp-1 my-auto">
              {props.group?.name ?? "Post"}
            </span>
          </IonText>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonText>
          <p className="line-clamp-3 font-medium">{props.post?.content}</p>
        </IonText>
      </IonRow>
    </IonCard>
  );
}

PostCard.defaultProps = {
  icon: personCircleOutline,
};
