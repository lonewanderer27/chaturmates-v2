import { IonRouterOutlet, useIonViewWillEnter } from '@ionic/react'

import React from 'react'
import { Route } from 'react-router'
import { RouteComponentProps } from 'react-router'
import Setup from '../pages/Setup'
import Setup1PdfOrManual from '../pages/Setup/Setup1PdfOrManual'

const SetupRoute: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonRouterOutlet id="setup">
      <Route path={match.url} component={Setup} exact />
      <Route path={`${match.url}/pdfOrManual`} component={Setup1PdfOrManual} exact />
      <Route path={`${match.url}/courseYrLevelType`} component={Setup1PdfOrManual} exact />
      <Route path={`${match.url}/subjects`} component={Setup1PdfOrManual} exact />
      <Route path={`${match.url}/finish`} component={Setup1PdfOrManual} exact />
    </IonRouterOutlet>
  )
}

export default SetupRoute