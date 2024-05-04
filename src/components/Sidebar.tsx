import { IonContent, IonHeader, IonMenu, IonTitle, IonToolbar } from "@ionic/react";

export default function Sidebar() {
  return (
    <IonMenu contentId="sidebar-content" type="reveal">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sidebar Content</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        This is the main menu content
      </IonContent>
    </IonMenu>
  )
}
