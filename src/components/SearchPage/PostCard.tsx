import { GroupPostType, GroupType } from "../../types";
import {
  IonCard,
  IonCol,
  IonIcon,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";

import { ComponentProps } from "react";
import { personCircleOutline } from "ionicons/icons";

type IonCardProps = ComponentProps<typeof IonCard>;

export default function PostCard(props: IonCardProps & {
  group?: GroupType;
  post?: GroupPostType;
  icon?: string;
}) {
  const rt = useIonRouter();
  const handleClick = () => {
    // get the main pathname like /discover
    const mainPathname = rt.routeInfo.pathname.split("/")[1];
    console.log(mainPathname)
    console.log("props.group: "+props.group)
    rt.push(`/${mainPathname}/group/vu/${props.group?.vanity_id}/post/${props.post?.id}`);
  };

  return (
    <IonCard
      className="studentCard ion-padding m-2 font-poppins"
      onClick={handleClick}
    >
      <IonRow>
        <IonCol size="1">
          <IonIcon
            className="postIcon ml-[-10px] text-3xl"
            src={props.icon}
          ></IonIcon>
        </IonCol>
        <IonCol className="flex ml-[10px] content-center">
          <IonText>
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
