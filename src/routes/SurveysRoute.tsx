import React, { Suspense } from 'react';
import { Route, RouteComponentProps } from 'react-router';
import { hideTabBar, showTabBar } from '../utils/TabBar';
import { IonContent, IonFooter, IonLoading, IonPage, IonProgressBar, IonRouterOutlet } from '@ionic/react';
import useHideTabs from '../hooks/useHideTabs';
import EnrollmentCert from '../pages/Surveys/EnrollmentCert';

const SurveysRoute: React.FC<RouteComponentProps> = ({ match }) => {
  useHideTabs();

  return (
    <IonRouterOutlet id="surveys">
      <Route path={`${match.url}/enrollmentcert`} component={EnrollmentCert} exact />
    </IonRouterOutlet>
  );
};

export default SurveysRoute;