import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import RecommendPending from "../pages/Recommend/RecommendPending";
import RecommendStudents from "../pages/Recommend/RecommendStudents";
import RecommendGroups from "../pages/Recommend/RecommendGroups";
import { FC } from "react";
import FeatureUnavailable from "./FeatureUnavailable";

const RecommendRoute: FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonRouterOutlet id="recommend">
      <Route render={() => <Redirect to={`${match.url}/groups`} />} />
      <Route path={`${match.url}/pending`} component={RecommendPending} exact />
      <Route path={`${match.url}/students`} component={FeatureUnavailable} exact />
      <Route path={`${match.url}/groups`} component={FeatureUnavailable} exact />
    </IonRouterOutlet>
  );
};

export default RecommendRoute;
