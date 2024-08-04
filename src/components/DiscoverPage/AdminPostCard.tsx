import { GroupPostType, GroupType } from "../../types";
import { IonCard, useIonRouter } from "@ionic/react";

const AdminPostCard = (props: {
  group?: GroupType;
  post?: GroupPostType;
  icon?: string;
}) => {
  const rt = useIonRouter();

  const handleClick = () => {
    console.log("clicked");
    rt.push(
      `/${rt.routeInfo.pathname.split("/")[1]}/group/vu/${props.group?.vanity_id}/post/${props.post?.id}`,
      "forward",
      "replace"
    );
  };

  return (
    <IonCard onClick={handleClick}>
      <img src={props.post?.image_url!} />
    </IonCard>
  );
};

export default AdminPostCard;
