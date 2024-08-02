import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";

import { IonText } from "@ionic/react";
import {
  fingerPrintOutline,
  helpCircleOutline,
  personSharp,
} from "ionicons/icons";
import { hideTabBar } from "../utils/TabBar";
import useSetup from "../hooks/setup/useSetup";
import { FC } from "react";
import { RouteComponentProps } from "react-router";
import client from "../client";
import useSession from "../hooks/auth/useSession";

const Setup: FC<RouteComponentProps> = () => {
  const { session } = useSession();

  useIonViewWillEnter(() => {
    (async () => {
      // check if there's an existing profile for the user
      const { data: profile, error } = await client
        .from("profiles")
        .select("*, student:students(*), professor:professors(*)")
        .eq("id", session?.user.id!)
        .single();

      console.log(profile, error);

      // if there's student or professor, then redirect them to the home page
      if (profile?.student !== undefined || profile?.professor !== undefined) {
        window.location.href = "/discover";
        return;
      }

      // if there's no student or professor, then they're in the right place!
      // no redirect
      hideTabBar();
    })();
  }, []);

  const { handleNext } = useSetup();

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid className="my-auto mt-32">
          <IonRow className="flex text-center ">
            <IonCol>
              <IonImg src={"/logo_w_name.png"} className=" w-20 mx-auto" />
              <IonText className="font-bold">
                <h3>Setup</h3>
              </IonText>
              <IonText>
                <p>Let's get you started</p>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow className="py-20">
            <IonCol size="3">
              <IonButton fill="clear">
                <IonIcon
                  slot="end"
                  size="large"
                  color="medium"
                  icon={helpCircleOutline}
                />
              </IonButton>
            </IonCol>
            <IonCol>
              <IonText className="text-start">
                <p>
                  We'll ask you a few questions to help us better understand
                  your academic needs
                </p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar className="ion-padding flex justify-end">
          <IonButton slot="end" shape="round" onClick={handleNext}>
            Get Started
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Setup;
