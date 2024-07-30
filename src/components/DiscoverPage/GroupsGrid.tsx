import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";

import AddGroupCard from "./AddGroupCard";
import { GroupResponse } from "../../services/groups";
import OldGroupCard from "../OldGroupCard/OldGroupCard";
import { GroupType, StudentType } from "../../types";
import { GroupMemberType } from "../../types";

type GMT = GroupMemberType[] & {
  student: StudentType
}[]

type GT = GroupType[] & {
  group_members: GMT[]
}[]

type GroupsGridProps = {
  groups?: GT | undefined
}

export default function GroupsGrid(props: GroupsGridProps) {
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