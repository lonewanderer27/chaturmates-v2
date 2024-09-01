import { IonList, IonReorderGroup } from "@ionic/react";
import { memo, useState } from "react";

import GenericItem from "./GenericItem";
import { notifications } from "../../constants/notifications";

function All() {
  const [nnns, setNotifications] = useState(() => notifications);

  const handleRemove = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id + "" !== id));
  };

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

export default memo(All);
