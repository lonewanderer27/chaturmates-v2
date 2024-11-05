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
  IonModal,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import useHideTabs from "../../hooks/useHideTabs";
import { FC, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import Picker from "react-mobile-picker";
import useRecommendRealGroups from "../../hooks/recommend/useRecommendRealGroups";
import RealGroupCard from "../../components/Recommend/RealGroupCard";


const RecommendGroups: FC<RouteComponentProps> = ({ match }) => {
  useHideTabs();

  const [topK, setTopK] = useState({
    value: 10,
  });
  const [finalTopK, setFinalTopK] = useState(() => topK.value);
  const { data, isLoading } = useRecommendRealGroups(finalTopK);
  const handleStudents = () => {
    rt.push("/recommend/students");
  };

  const rt = useIonRouter();
  const handleDone = () => {
    rt.push("/");
  };

  const modal = useRef<HTMLIonModalElement>(null);
  const dismiss = () => {
    modal.current?.dismiss();
  }
  const handleRefreshRecommendations = () => {
    // set our final top k value based on the top k value
    setFinalTopK(topK.value)

    // dismiss the top k modal selector
    dismiss();
  }

  const topKNumbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <>
      <IonPage>
        <IonModal 
          ref={modal} 
          trigger="open-change-topk"
          initialBreakpoint={0.350}
          breakpoints={[0.350]}
          backdropDismiss={false}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                Show Top Groups
              </IonTitle>
              <IonButtons slot="primary">
                <IonButton onClick={handleRefreshRecommendations}>
                  {topK.value === finalTopK ? "OK" : "Refresh"}
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <Picker value={topK} onChange={(newVal) => {
              console.log("picker: ", newVal)
              setTopK(newVal)
            }} wheelMode="natural">
              <Picker.Column name="value">
                {topKNumbers.map((number) => (
                  <Picker.Item key={number} value={number} label={number.toString()}>
                    {({ selected }) => (
                      <IonText style={{ color: selected ? '#0356e9' : 'black' }}>
                        <h4>{number}</h4>
                      </IonText>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
            </Picker>
          </IonContent>
        </IonModal>
        <IonContent className="ion-padding overflow-y-hidden">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonButtons slot="secondary">
                <IonBackButton
                  defaultHref={"/" + match.path.split("/")[1]}
                  text=""
                />
              </IonButtons>
              <IonButtons slot="primary">
                <IonButton fill="clear" id="open-change-topk">
                  Top: {finalTopK}
                </IonButton>
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
              {data?.map((group, index) => (
                <IonCol size="6" className="flex flex-column w-full">
                  <RealGroupCard
                    key={"recogroup: " + index}
                    // @ts-ignore TODO: Fix this
                    group={group}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonContent>
        {
          isLoading === true && (
            <IonLoading
              isOpen={isLoading === true}
              spinner="lines"
              message={"Loading group recommendations"}
            />
          )
        }
        {/* <IonFooter className="p-2">
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
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonFooter> */}
      </IonPage >
    </>
  );
}

export default RecommendGroups;
