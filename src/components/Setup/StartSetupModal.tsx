import { IonButton, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from '@ionic/react'
import React, { ComponentProps, FC } from 'react'

type IonModalProps = ComponentProps<typeof IonModal>

const StartSetupModal: FC<IonModalProps> = (props) => {
  return (
    <IonModal {...props}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Setup Required
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        It looks like you haven't started the setup process yet. Completing your profile is mandatory to access all features.
        <IonButton size="small">
          Tap here to begin!
        </IonButton>
      </IonContent>
    </IonModal>
  )
}

export default StartSetupModal