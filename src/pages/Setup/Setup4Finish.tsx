import { IonContent, IonPage, IonProgressBar, useIonViewWillEnter } from '@ionic/react';

import { hideTabBar } from '../../utils/TabBar';

const Setup4Finish = () => {
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

export default Setup4Finish