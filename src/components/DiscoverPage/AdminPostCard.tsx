import { useState } from "react";
import { GroupPostType, GroupType } from "../../types";
import { IonCard, IonImg, IonSkeletonText, useIonRouter } from "@ionic/react";

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

  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  return (
    <IonCard onClick={handleClick}>
      <IonImg src={props.post?.image_url + ""} onIonImgDidLoad={() => setHasImageLoaded(true)} />
      <IonSkeletonText animated className="h-[225px] w-full my-[-2px]" style={{ display: hasImageLoaded ? "none" : "block" }} />
    </IonCard>
  );
};

export default AdminPostCard;
