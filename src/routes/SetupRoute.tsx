import { IonContent, IonFooter, IonLoading, IonPage, IonProgressBar, IonRouterOutlet, IonToolbar } from '@ionic/react'
import React, { lazy, Suspense } from 'react'
import { Route } from 'react-router'
import { RouteComponentProps } from 'react-router'

const Setup = lazy(() => import('../pages/Setup'))
const SetupPdfUpload = lazy(() => import('../pages/Setup/Setup1PdfUpload'))
const Setup3AcademicInformation = lazy(() => import('../pages/Setup/Setup3AcademicInformation'))
const Setup4Subjects = lazy(() => import('../pages/Setup/Setup4Subjects'))
const Setup6Finish = lazy(() => import('../pages/Setup/Setup6Finish'))
const SetupStudentOrProf = lazy(() => import('../pages/Setup/Setup0StudentOrProf'))
const Setup2IntroduceYourself = lazy(() => import('../pages/Setup/Setup2IntroduceYourself'))

const SetupRoute: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonRouterOutlet id="setup">
      <Suspense fallback={<IonPage>
        <IonContent/>
        <IonFooter>
          <IonProgressBar type="indeterminate" />
        </IonFooter>
      </IonPage>}>
        <Route path={match.url} component={Setup} exact />
        <Route path={`${match.url}/studentOrProf`} component={SetupStudentOrProf} exact />
        <Route path={`${match.url}/pdfUpload`} component={SetupPdfUpload} exact />
        <Route path={`${match.url}/introduceYourself`} component={Setup2IntroduceYourself} exact />
        <Route path={`${match.url}/academicInformation`} component={Setup3AcademicInformation} exact />
        <Route path={`${match.url}/subjects`} component={Setup4Subjects} exact />
        <Route path={`${match.url}/finish`} component={Setup6Finish} exact />
      </Suspense>
    </IonRouterOutlet>
  )
}

export default SetupRoute