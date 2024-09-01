import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonSkeletonText, IonThumbnail, IonToolbar } from '@ionic/react'
import { chevronBack, peopleCircleOutline } from 'ionicons/icons'

const GroupTimelineLoader = () => {
  return (
    <IonPage id="groupTimeline">
      <IonContent className='ion-padding'>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot='start'>
              {/* <IonButton>
                <IonIcon src={chevronBack} slot="start" />
              </IonButton> */}
              <IonBackButton defaultHref="/discover" text="" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonItem lines="none" className="mx-[-15px]" color="light">
          <IonThumbnail slot="start">
            <IonSkeletonText animated className='rounded-full h-50 w-auto' />
          </IonThumbnail>
          <IonLabel>
            <IonSkeletonText animated style={{ width: "50%" }} className='rounded-md mb-2' />
            <IonSkeletonText animated className='h-7 rounded-md' />
          </IonLabel>
        </IonItem>  
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  )
}

export default GroupTimelineLoader