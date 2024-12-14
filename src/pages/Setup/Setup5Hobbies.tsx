import { createAnimation, IonBackButton, IonButton, IonButtons, IonChip, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonModal, IonPage, IonRow, IonSearchbar, IonSpinner, IonTabsContext, IonText, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import { FC, useEffect, useRef, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import useHobbyCategories from '../../hooks/hobbies/useHobbyCategories'
import useHobbies from '../../hooks/hobbies/useHobbies'
import { search } from 'ionicons/icons'
import { HobbyType } from '../../types'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { NewStudentTypeSteps } from '../../types/student/post/NewStudentType'
import { newStudentAtom } from '../../atoms/student'
import { useSetAtom } from 'jotai'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import useSetupDraftStudent from '../../hooks/setup/useSetupDraftStudent'
import { hideTabBar } from '../../utils/TabBar'
import useSelfSetupDraftStudent from '../../hooks/setup/useSelfSetupDraftStudent'
import { useDebounceValue } from 'usehooks-ts'
import { useToggleTheme } from '../../hooks/useToggleTheme'
import useSelfDraftHobbies from '../../hooks/setup/useSelfDraftHobbies'

// Define the main validation schema
export const hobbiesValidationSchema = Yup.object().shape({
  hobbies: Yup.array().of(Yup.number().required()).required().min(5, "Select at least 5 interests"),
});

const Setup5Hobbies: FC<RouteComponentProps> = ({ match }) => {
  useIonViewWillEnter(() => {
    hideTabBar();
  });
  const hcqR = useHobbyCategories();
  const hqR = useHobbies();
  const selfDraftHbbysQry = useSelfDraftHobbies();

  const [searchOpen, setSearchOpen] = useState(false);
  const [hobsSearch, setHobsSearch] = useState("");
  const [debouncedHobsSearch] = useDebounceValue(hobsSearch, 300);
  const [filteredHobbies, setFilteredHobbies] = useState<HobbyType[]>(
    hqR.data ?? []
  );

  const handleSearch = (e: CustomEvent) => {
    setHobsSearch(e.detail.value);
  }
  useEffect(() => {
    if (hqR.data) {
      setFilteredHobbies(
        hqR.data.filter((h) =>
          h.title.toLowerCase().includes(hobsSearch.toLowerCase())
        )
      );
    }
  }, [debouncedHobsSearch, hqR.data]);

  const toggleSearch = () => {
    setSearchOpen(e => !e);
    animateSearchBar(!searchOpen);
    // focus on searchbar when opened
    if (!searchOpen) {
      setTimeout(() => {
        searchbarRef.current?.setFocus();
      }, 300);
    }
  }

  const searchbarRef = useRef<HTMLIonSearchbarElement>(null);
  const animateSearchBar = (open: boolean) => {
    if (searchbarRef.current) {
      const animation = createAnimation()
        .addElement(searchbarRef.current)
        .duration(300)
        .easing('ease-in-out');

      if (open) {
        animation
          .fromTo('transform', 'translateY(100%)', 'translateY(0)')
          .fromTo('opacity', '0', '1');
      } else {
        animation
          .fromTo('transform', 'translateY(0)', 'translateY(100%)')
          .fromTo('opacity', '1', '0');
      }

      animation.play();
    }
  }

  const footerRef = useRef<HTMLIonFooterElement>(null);
  const animateFooter = (show: boolean) => {
    if (footerRef.current) {
      const animation = createAnimation()
        .addElement(footerRef.current)
        .duration(300)
        .easing('ease-in-out');

      if (show) {
        animation
          .fromTo('transform', 'translateY(100%)', 'translateY(0)')
          .fromTo('opacity', '0', '1');
      } else {
        animation
          .fromTo('transform', 'translateY(0)', 'translateY(100%)')
          .fromTo('opacity', '1', '0');
      }

      animation.play();
    }
  }

  const { handleSubmit, setValue } = useForm<NewStudentTypeSteps["step4"]>({
    resolver: yupResolver(hobbiesValidationSchema)
  });
  const [selectedHobbyIds, setSelectedHobbyIds] = useState<number[]>([]);
  const toggleHobbySelection = (hobbyId: number) => {
    setSelectedHobbyIds(prevIds => {
      const newIds = prevIds.includes(hobbyId)
        ? prevIds.filter(id => id !== hobbyId)
        : [...prevIds, hobbyId];
      setValue("hobbies", newIds)

      if (newIds.length === 5 && prevIds.length < 5) {
        animateFooter(true);
      } else if (newIds.length < 5 && prevIds.length >= 5) {
        animateFooter(false);
      }

      return newIds;
    });
  }
  const isHobbySelected = (hobbyId: number) => selectedHobbyIds.includes(hobbyId);
  const getInterestMessage = () => {
    const count = selectedHobbyIds.length  + newHobbies.filter(h => h.selected).length;
    switch (count) {
      case 0:
        return "Add five hobbies to find even more klasmeyts";
      case 1:
        return "Great start! You can add up to 4 more interests";
      case 2:
      case 3:
        return `Nice choices! You can add up to ${5 - count} more`;
      case 4:
        return "Excellent! You can add one more interest if you'd like";
      default:
        return `Perfect! You've selected ${count} interests. Feel free to add more`;
    }
  }

  const [newHobbies, setNewHobbies] = useState<{
    id: number;
    title: string;
    selected: boolean;
  }[]>([]);
  const handleAddCustomHobby = () => {
    setNewHobbies((prevHobbies) => [...prevHobbies, { id: prevHobbies.length, title: hobsSearch, selected: true }]);
    setHobsSearch("");
  }
  const toggleCustomHobbySelection = (id: number) => {
    setNewHobbies((prevHobbies) => prevHobbies.map((h) => h.id === id ? { ...h, selected: !h.selected } : h));
  }
  const isCustomHobbySelected = (index: number) => newHobbies[index].selected;

  const { handleDraftHobbies, handleNext: next, uploading } = useSetupDraftStudent();
  const setNewStudent = useSetAtom(newStudentAtom);
  const ds = useSelfSetupDraftStudent();
  const handlePageNext: SubmitHandler<NewStudentTypeSteps['step4']> = async (data) => {
    console.log("selected hobbies", selectedHobbyIds);

    setNewStudent(prevStudent => ({
      ...prevStudent,
      step4: {
        ...prevStudent.step4,
        hobbyIds: selectedHobbyIds
      }
    }));

    await handleDraftHobbies(data, ds.data?.id!, newHobbies);

    await next();
  }
  const handlePageError: SubmitErrorHandler<NewStudentTypeSteps['step4']> = (errors) => {
    console.error(errors)
  }

  const [darkMode] = useToggleTheme('darkModeActivated', 'ion-palette-dark');

  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton
                defaultHref={"/" + match.path.split("/")[1]}
                text=""
              />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={toggleSearch}>
                <IonIcon src={search} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow className="pb-[20px]">
            <IonCol>
              <IonText className="text-center">
                <h3>Interests</h3>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText className='text-center'>
                <h4>{getInterestMessage()}</h4>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow className='mx-[-10px]'>
            <IonSearchbar
              ref={searchbarRef}
              style={{ display: searchOpen ? 'block' : 'none' }}
              value={hobsSearch}
              onIonInput={(e) => {
                handleSearch(e);
                setHobsSearch(e.detail.value!);
              }}
              placeholder='Search topics'
            />
          </IonRow>

          {/* If the search bar is not empty and no hobbies are found,
            the user can add a custom hobby by clicking on this chip */}
          {(filteredHobbies.length === 0 &&
            !hcqR.isLoading &&
            !hqR.isLoading &&
            !selfDraftHbbysQry.isFetching &&
            hobsSearch.length !== 0) && (
              <IonRow className='mx-[-5px]'>
                <IonChip
                  className={`${darkMode ? 'outline outline-1' : ''}`}
                  onClick={handleAddCustomHobby}
                  disabled={selfDraftHbbysQry.isLoading === true || uploading}
                >
                  <IonText>{hobsSearch}</IonText>
                </IonChip>
              </IonRow>
            )}

          {/* A custom hobby is a hobby that is not in the list of hobbies. 
              You can add a custom hobby by typing the hobby in the search bar 
              and clicking on the hobby that appears in the search results.   */}
          {(!hcqR.isLoading &&
            !hqR.isLoading &&
            !selfDraftHbbysQry.isFetching &&
            hobsSearch.length == 0) &&
            newHobbies.map((h, i) => (
              <IonChip
                key={i}
                color={isCustomHobbySelected(h.id) ? "primary" : undefined}
                onClick={() => toggleCustomHobbySelection(h.id)}
                className={`${darkMode ? 'outline outline-1' : ''}`}
                disabled={selfDraftHbbysQry.isLoading === true || uploading}
              >
                <IonText>
                  <p>{h.title}</p>
                </IonText>
              </IonChip>
            ))}

          {/* Displays the custom hobbies of other users */}
          {(!hcqR.isLoading &&
            !hqR.isLoading &&
            !selfDraftHbbysQry.isFetching) &&
            filteredHobbies
              .filter((h) => h.category_id === null)
              .map((h, i) => (
                <IonChip
                  key={i}
                  color={isHobbySelected(h.id) ? "primary" : undefined}
                  onClick={() => toggleHobbySelection(h.id)}
                  className={`${darkMode ? 'outline outline-1' : ''}`}
                  disabled={selfDraftHbbysQry.isLoading === true || uploading}
                >
                  <IonText>
                    <p>{h.title}</p>
                  </IonText>
                </IonChip>
              ))}

          {/* Hobbies from our database */}
          {hcqR.data && hcqR.data.map((hc) => {
            const hobbiesInCategory = filteredHobbies.filter((h) => h.category_id === hc.id);
            if (hobbiesInCategory.length === 0) {
              return null; // Skip rendering this category if no hobbies match
            }
            return (
              <IonGrid className='mx-[-5px]' key={hc.id}>
                <IonRow>
                  <IonCol>
                    <IonText>
                      <h6 className="font-semibold">{hc.title}</h6>
                    </IonText>
                  </IonCol>
                </IonRow>
                <IonRow className='mx-[-5px] mt-[-12px]'>
                  <IonCol>
                    {filteredHobbies && filteredHobbies.filter((h) => h.category_id === hc.id).map((h) => (
                      <IonChip
                        key={h.id}
                        color={isHobbySelected(h.id) ? "primary" : undefined}
                        onClick={() => toggleHobbySelection(h.id)}
                        className={`${darkMode ? 'outline outline-1' : ''}`}
                        disabled={selfDraftHbbysQry.isLoading === true || uploading}
                      >
                        <IonText>
                          <p>{h.title}</p>
                        </IonText>
                      </IonChip>
                    ))}
                  </IonCol>
                </IonRow>
              </IonGrid>
            )
          })}
        </IonGrid>
      </IonContent>
      <IonFooter ref={footerRef} style={{ display: selectedHobbyIds.length >= 5 ? 'block' : 'none' }}>
        <IonToolbar className='p-4'>
          <IonButton
            shape="round"
            slot="end"
            size="small"
            expand="block"
            onClick={handleSubmit(handlePageNext, handlePageError)}
            disabled={uploading}
          >
            <IonText className='py-3'>
              {uploading ? <IonSpinner name="dots" /> : "Next"}
            </IonText>
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
}

export default Setup5Hobbies