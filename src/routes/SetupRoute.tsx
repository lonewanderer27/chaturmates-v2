import { IonContent, IonFooter, IonLoading, IonPage, IonProgressBar, IonRouterOutlet, IonToolbar } from '@ionic/react'
import React, { Suspense } from 'react'
import { Route } from 'react-router'
import { RouteComponentProps } from 'react-router'

import Setup from '../pages/Setup'
import SetupPdfUpload from '../pages/Setup/Setup1PdfUpload'
import Setup3AcademicInformation from '../pages/Setup/Setup3AcademicInformation'
import Setup4Subjects from '../pages/Setup/Setup4Subjects'
import Setup6Finish from '../pages/Setup/Setup6Finish'
import SetupStudentOrProf from '../pages/Setup/Setup0StudentOrProf'
import Setup2IntroduceYourself from '../pages/Setup/Setup2IntroduceYourself'

const SetupRoute: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonRouterOutlet id="setup">
      <Route path={match.url} component={Setup} exact />
      <Route path={`${match.url}/studentOrProf`} component={SetupStudentOrProf} exact />
      <Route path={`${match.url}/pdfUpload`} component={SetupPdfUpload} exact />
      <Route path={`${match.url}/introduceYourself`} component={Setup2IntroduceYourself} exact />
      <Route path={`${match.url}/academicInformation`} component={Setup3AcademicInformation} exact />
      <Route path={`${match.url}/subjects`} component={Setup4Subjects} exact />
      <Route path={`${match.url}/finish`} component={Setup6Finish} exact />
    </IonRouterOutlet>
  )
}

export default SetupRoute