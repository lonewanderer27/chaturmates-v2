import React, { useEffect } from 'react';
import { Route, RouteComponentProps } from 'react-router';
import { hideTabBar, showTabBar } from '../utils/TabBar';

import { IonLoading, IonRouterOutlet } from '@ionic/react';
import useHideTabs from '../hooks/useHideTabs';

const EnrollmentCert = React.lazy(() => import('../pages/Surveys/EnrollmentCert'));

const SurveysRoute: React.FC<RouteComponentProps> = ({ match }) => {
  useHideTabs();

  return (
    <IonRouterOutlet id="surveys">
      <React.Suspense fallback={<IonLoading message="Survey is loading" />}>
        <Route path={`${match.url}/enrollmentcert`} component={EnrollmentCert} exact />
      </React.Suspense>
    </IonRouterOutlet>
  );
};

export default SurveysRoute;