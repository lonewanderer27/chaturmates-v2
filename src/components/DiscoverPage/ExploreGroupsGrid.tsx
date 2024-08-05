import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";

import AddGroupCard from "./AddGroupCard";
import useExploreGroups from "../../hooks/group/useExploreGroups";
import GroupCard from "../GroupCard/GroupCard";

export default function ExploreGroupsGrid() {
  const { data: exploreGroups } = useExploreGroups();

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
            {exploreGroups &&
              exploreGroups.map((group, i) => (
                <GroupCard key={group.vanity_id+i} group={group} />
              ))}
            <AddGroupCard />
          </IonRow>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
