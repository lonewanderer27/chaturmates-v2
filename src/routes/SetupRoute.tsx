import { IonRouterOutlet } from '@ionic/react'

import React from 'react'
import { Route } from 'react-router'
import { RouteComponentProps } from 'react-router'
import Setup from '../pages/Setup'
import Setup1PdfOrManual from '../pages/Setup/Setup1PdfOrManual'
import Setup2CourseYrLevelType from '../pages/Setup/Setup2CourseYrLevelType'
import Setup3Subjects from '../pages/Setup/Setup3Subjects'
import Setup4Finish from '../pages/Setup/Setup4Finish'

const SetupRoute: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonRouterOutlet id="setup">
      <Route path={match.url} component={Setup} exact />
      <Route path={`${match.url}/pdfOrManual`} component={Setup1PdfOrManual} exact />
      <Route path={`${match.url}/courseYrLevelType`} component={Setup2CourseYrLevelType} exact />
      <Route path={`${match.url}/subjects`} component={Setup3Subjects} exact />
      <Route path={`${match.url}/finish`} component={Setup4Finish} exact />
    </IonRouterOutlet>
  )
}

export default SetupRoute