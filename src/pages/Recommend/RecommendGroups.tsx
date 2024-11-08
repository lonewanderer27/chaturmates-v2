import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
  IonLoading,
  IonGrid,
} from "@ionic/react";
import useHideTabs from "../../hooks/useHideTabs";
import { FC, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import Picker from "react-mobile-picker";
import useRecommendRealGroups from "../../hooks/recommend/useRecommendRealGroups";
import RealGroupCard from "../../components/Recommend/RealGroupCard";
import GroupCardLoader from "../../loaders/GroupCardLoader";

enum SortingOptions {
  HIGH_TO_LOW = "high_to_low",
  LOW_TO_HIGH = "low_to_high",
}

const RecommendGroups: FC<RouteComponentProps> = ({ match }) => {
  useHideTabs();

  const [topK, setTopK] = useState({
    value: 10,
  });
  const [finalTopK, setFinalTopK] = useState(() => topK.value);
  const { data, isLoading } = useRecommendRealGroups(finalTopK);
  const [sortingOption, setSortingOption] = useState(SortingOptions.HIGH_TO_LOW);
  const [isSorting, setIsSorting] = useState(false); // New state variable

  const rt = useIonRouter();

  const handleStudents = () => {
    rt.push("/recommend/students");
  };

  const handleDone = () => {
    rt.push("/");
  };

  const modal = useRef<HTMLIonModalElement>(null);
  const dismiss = () => {
    modal.current?.dismiss();
  };
  const handleRefreshRecommendations = () => {
    // set our final top k value based on the top k value
    setFinalTopK(topK.value);

    // dismiss the top k modal selector
    dismiss();
  };

  const topKNumbers = Array.from({ length: 100 }, (_, i) => i + 1);

  // Prepare the data for display based on the sorting option
  const displayedData = [...(data || [])];

  if (sortingOption === SortingOptions.LOW_TO_HIGH) {
    displayedData.reverse();
  }

  // Handle sorting option change
  const handleSortingChange = (value: SortingOptions) => {
    setSortingOption(value);
    setIsSorting(true); // Show loading indicator
    setTimeout(() => {
      setIsSorting(false); // Hide loading indicator after 1 second
    }, 1000);
  };

  return (
    <>
      <IonPage>
        <IonModal
          ref={modal}
          trigger="open-change-topk"
          initialBreakpoint={0.35}
          breakpoints={[0.35]}
          backdropDismiss={false}
          handle={false}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Show Top Groups</IonTitle>
              <IonButtons slot="primary">
                <IonButton onClick={handleRefreshRecommendations}>
                  {topK.value === finalTopK ? "OK" : "Refresh"}
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <Picker
              value={topK}
              onChange={(newVal) => {
                console.log("picker: ", newVal);
                setTopK(newVal);
              }}
              wheelMode="natural"
              onTouchMove={(e) => {
                e.stopPropagation();
              }}
            >
              <Picker.Column name="value">
                {topKNumbers.map((number) => (
                  <Picker.Item key={number} value={number} label={number.toString()}>
                    {({ selected }) => (
                      <IonText style={{ color: selected ? "#0356e9" : "black" }}>
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
                  defaultHref="/discover/me"
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
                  <p>Here are our top picks to join!</p>
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonSelect
                  justify="end"
                  placeholder="Sort"
                  interface="action-sheet"
                  value={sortingOption}
                  onIonChange={(e) => handleSortingChange(e.detail.value)}
                >
                  <IonSelectOption value={SortingOptions.HIGH_TO_LOW}>
                    Most Recommended
                  </IonSelectOption>
                  <IonSelectOption value={SortingOptions.LOW_TO_HIGH}>
                    Least Recommended
                  </IonSelectOption>
                </IonSelect>
              </IonCol>
            </IonRow>

            {/* Display loading indicator during sorting */}
            {(isSorting || isLoading) ? (
              <IonRow className="mx-[-4px]">
                {Array.from({ length: 6 }).map((_, i) => (
                  <IonCol
                    size="12"
                    className="flex flex-column w-full"
                    key={`recogroup-${i}`}
                  >
                    {Array.from({ length: 2 }).map((_, i) => (
                      <GroupCardLoader key={i} />
                    ))}
                  </IonCol>
                ))}
              </IonRow>
            ) : (
              <IonRow className="mx-[-4px]">
                {displayedData.map((group, index) => (
                  <IonCol
                    size="6"
                    className="flex flex-column w-full"
                    key={`recogroup-${index}`}
                  >
                    <RealGroupCard
                      // @ts-ignore TODO: Fix this
                      group={group}
                    />
                  </IonCol>
                ))}
              </IonRow>
            )}
          </IonGrid>
        </IonContent>
        {/* {isLoading && (
          <IonLoading
            isOpen={isLoading}
            spinner="lines"
            message={"Loading group recommendations"}
          />
        )} */}
      </IonPage>
    </>
  );
};

export default RecommendGroups;
