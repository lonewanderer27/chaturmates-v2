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
import useSetup from '../../hooks/setup/useSetup'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import useSetupDraftStudent from '../../hooks/setup/useSetupDraftStudent'
import useSelfDraftStudent from '../../hooks/student/useSelfDraftStudent'
import { hideTabBar } from '../../utils/TabBar'

// Define the main validation schema
const validationSchema = Yup.object().shape({
  hobbies: Yup.array().of(Yup.number().required()).required().min(5, "Select at least 5 interests"),
});

const Setup5Hobbies: FC<RouteComponentProps> = ({ match }) => {
  useIonViewWillEnter(() => {
    hideTabBar();
  });
  const hcqR = useHobbyCategories();
  const hqR = useHobbies();

  const [searchOpen, setSearchOpen] = useState(false);
  const [hobsSearch, setHobsSearch] = useState("");
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
  }, [hobsSearch, hqR.data]);

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
    resolver: yupResolver(validationSchema)
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
    const count = selectedHobbyIds.length;
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
        return "Perfect! You've selected 5 interests. Feel free to add more";
    }
  }

  const { handleDraftHobbies, handleNext: next, uploading } = useSetupDraftStudent();
  const setNewStudent = useSetAtom(newStudentAtom);
  const ds = useSelfDraftStudent();
  const handlePageNext: SubmitHandler<NewStudentTypeSteps['step4']> = async (data) => {
    console.log("selected hobbies", selectedHobbyIds);

    setNewStudent(prevStudent => ({
      ...prevStudent,
      step4: {
        ...prevStudent.step4,
        hobbyIds: selectedHobbyIds
      }
    }));

    // await handleUploadInterests(selectedHobbyIds);
    await handleDraftHobbies(data, ds.data?.id!);

    await next();
  }
  const handlePageError: SubmitErrorHandler<NewStudentTypeSteps['step4']> = (errors) => {
    console.error(errors)
  }

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
            <IonSearchbar
              ref={searchbarRef}
              style={{ display: searchOpen ? 'block' : 'none' }}
              value={hobsSearch}
              onIonInput={(e) => {
                handleSearch(e);
                setHobsSearch(e.detail.value!);
              }}
              placeholder='Search interests'
            />
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
              <IonText>
                <h4>{getInterestMessage()}</h4>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              {hqR.data && hqR.data.filter(hq => hq.category_id === null).map(hq => (
                <IonChip
                  key={hq.id}
                  color={isHobbySelected(hq.id) ? "primary" : undefined}
                  onClick={() => toggleHobbySelection(hq.id)}
                  className="outline outline-1"
                >
                  <IonText>
                    <p>{hq.title}</p>
                  </IonText>
                </IonChip>
              ))}
            </IonCol>
          </IonRow>
          {hcqR.data && hcqR.data.map((hc) => {
            const hobbiesInCategory = filteredHobbies.filter((h) => h.category_id === hc.id);
            if (hobbiesInCategory.length === 0) {
              return null; // Skip rendering this category if no hobbies match
            }
            return (
              <>
                <IonRow key={hc.id}>
                  <IonCol>
                    <IonText>
                      <h6>{hc.title}</h6>
                    </IonText>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    {filteredHobbies && filteredHobbies.filter((h) => h.category_id === hc.id).map((h) => (
                      <IonChip
                        key={h.id}
                        color={isHobbySelected(h.id) ? "primary" : undefined}
                        onClick={() => toggleHobbySelection(h.id)}
                        className="outline outline-1"
                      >
                        <IonText>
                          <p>{h.title}</p>
                        </IonText>
                      </IonChip>
                    ))}
                  </IonCol>
                </IonRow>
              </>
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