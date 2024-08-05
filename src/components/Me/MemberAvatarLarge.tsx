import { IonAvatar, IonIcon, IonImg, IonRow } from "@ionic/react";
import { peopleCircle, person, personCircleOutline } from "ionicons/icons";
import { isValidUrl } from "../../utils/ValidUrl";

const MemberAvatarLarge = (props: { avatarUrl: string | null | undefined }) => {
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
            <IonIcon className="text-9xl" src={personCircleOutline} />
          </div>
        </>
      )}
    </IonRow>
  );
};

export default MemberAvatarLarge;
