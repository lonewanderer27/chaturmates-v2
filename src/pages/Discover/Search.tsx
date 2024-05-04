import { IonBackButton, IonButton, IonContent, IonHeader, IonIcon, IonPage, IonSearchbar, IonToolbar, useIonRouter } from "@ionic/react";
import { chevronBack } from "ionicons/icons";

export default function SearchPage() {
  const rt = useIonRouter();

  const handleBack = () => {
    if (rt.canGoBack()) rt.goBack()
    else rt.push('/discover');
  }

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonSearchbar className="custom px-0 mx-0 font-poppins font-semibold">
            </IonSearchbar>
            <IonButton onClick={handleBack} slot="start" size='small' fill="clear" className="py-1 ml-[-10px]">
              <IonIcon src={chevronBack} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  )
}
