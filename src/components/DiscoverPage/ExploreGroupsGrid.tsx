import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";

import AddGroupCard from "./AddGroupCard";
import useExploreGroups from "../../hooks/group/useExploreGroups";
import GroupCard from "../GroupCard/GroupCard";
import GroupCardLoader from "../../loaders/GroupCardLoader";

export default function ExploreGroupsGrid() {
  const { data: exploreGroups, isLoading } = useExploreGroups();

  return (
    <IonGrid className="ion-padding-vertical mx-[-4px]">
      <IonRow>
        <IonCol size="12">
          <IonText className="text-xl font-bold font-poppins">
            Explore Groups
          </IonText>
        </IonCol>
      </IonRow>
      <IonRow className=" mx-[-4px]">
        <IonCol size="12">
          <IonRow>
            {(exploreGroups && !isLoading) ? (
              exploreGroups.map((group, i) => (
                <GroupCard key={group.vanity_id + i} group={group} />
              ))
            ) : (
              Array.from({ length: 6 }).map((_, i) => (
                <GroupCardLoader key={i} />
              ))
            )}
            <AddGroupCard />
            {/* {Array.from({ length: 6 }).map((_, i) => (
              <GroupCardLoader key={i} />
            ))} */}
          </IonRow>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
