import { IonBackButton, IonButton, IonContent, IonHeader, IonIcon, IonPage, IonPopover, IonSearchbar, IonText, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import { chevronBack, options } from "ionicons/icons";
import { searchCategoryAtom, searchQueryAtom } from "../atoms/search";

import GroupsResults from "../components/SearchPage/GroupsResults";
import KlasmeytsResults from "../components/SearchPage/KlasmeytsResults";
import PostsResults from "../components/SearchPage/PostsResults";
import RecentSearches from "../components/SearchPage/RecentSearches";
import { SEARCH_CATEGORY } from "../enums/search";
import SearchCategory from "../components/SearchPage/SearchCategory";
import SearchHistory from "../components/SearchPage/SearchHistory";
import { useAtom } from "jotai";
import useGroupSearch from "../hooks/group/useGroupSearch";
import usePostSearch from "../hooks/post/usePostSearch";
import useSearch from "../hooks/search/useSearch";
import useSearchHistory from "../hooks/search/useSearchHistory";
import useStudentSearch from "../hooks/student/useStudentSearch";

export default function SearchPage() {
  const rt = useIonRouter();

  const handleBack = () => {
    if (rt.canGoBack()) rt.goBack()
    else rt.push('/discover');
  }

  const [query, setQuery] = useAtom(searchQueryAtom);
  const { searchHistory } = useSearchHistory();
  const { handleStudentsSearch, studentsResults } = useStudentSearch();
  const { handleGroupSearch, groupsResults } = useGroupSearch();
  const { handlePostSearch, groupPosts } = usePostSearch();
  const { handleSearch } = useSearch();

  const [activePage, setActivePage] = useAtom(searchCategoryAtom);

  const toggleViewAll = (fromPage: SEARCH_CATEGORY) => {
    // set active page to all if it is from page
    setActivePage(activePage => activePage === fromPage ? SEARCH_CATEGORY.ALL : fromPage);
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar className="mx-[-10px]">
            <IonSearchbar className="custom px-0 mx-0 font-poppins font-semibold" onIonChange={(ev) => {
              setQuery(ev.detail.value!);
              handleSearch(ev.detail.value!);
              handleStudentsSearch(ev.detail.value!);
              handleGroupSearch(ev.detail.value!);
              handlePostSearch(ev.detail.value!);
            }} debounce={750} onIonInput={(ev) => {
              setQuery(ev.detail.value!);
              handleSearch(ev.detail.value!);
              handleStudentsSearch(ev.detail.value!);
              handleGroupSearch(ev.detail.value!);
              handlePostSearch(ev.detail.value!);
            }}
              onIonCancel={handleBack}
              value={query}>
            </IonSearchbar>
            <IonButton onClick={handleBack} slot="start" size='small' fill="clear" className="py-1 ml-[-10px]">
              <IonIcon src={chevronBack} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <SearchCategory value={activePage} setActivePage={setActivePage} />
        {activePage === SEARCH_CATEGORY.ALL && (
          <RecentSearches searchHistory={searchHistory} />
        )}
        {activePage === SEARCH_CATEGORY.ALL ||
          activePage === SEARCH_CATEGORY.GROUPS ? (
          <GroupsResults groups={groupsResults} handleViewMore={toggleViewAll} activePage={activePage} />
        ) : null}
        {activePage === SEARCH_CATEGORY.ALL ||
          activePage === SEARCH_CATEGORY.KLASMEYTS ? (
          <KlasmeytsResults klasmeyts={studentsResults} handleViewMore={toggleViewAll} activePage={activePage} />
        ) : null}
        {activePage === SEARCH_CATEGORY.ALL ||
          activePage === SEARCH_CATEGORY.POST ? (
          <PostsResults posts={groupPosts} handleViewMore={toggleViewAll} activePage={activePage} />
        ) : null}
      </IonContent>
    </IonPage>
  )
}
