import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import useHideTabs from "../../hooks/useHideTabs";
import { FC } from "react";
import { RouteComponentProps } from "react-router";
import useRecommendGroups from "../../hooks/recommend/useRecommendGroups";
import RecommendedGroupCard from "../../components/Recommend/GroupCard";


const RecommendGroups: FC<RouteComponentProps> = ({ match }) => {
  useHideTabs();

  const rt = useIonRouter();
  const handleDone = () => {
    rt.push("/");
  };
  const { data, isLoading } = useRecommendGroups();
  const handleStudents = () => {
    rt.push("/recommend/students");
  };

  return (
    <IonPage>
      <IonContent className="ion-padding overflow-y-hidden">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton
                defaultHref={"/" + match.path.split("/")[1]}
                text=""
              />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonGrid className="mt-[10px]">
          <IonRow className="pb-[20px]">
            <IonCol className="text-center">
              <IonText>
                <h3>Suggested Groups</h3>
              </IonText>
              <IonText>
                <p>Here are our top picks to join to!</p>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow className="mx-[-4px]">
            {data?.groups.map((group, index) => (
              <IonCol size="6" className="flex flex-column w-full">
                <RecommendedGroupCard
                  key={"recogroup: " + index}
                  group={group}
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
      {isLoading === true && (
        <IonLoading
          isOpen={isLoading === true}
          spinner="crescent"
          message={"Loading group recommendations"}
        />
      )}
      <IonFooter className="p-2">
        <IonGrid>
          <IonRow>
            <IonCol size="5">
              <IonButton
                onClick={handleDone}
                shape="round"
                expand="block"
                color="medium"
              >
                <IonLabel>
                  <IonText>Done</IonText>
                </IonLabel>
                {/* <IonIcon src={closeOutline} slot="start" /> */}
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                shape="round"
                expand="block"
                color="success"
                onClick={handleStudents}
              >
                <IonLabel>
                  <IonText>View Students</IonText>
                </IonLabel>
                {/* <IonIcon src={checkmarkOutline} slot="start" /> */}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
}

export default RecommendGroups;
