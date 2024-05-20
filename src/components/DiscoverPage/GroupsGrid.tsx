import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";

import AddGroupCard from "./AddGroupCard";
import { GroupResponse } from "../../services/groups";
import OldGroupCard from "../OldGroupCard/OldGroupCard";

export default function GroupsGrid(props: {
  groups?: GroupResponse["get"]["data"]["group"][];
}) {
  return (
    <IonGrid className="ion-padding-vertical mx-[-4px]">
      <IonRow>
        <IonCol size="12">
          <IonText className="text-xl font-bold font-poppins">Explore Groups</IonText>
        </IonCol>
      </IonRow>
      <IonRow className=" mx-[-4px]">
        <IonCol size="12">
          <IonRow>
            {props.groups &&
              props.groups.map((group, index) => (
                <>
                  {/* TODO: Use the new GroupCard component  */}
                  <OldGroupCard key={group.id} group={group} />
                </>
              ))}
            <AddGroupCard />
          </IonRow>
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}