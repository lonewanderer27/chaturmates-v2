import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
  useIonAlert,
  useIonViewWillEnter,
} from "@ionic/react";
import { FC } from "react";
import { RouteComponentProps } from "react-router";
import { hideTabBar } from "../../utils/TabBar";
import useSetupDraftStudent from "../../hooks/setup/useSetupDraftStudent";

const SetupStudentOrProf: FC<RouteComponentProps> = ({ match }) => {
  useIonViewWillEnter(() => {
    hideTabBar();
  });
  const { handleNext } = useSetupDraftStudent();
  const [alert] = useIonAlert();
  const handleProfessor = () => {
    // alert the user that this feature is not yet available
    alert({
      header: "Feature not available",
      message: "Professors will be able to sign up soon. Stay tuned!",
      buttons: ["OK"],
    });
  };
  const handleStudent = () => {
    // go to the next step
    // rt.push("/setup/pdfUpload");
    handleNext();
  };

  return (
    <IonPage>
      <IonContent>
        <IonHeader collapse="condense" className="ion-padding">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton
                defaultHref={"/" + match.path.split("/")[1]}
                text=""
              />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonGrid className="mx-0 mt-20">
          <IonRow>
            <IonCol>
              <IonText className="text-center font-semibold">
                <h3>Are you a student or a professor?</h3>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard onClick={handleStudent}>
                <IonImg
                  src={"/student.png"}
                  className="mb-[-20px] mx-auto"
                  style={{
                    width: "90%",
                  }}
                />
                <IonText className="text-center mb-25">
                  <h3 className=" font-bold">Student</h3>
                </IonText>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard onClick={handleProfessor}>
                <IonImg
                  src={"/professor.png"}
                  className="mt-6 mb-[-20px] mx-auto"
                  style={{
                    width: "90%",
                  }}
                />
                <IonText className="text-center">
                  <h3 className=" mt-[25px] mb-[10px] font-bold">Professor</h3>
                </IonText>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SetupStudentOrProf;
