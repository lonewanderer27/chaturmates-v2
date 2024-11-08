import { IonContent, IonFooter, IonLoading, IonPage, IonProgressBar, IonRouterOutlet, IonToolbar } from '@ionic/react'
import React, { Suspense } from 'react'
import { Route } from 'react-router'
import { RouteComponentProps } from 'react-router'

const Setup = React.lazy(() => import('../pages/Setup'));
const SetupPdfUpload = React.lazy(() => import('../pages/Setup/Setup1PdfUpload'));
const Setup3AcademicInformation = React.lazy(() => import('../pages/Setup/Setup3AcademicInformation'));
const Setup4Classes = React.lazy(() => import('../pages/Setup/Setup4Classes'));
const Setup6Finish = React.lazy(() => import('../pages/Setup/SetupFinish'));
const SetupStudentOrProf = React.lazy(() => import('../pages/Setup/Setup0StudentOrProf'));
const Setup2IntroduceYourself = React.lazy(() => import('../pages/Setup/Setup2IntroduceYourself'));
const Setup5Hobbies = React.lazy(() => import('../pages/Setup/Setup5Hobbies'));

const SetupRoute: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonRouterOutlet id="setup" animated={false}>
      <Route path={match.url} component={Setup} exact />
      <Route path={`${match.url}/studentOrProf`} component={SetupStudentOrProf} exact />
      <Route path={`${match.url}/pdfUpload`} component={SetupPdfUpload} exact />
      <Route path={`${match.url}/introduceYourself`} component={Setup2IntroduceYourself} exact />
      <Route path={`${match.url}/academicInformation`} component={Setup3AcademicInformation} exact />
      <Route path={`${match.url}/classes`} component={Setup4Classes} exact />
      <Route path={`${match.url}/hobbies`} component={Setup5Hobbies} exact />
      <Route path={`${match.url}/finish`} component={Setup6Finish} exact />
    </IonRouterOutlet>
  )
}

export default SetupRoute