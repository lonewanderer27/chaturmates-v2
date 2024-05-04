import { IonButton, IonContent, IonFooter, IonHeader, IonMenu, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";

export default function Sidebar() {
  const rt = useIonRouter();

  const handleLogout = () => {
    // TODO: Implement logout

    rt.push('/login', 'root');
  }

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
        <IonToolbar className="p-2">
          <IonButton color="danger" expand="block" onClick={handleLogout}>
            Logout
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonMenu>
  )
}
