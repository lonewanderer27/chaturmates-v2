import { IonIcon, IonItem, IonText } from "@ionic/react";
import { closeCircleOutline, timeOutline } from "ionicons/icons";

import { ComponentProps } from "react";
import { searchQueryAtom } from "../../atoms/search";
import { useAtom } from "jotai";
import useGroupSearch from "../../hooks/group/useGroupSearch";
import useSearch from "../../hooks/search/useSearch";
import useSearchHistory from "../../hooks/search/useSearchHistory";
import useStudentSearch from "../../hooks/student/useStudentSearch";

type IonItemProps = ComponentProps<typeof IonItem>;

export default function SearchHistoryItem(
  props: IonItemProps & {
    historyId: number;
    icon: string;
    query: string;
    closeIcon: string;
    lines: string;
  }
) {
  const [query, setQuery] = useAtom(searchQueryAtom);
  const { handleGroupSearch } = useGroupSearch();
  const { handleStudentsSearch } = useStudentSearch();
  const { handleHide } = useSearchHistory();
  const { handleSearch } = useSearch();

  return (
    <IonItem
      {...props}
      slot="start"
      className="cursor-pointer"
      onClick={() => {
        setQuery(props.title ?? "")
        handleGroupSearch(props.title ?? "")
        handleStudentsSearch(props.title ?? "") 
        handleSearch(props.title ?? "")
      }}
    >
      <IonIcon icon={timeOutline} slot="start"></IonIcon>
      <IonText className="font-poppins font-semibold">
        <p>{props.title}</p>
      </IonText>
      <IonIcon
        slot="end"
        onClick={() => handleHide(props.historyId)}
        icon={props.closeIcon}
      ></IonIcon>
    </IonItem>
  );
}

SearchHistoryItem.defaultProps = {
  id: 0,
  icon: timeOutline,
  query: "Johnna Doe",
  closeIcon: closeCircleOutline,
  lines: "none",
};
