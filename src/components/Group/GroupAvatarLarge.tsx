import { IonIcon, IonRow } from "@ionic/react";
import { peopleCircleOutline } from "ionicons/icons";
import { isValidUrl } from "../../utils/ValidUrl";

const GroupAvatarLarge = (props: { avatarUrl: string | null | undefined }) => {
  return (
    <IonRow className="justify-center mb-[-80px] z-[500]">
      {props.avatarUrl && isValidUrl(props.avatarUrl) ? (
        <>
          <div>
            <img className="w-32 object-cover rounded-full aspect-square" src={props.avatarUrl} />
          </div>
        </>
      ) : (
        <>
          <div className="flex rounded-full p-[0.5] bg-white">
            <IonIcon className="text-9xl" src={peopleCircleOutline} />
          </div>
        </>
      )}
    </IonRow>
  );
};

export default GroupAvatarLarge;
