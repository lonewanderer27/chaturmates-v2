import { IonRouterOutlet, useIonViewWillEnter } from "@ionic/react";
import React, { useEffect } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { hideTabBar, showTabBar } from "../utils/TabBar";

import Community from "../pages/Community";
import CreateGroupP1 from "../pages/Group/Create/CreateGroupP1";
import CreateGroupP2 from "../pages/Group/Create/CreateGroupP2";
import CreateGroupP3 from "../pages/Group/Create/CreateGroupP3";
import GroupAwaitingApproval from "../pages/Group/Members/GroupAwaitingApproval";
// import GroupEditInfo from "../pages/Group/GroupEditInfo";
import GroupInfo from "../pages/Group/GroupInfo";
import GroupMembers from "../pages/Group/Members/GroupMembers";
import GroupPendingMembers from "../pages/Group/Members/GroupPendingMembers";
import GroupPostPage from "../pages/Group/GroupPostPage";
import GroupResources from "../pages/Group/GroupResources";
import GroupTimeline from "../pages/Group/GroupTimeline";
import Inbox from "../pages/Inbox";
import Me from "../pages/Community/Me";
import MeFollowing from "../pages/Community/Me/MeFollowing";
import MeGroups from "../pages/Community/Me/MeGroups";
import MeUpdate from "../pages/Community/Me/MeUpdate";
import SearchPage from "../pages/Search";
import StudentFollowing from "../pages/Community/Student/StudentFollowing";
import StudentGroups from "../pages/Community/Student/StudentGroups";
import StudentPage from "../pages/Community/StudentPage";

const CommunityRoute: React.FC<RouteComponentProps> = ({ match }) => {
  console.log(match);

  return (
    <IonRouterOutlet id="community">
      <Route path={match.url} component={Community} exact />
      <Route path={`${match.url}/me`} component={Me} exact />
      <Route path={`${match.url}/me/groups`} component={MeGroups} exact />
      <Route path={`${match.url}/me/following`} component={MeFollowing} exact />
      <Route path={`${match.url}/me/update`} component={MeUpdate} exact />
      <Route
        path={`${match.url}/group/create`}
        render={() => <Redirect to={`${match.url}/groups/create/p1`} />}
        exact
      />
      <Route
        path={`${match.url}/group/create/p1`}
        component={CreateGroupP1}
        exact
      />
      <Route
        path={`${match.url}/group/create/p2`}
        component={CreateGroupP2}
        exact
      />
      <Route
        path={`${match.url}/group/create/p3`}
        component={CreateGroupP3}
        exact
      />
      <Route
        path={`${match.url}/group/id/:group_id`}
        component={GroupTimeline}
        exact
      />
      <Route
        path={`${match.url}/group/vu/:vanity_url`}
        component={GroupTimeline}
        exact
      />
      <Route
        path={`${match.url}/group/vu/:vanity_url/awaiting_approval`}
        component={GroupAwaitingApproval}
        exact
      />
      <Route
        path={`${match.url}/group/vu/:vanity_url/post/:post_id`}
        component={GroupPostPage}
        exact
      />
      <Route
        path={`${match.url}/group/vu/:vanity_url/members`}
        component={GroupMembers}
        exact
      />
      <Route
        path={`${match.url}/group/vu/:vanity_url/members/pending`}
        component={GroupPendingMembers}
        exact
      />
      <Route
        path={`${match.url}/group/vu/:vanity_url/resources`}
        component={GroupResources}
        exact
      />
      <Route
        path={`${match.url}/group/vu/:vanity_url/info`}
        component={GroupInfo}
        exact
      />
      {/* <Route
        path={`${match.url}/group/vu/:vanity_url/info/edit`}
        component={GroupEditInfo}
        exact
      /> */}
      <Route
        path={`${match.url}/student/id/:student_id`}
        component={StudentPage}
        exact
      />
      <Route
        path={`${match.url}/student/id/:student_id/following`}
        component={StudentFollowing}
        exact
      />
      <Route
        path={`${match.url}/student/id/:student_id/groups`}
        component={StudentGroups}
        exact
      />
      <Route path={`${match.url}/search`} component={SearchPage} exact />
      <Route path={`${match.url}/inbox`} component={Inbox} exact />
    </IonRouterOutlet>
  );
};

export default CommunityRoute;
