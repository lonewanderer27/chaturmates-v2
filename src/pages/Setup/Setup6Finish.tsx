import { IonContent, IonPage, IonProgressBar, useIonViewWillEnter } from '@ionic/react';

import { hideTabBar } from '../../utils/TabBar';
import { FC } from 'react';
import { RouteComponentProps } from 'react-router';

const Setup6Finish: FC<RouteComponentProps> = () => {
  useIonViewWillEnter(() => {
    hideTabBar();
  });

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div>
          <IonProgressBar value={1}></IonProgressBar>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Setup6Finish