import { IonIcon, IonRow } from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import { isValidUrl } from "../../utils/ValidUrl";
import { useToggleTheme } from "../../hooks/useToggleTheme";

const MemberAvatarLarge = (props: { avatarUrl: string | null | undefined }) => {
  const [darkMode] = useToggleTheme('darkModeActivated', 'ion-palette-dark');

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
          <div className={`flex rounded-full p-[0.5]`}>
            <IonIcon 
              className="text-9xl" 
              src={personCircleOutline} 
              style={{
                color: darkMode ? 'var(--ion-color-light-tint)' : 'var(--ion-color-dark-tint)',
                backgroundColor: darkMode ? 'var(--ion-color-dark-tint)' : 'var(--ion-color-light-tint)',
                borderRadius: "100%"
              }}
            />
          </div>
        </>
      )}
    </IonRow>
  );
};

export default MemberAvatarLarge;
