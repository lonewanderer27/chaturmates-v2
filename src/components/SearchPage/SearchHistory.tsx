import { IonList, IonText } from "@ionic/react";

import SearchHistoryItem from "./SearchHistoryItem";
import { SearchHistoryType } from "../../types";
import { showAllHistoryAtom } from "../../atoms/search";
import { useAtom } from "jotai";

export default function SearchHistory(props: {
  searchHistory: SearchHistoryType[];
}) {
  const [showAll, setShowAll] = useAtom(showAllHistoryAtom);

  const toggleShowAll = () => {
    setShowAll((show) => !show);
  };

  if (props.searchHistory.length === 0) {
    return <></>
  }

  return (
    <div className="ion-margin-bottom font-poppins mt-2">
      {props.searchHistory.length > 0 && (
        <IonList>
          {showAll
            ? props.searchHistory.map((search, index) => (
                <SearchHistoryItem
                  historyId={search.id!}
                  key={search + "index" + index}
                  title={search.query}
                />
              ))
            : props.searchHistory
                .slice(0, 3)
                .map((search, index) => (
                  <SearchHistoryItem
                    historyId={search.id!}
                    key={search + "index" + index}
                    title={search.query}
                  />
                ))}
        </IonList>
      )}
      <IonText
        onClick={toggleShowAll}
        color="primary"
        className="ion-margin-vertical ion-padding-start  cursor-pointer"
      >
        {showAll ? "Show Most Recent" : "Show More History"}
      </IonText>
    </div>
  );
}

SearchHistory.defaultProps = {
  searchHistory: [
    "Software Engineering the best in the world",
    "Group ni Jay",
    "Taylor Swift",
  ],
};
