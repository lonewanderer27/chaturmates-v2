import { IonContent, IonHeader, IonPage, IonProgressBar } from "@ionic/react"

const DefaultFallback = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonProgressBar type="indeterminate" />
      </IonHeader>
      <IonContent />
    </IonPage>
  )
}

export default DefaultFallback;