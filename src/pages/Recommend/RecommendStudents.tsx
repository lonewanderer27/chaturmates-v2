import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
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
import useRecommendStudents from "../../hooks/recommend/useRecommendStudents";
import RecommendedStudentCard from "../../components/Recommend/StudentCard";

export function formatYearLevel(yearLevel: number): string {
  switch (yearLevel) {
    case 1:
      return "1st";
    case 2:
      return "2nd";
    case 3:
      return "3rd";
    case 4:
      return "4th";
    case 5:
      return "5th";
    default:
      return `${yearLevel}th`;
  }
}

const RecommendStudents: FC<RouteComponentProps> = ({ match }) => {
  useHideTabs();

  const rt = useIonRouter();
  const handleDone = () => {
    rt.push("/");
  };
  const { data, isLoading } = useRecommendStudents();
  const handleGroups = () => {
    rt.push("/recommend/groups");
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
                <h3>Suggested Klasmeyts</h3>
              </IonText>
              <IonText>
                <p>Here are our top picks to connect to!</p>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow className="mx-[-4px]">
            {data?.students.map((student, index) => (
              <IonCol size="6" className="flex flex-column w-full">
                <RecommendedStudentCard
                  key={"recostudent: " + index}
                  student={student}
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
          message={"Loading student recommendations"}
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
                onClick={handleGroups}
              >
                <IonLabel>
                  <IonText>View Groups</IonText>
                </IonLabel>
                {/* <IonIcon src={checkmarkOutline} slot="start" /> */}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default RecommendStudents;
