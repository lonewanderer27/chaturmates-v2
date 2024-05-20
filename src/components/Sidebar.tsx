import { IonButton, IonContent, IonFooter, IonHeader, IonMenu, IonSpinner, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";

import client from "../client";
import useSession from "../hooks/auth/useSession";

export default function Sidebar() {
  const rt = useIonRouter();
  const { session, logout, processing } = useSession();

  const handleLogout = async () => {
    await logout();
    rt.push('/continue', 'root');
  }

  const handleLogin = async () => {
    rt.push('/continue', 'root');
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
          {session ?
            <IonButton color="danger" expand="block" onClick={handleLogout}>
              {processing ? <IonSpinner name="dots" /> : "Logout"}
            </IonButton> :
            <IonButton expand="block" onClick={handleLogin}>
              Login
            </IonButton>}
        </IonToolbar>
      </IonFooter>
    </IonMenu>
  )
}
