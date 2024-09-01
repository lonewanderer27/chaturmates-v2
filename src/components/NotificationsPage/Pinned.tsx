import { IonList, IonReorderGroup } from "@ionic/react";

import GenericItem from "./GenericItem";
import { notifications } from "../../constants/notifications";
import { useState } from "react";

const ns = [
  notifications[7],
  notifications[8],
];

// TODO: 3.8 Allow users to customize the order of pinned announcements as per their preferences.

export default function Pinned() {
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
