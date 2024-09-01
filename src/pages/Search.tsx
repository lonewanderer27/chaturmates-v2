import {
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonPopover,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { chevronBack, options } from "ionicons/icons";
import { searchCategoryAtom, searchQueryAtom } from "../atoms/search";

import GroupsResults from "../components/SearchPage/GroupsResults";
import KlasmeytsResults from "../components/SearchPage/KlasmeytsResults";
import PostsResults from "../components/SearchPage/PostsResults";
import RecentSearches from "../components/SearchPage/RecentSearches";
import { SEARCH_CATEGORY } from "../enums/search";
import SearchCategory from "../components/SearchPage/SearchCategory";
import SearchHistory from "../components/SearchPage/SearchHistory";
import { hideTabBar } from "../utils/TabBar";
import { useAtom } from "jotai";
import useGroupSearch from "../hooks/group/useGroupSearch";
import usePostSearch from "../hooks/post/usePostSearch";
import useSearch from "../hooks/search/useSearch";
import useSearchHistory from "../hooks/search/useSearchHistory";
import useStudentSearch from "../hooks/student/useStudentSearch";

export default function SearchPage() {
  const rt = useIonRouter();

  const handleBack = () => {
    if (rt.canGoBack()) rt.goBack();
    else rt.push("/discover", "back");
  };

  const [query, setQuery] = useAtom(searchQueryAtom);
  const { searchHistory, isLoading: isSHLoading } = useSearchHistory();
  const { handleStudentsSearch, studentsResults } = useStudentSearch();
  const { handleGroupSearch, groupsResults } = useGroupSearch();
  const { handlePostSearch, groupPosts } = usePostSearch();
  const { handleSearch } = useSearch();

  const [activePage, setActivePage] = useAtom(searchCategoryAtom);

  const toggleViewAll = (fromPage: SEARCH_CATEGORY) => {
    // set active page to all if it is from page
    setActivePage((activePage) =>
      activePage === fromPage ? SEARCH_CATEGORY.ALL : fromPage
    );
  };

  useIonViewWillEnter(() => {
    hideTabBar();
  });

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar className="mx-[-10px]">
            <IonSearchbar
              className="custom px-0 mx-0 font-poppins font-semibold"
              debounce={750}
              onIonCancel={handleBack}
              onIonChange={(e) => {
                setQuery(e.detail.value!);
                  handleSearch(e.detail.value!);
                  handleStudentsSearch(e.detail.value!);
                  handleGroupSearch(e.detail.value!);
                  handlePostSearch(e.detail.value!);
              }}
              value={query}
            ></IonSearchbar>
            <IonButton
              onClick={handleBack}
              slot="start"
              size="small"
              fill="clear"
              className="py-1 ml-[-10px]"
            >
              <IonIcon src={chevronBack} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        {query.length == 0 && (
          <div className="mt-[-30px]">
            <RecentSearches searchHistory={searchHistory} isLoading={isSHLoading} />
          </div>
        )}
        {query.length != 0 && (
          <>
            <SearchCategory value={activePage} setActivePage={setActivePage} />
            {activePage === SEARCH_CATEGORY.ALL ||
            activePage === SEARCH_CATEGORY.GROUPS ? (
              <GroupsResults
                groups={groupsResults}
                handleViewMore={toggleViewAll}
                activePage={activePage}
              />
            ) : null}
            {activePage === SEARCH_CATEGORY.ALL ||
            activePage === SEARCH_CATEGORY.KLASMEYTS ? (
              <KlasmeytsResults
                klasmeyts={studentsResults}
                handleViewMore={toggleViewAll}
                activePage={activePage}
              />
            ) : null}
            {activePage === SEARCH_CATEGORY.ALL ||
            activePage === SEARCH_CATEGORY.POST ? (
              <PostsResults
                posts={groupPosts}
                handleViewMore={toggleViewAll}
                activePage={activePage}
              />
            ) : null}
          </>
        )}
      </IonContent>
    </IonPage>
  );
}
