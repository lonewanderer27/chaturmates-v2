import React, { Suspense } from 'react';
import { Route, RouteComponentProps } from 'react-router';
import { hideTabBar, showTabBar } from '../utils/TabBar';

import { IonContent, IonFooter, IonLoading, IonPage, IonProgressBar, IonRouterOutlet } from '@ionic/react';
import useHideTabs from '../hooks/useHideTabs';

const EnrollmentCert = React.lazy(() => import('../pages/Surveys/EnrollmentCert'));

const SurveysRoute: React.FC<RouteComponentProps> = ({ match }) => {
  useHideTabs();

  return (
    <IonRouterOutlet id="surveys">
      <Suspense fallback={<IonPage>
        <IonContent />
        <IonFooter>
          <IonProgressBar type="indeterminate" />
        </IonFooter>
      </IonPage>}>
        <Route path={`${match.url}/enrollmentcert`} component={EnrollmentCert} exact />
      </Suspense>
    </IonRouterOutlet>
  );
};

export default SurveysRoute;