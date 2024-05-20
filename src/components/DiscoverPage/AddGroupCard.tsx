import { IonCard, IonCol, IonIcon, IonLabel, useIonRouter } from "@ionic/react";

import { addCircleOutline } from "ionicons/icons";

export default function AddGroupCard() {
  const rt = useIonRouter()
  function handleClick() {
    rt.push("/" + rt.routeInfo.pathname.split("/")[1] + "/group/create/p1");
  }

  return (
    <IonCol size="6" className="flex flex-column w-full cursor-pointer">
      <IonCard
        className="groupCard ion-padding ion-no-margin w-full flex flex-col  align-items-center justify-center text-center"
        onClick={handleClick}
      >
        <IonIcon className="text-5xl mx-auto" src={addCircleOutline}></IonIcon>
        <IonLabel className="my-2 text-lg font-poppins font-medium">New Group</IonLabel>
      </IonCard>
    </IonCol>
  );
}
