import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonTextarea, IonTitle, IonToolbar, useIonRouter, useIonViewWillEnter } from '@ionic/react'
import { sendOutline } from 'ionicons/icons';
import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router'
import { hideTabBar } from '../../utils/TabBar';

const GroupCreateNewPost: FC<RouteComponentProps> = ({ match }) => {
  useIonViewWillEnter(() => {
    hideTabBar();
  });
  const rt = useIonRouter();

  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton
                defaultHref={"/" + rt.routeInfo.pushedByRoute}
                text=""
              />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton fill="clear">
                <IonIcon src={sendOutline} />
              </IonButton>
            </IonButtons>
            <IonTitle>Submit</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList className='rounded-md mt-5'>
          <IonItem lines={"full"}>
            <IonInput placeholder="Title" />
          </IonItem>
          <IonItem>
            <IonTextarea placeholder="Content" rows={6} />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default GroupCreateNewPost