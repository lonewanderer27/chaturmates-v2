import { IonContent, IonFooter, IonHeader, IonMenu, IonTitle, IonToolbar } from "@ionic/react";

export default function Sidebar() {
  return (
    <IonMenu contentId="sidebar-content" type="reveal">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sidebar Title</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        Sidebar Content
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonTitle>Sidebar Footer</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonMenu>
  )
}
