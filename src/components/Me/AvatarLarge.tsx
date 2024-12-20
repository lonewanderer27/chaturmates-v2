import { IonIcon } from "@ionic/react";
import { peopleCircleOutline, personCircleOutline } from "ionicons/icons";
import { isValidUrl } from "../../utils/ValidUrl";
import { useToggleTheme } from "../../hooks/useToggleTheme";

const AvatarLarge = (props: { 
  avatarUrl: string | null | undefined,
  avatarIcon?: string,
}) => {
  const [darkMode] = useToggleTheme('darkModeActivated', 'ion-palette-dark');

  return (
    <>
      {props.avatarUrl && isValidUrl(props.avatarUrl) ? (
        <>
          <div>
            <img className="w-32 object-cover rounded-full aspect-square shadow-lg" src={props.avatarUrl} />
          </div>
        </>
      ) : (
        <>
          <div className={`flex rounded-full p-[0.5] shadow-lg`}>
            <IonIcon 
              className="text-9xl" 
              src={props.avatarIcon} 
              style={{
                color: darkMode ? 'var(--ion-color-light-tint)' : 'var(--ion-color-dark-tint)',
                backgroundColor: darkMode ? 'var(--ion-color-dark-tint)' : 'var(--ion-color-light-tint)',
                borderRadius: "100%"
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

AvatarLarge.defaultProps = {
  avatarIcon: personCircleOutline,
}

export default AvatarLarge;
