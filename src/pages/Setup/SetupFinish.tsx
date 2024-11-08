import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonIcon,
  IonImg,
  IonPage,
  IonProgressBar,
  IonRow,
  IonText,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";

import { hideTabBar } from "../../utils/TabBar";
import { FC } from "react";
import { RouteComponentProps } from "react-router";
import { helpCircleOutline } from "ionicons/icons";

const Setup6Finish: FC<RouteComponentProps> = () => {
  useIonViewWillEnter(() => {
    hideTabBar();
  });

  const rt = useIonRouter();
  const handleNext = () => {
    // TODO: We should have a better way to handle this
    // for example, what if the recommendation is not available?
    rt.push("/recommend/groups");
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid className="my-auto mt-32">
          <IonRow className="flex text-center ">
            <IonCol>
              <IonImg src={"/logo_w_name.png"} className=" w-20 mx-auto" />
              <IonText className="font-bold">
                <h3>Setup Finished</h3>
              </IonText>
              <IonText>
                <p>Congratulations!</p>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow className="py-20">
            {/* <IonCol size="3">
              <IonButton fill="clear">
                <IonIcon
                  slot="end"
                  size="large"
                  color="medium"
                  icon={helpCircleOutline}
                />
              </IonButton>
            </IonCol> */}
            <IonCol>
              <IonText className="text-center">
                <p>
                  The profile setup is completed successfully! Let us show you
                  our recommended classmates and groups just for you.
                </p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar className="ion-padding flex justify-end">
          <IonButton expand="full" shape="round" onClick={handleNext}>
            Show Recommendations
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Setup6Finish;
