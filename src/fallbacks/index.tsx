import { IonContent, IonFooter, IonPage, IonProgressBar } from "@ionic/react"

const DefaultFallback = () => {
  return (
    <IonPage>
      <IonContent />
      <IonFooter>
        <IonProgressBar type="indeterminate" />
      </IonFooter>
    </IonPage>
  )
}

export default DefaultFallback;