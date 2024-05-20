import "./GroupItem.css";

import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonItem, IonLabel, IonList, IonText, useIonRouter } from "@ionic/react";

import GroupItem from "./GroupItem";
import { GroupResponse } from "../../services/groups";
import { SEARCH_CATEGORY } from "../../enums/search";

export default function GroupsResults(props: {
  groups?: GroupResponse["get"]["data"]["group"][];
  handleViewMore: (fromPage: SEARCH_CATEGORY) => void;
  activePage?: SEARCH_CATEGORY;
}) {

  if (!props.groups || props.groups.length === 0) {
    return <></>;
  }

  return (
    <IonCard 
      color={props.activePage === SEARCH_CATEGORY.GROUPS ? undefined : "light"} 
      className="mx-[-20px] shadow-none rounded-2xl mt-5">
      {props.activePage !== SEARCH_CATEGORY.GROUPS && (
        <IonCardHeader>
          <IonCardSubtitle>Groups</IonCardSubtitle>
        </IonCardHeader>
      )}

      {props.groups && props.groups.length > 0 && (
        <IonList className="mx-2">
          {props.activePage === SEARCH_CATEGORY.GROUPS ? (
            <>
              {props.groups.map((group) => (
                <GroupItem group={group} key={group.id} />
              ))}
            </>
          ) : (
            <>
              {props.groups.slice(0, 3).map((group) => (
                <GroupItem group={group} key={group.id} />
              ))}
            </>
          )}
        </IonList>
      )}

      <IonCardContent>
        {props.groups && props.groups.length === 0 && (
          <p className="ion-margin p-4">No groups found.</p>
        )}
        {props.groups && props.groups.length > 3 && (
          <IonText
            color="medium"
            onClick={() => props.handleViewMore(SEARCH_CATEGORY.GROUPS)}
            className="cursor-pointer py-0 my-0 text-sm"
          >
            {props.activePage === SEARCH_CATEGORY.GROUPS ? "FEWER GROUPS" : "MORE GROUPS"}
          </IonText>
        )}
      </IonCardContent>
    </IonCard>
  );
}
