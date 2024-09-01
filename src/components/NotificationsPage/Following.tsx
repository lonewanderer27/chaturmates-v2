import { IonList, IonReorderGroup } from "@ionic/react";

import GenericItem from "./GenericItem";
import { notifications } from "../../constants/notifications";
import { useState } from "react";

const ns = [notifications[4], notifications[5], notifications[6]];

export default function Following() {
  const [nnns, setNotifications] = useState(() => ns);

  const handleRemove = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id + "" !== id));
  }

  return (
    <IonList lines="full">
      <IonReorderGroup>
        {nnns.map((notification) => (
          <GenericItem
            key={notification.id}
            id={notification.id + ""}
            title={notification.title}
            description={notification.description}
            date={notification.date}
            icon={notification.icon}
            buttons={notification.buttons}
            handleRemove={handleRemove}
          />
        ))}
      </IonReorderGroup>
    </IonList>
  );
}
