import {IonLabel, IonSegment, IonSegmentButton} from "@ionic/react";

import {ComponentProps} from "react";
import { NOTIFICATION_CATEGORY } from "../../enums/inbox";

type IonSegmentProps = ComponentProps<typeof IonSegment>;

export default function NotificationsCategory(
  props: IonSegmentProps & {
    setActiveSegment: (category: NOTIFICATION_CATEGORY) => void;
  }
) {
  return (
    <IonSegment
      {...props}
      mode="md"
      onIonChange={(e) =>
        props.setActiveSegment(e.target.value as NOTIFICATION_CATEGORY)
      }
    >
      <IonSegmentButton value={NOTIFICATION_CATEGORY.ALL}>
        <IonLabel>All</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value={NOTIFICATION_CATEGORY.FOLLOWING}>
        <IonLabel>Following</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value={NOTIFICATION_CATEGORY.ARCHIVE}>
        <IonLabel>Archive</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value={NOTIFICATION_CATEGORY.PINNED}>
        <IonLabel>Pinned</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
}
