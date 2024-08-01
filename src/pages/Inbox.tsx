import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { showTabBar } from "../utils/TabBar";
import { FC, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { useLocation } from "react-router-dom";
import { INBOX_CATEGORY } from "../enums/inbox";

const Inbox: FC<RouteComponentProps> = () => {
  const location = useLocation();
  const history = useIonRouter();
  const [selectedSegment, setSelectedSegment] = useState<INBOX_CATEGORY>(
    INBOX_CATEGORY.FOLLOWING
  );

  useIonViewWillEnter(() => {
    showTabBar();
  });

  useEffect(() => {
    if (location.hash === "#notice") {
      setSelectedSegment(INBOX_CATEGORY.NOTICE);
    } else {
      setSelectedSegment(INBOX_CATEGORY.FOLLOWING);
    }
  }, [location.hash]);

  const handleSegmentChange = (e: CustomEvent) => {
    const value = e.detail.value as INBOX_CATEGORY;
    setSelectedSegment(value);
    const pathname = location.pathname.split("/")[1];
    history.push(
      `/${pathname}/inbox#${value === INBOX_CATEGORY.NOTICE ? "notice" : "following"}`
    );
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/discover" text={""} />
            </IonButtons>
            <IonText
              slot="start"
              className="page-title font-poppins font-bold"
              color="secondary"
            >
              Inbox
            </IonText>
          </IonToolbar>
        </IonHeader>
        <IonSegment value={selectedSegment} onIonChange={handleSegmentChange}>
          <IonSegmentButton value={INBOX_CATEGORY.FOLLOWING}>
            Following
          </IonSegmentButton>
          <IonSegmentButton value={INBOX_CATEGORY.NOTICE}>
            Notice
          </IonSegmentButton>
        </IonSegment>
      </IonContent>
    </IonPage>
  );
};

export default Inbox;
