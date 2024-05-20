import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonList, IonText, useIonRouter } from "@ionic/react";

import { SEARCH_CATEGORY } from "../../enums/search";
import StudentItem from "./StudentItem";
import { StudentType } from "../../types";

export default function KlasmeytsResults(props: {
  klasmeyts: StudentType[];
  handleViewMore: (fromPage: SEARCH_CATEGORY) => void;
  activePage?: SEARCH_CATEGORY;
}) {
  if (!props.klasmeyts || props.klasmeyts.length === 0) {
    return <></>;
  }

  return (
    <IonCard color={props.activePage === SEARCH_CATEGORY.KLASMEYTS ? undefined : "light"} 
      className="mx-[-20px] shadow-none rounded-2xl mt-5">
      {props.activePage !== SEARCH_CATEGORY.KLASMEYTS && (
        <IonCardHeader>
          <IonCardSubtitle>Klasmeyts</IonCardSubtitle>
        </IonCardHeader>
      )}
      {props.klasmeyts && props.klasmeyts.length > 0 && (
        <IonList>
          {props.activePage === SEARCH_CATEGORY.KLASMEYTS
            ? props.klasmeyts.map((klasmeyt) => (
              <StudentItem student={klasmeyt} key={klasmeyt.id} />
            ))
            : props.klasmeyts
              .slice(0, 4)
              .map((klasmeyt) => (
                <StudentItem student={klasmeyt} key={klasmeyt.id} />
              ))}
        </IonList>
      )}
      
      <IonCardContent>
        {props.klasmeyts.length === 0 && (
          <p className="ion-padding-start">No klasmeyts found.</p>
        )}
        {props.klasmeyts.length > 4 && (
          <IonText
            onClick={() => props.handleViewMore(SEARCH_CATEGORY.KLASMEYTS)}
            color="medium"
            className="cursor-pointer py-0 my-0 text-sm"
          >
            {props.activePage === SEARCH_CATEGORY.KLASMEYTS ? "FEWER KLASMEYTS" : "MORE KLASMEYTS"}
          </IonText>
        )}
      </IonCardContent>
    </IonCard>
  );
}
