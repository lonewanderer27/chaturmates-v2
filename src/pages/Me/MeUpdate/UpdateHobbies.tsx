import { createAnimation, IonBackButton, IonButton, IonButtons, IonChip, IonCol, IonContent, IonGrid, IonPage, IonRow, IonSearchbar, IonSpinner, IonText, IonTitle, IonToolbar, useIonRouter, useIonViewWillEnter } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import useHobbies from '../../../hooks/hobbies/useHobbies';
import useHobbyCategories from '../../../hooks/hobbies/useHobbyCategories';
import { HobbyType } from '../../../types';
import { hideTabBar } from '../../../utils/TabBar';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { NewStudentTypeSteps } from '../../../types/student/post/NewStudentType';
import { hobbiesValidationSchema } from '../../Setup/Setup5Hobbies';
import useSelfHobbies from '../../../hooks/student/useSelfHobbies';
import MeLoaderCard from '../../../components/Me/MeLoaderCard';
import client from '../../../client';
import useSelfStudentLite from '../../../hooks/student/useSelfStudentLite';

const UpdateHobbies = () => {
  useIonViewWillEnter(() => {
    hideTabBar();
  });
  const [uploading, setUploading] = useState(false);
  const { hobbies, query: hobbiesQuery } = useSelfHobbies();
  const hcqR = useHobbyCategories();
  const hqR = useHobbies();

  const [hobsSearch, setHobsSearch] = useState("");
  const [filteredHobbies, setFilteredHobbies] = useState<HobbyType[]>(
    hqR.data ?? []
  );
  useEffect(() => {
    if (hqR.data) {
      setFilteredHobbies(
        hqR.data.filter((h) =>
          h.title.toLowerCase().includes(hobsSearch.toLowerCase())
        )
      );
      console.log("filtered hobbies", filteredHobbies);
    }
  }, [hobsSearch, hqR.data]);
  const { handleSubmit, setValue } = useForm<NewStudentTypeSteps["step4"]>({
    resolver: yupResolver(hobbiesValidationSchema)
  });
  const [selectedHobbyIds, setSelectedHobbyIds] = useState<number[]>(() => hobbies.map(h => h.id));
  const toggleHobbySelection = (hobbyId: number) => {
    setSelectedHobbyIds(prevIds => {
      const newIds = prevIds.includes(hobbyId)
        ? prevIds.filter(id => id !== hobbyId)
        : [...prevIds, hobbyId];
      setValue("hobbies", newIds)

      return newIds;
    });
  }
  useEffect(() => {
    setSelectedHobbyIds(hobbies.map(h => h.id));
  }, [hobbiesQuery.data]);
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

  const rt = useIonRouter();
  const { student } = useSelfStudentLite();
  const handlePageNext: SubmitHandler<NewStudentTypeSteps['step4']> = async (data) => {
    console.log("selected hobbies", selectedHobbyIds);

    // let's upload the hobbies
    setUploading(() => true);

    // Remove the existing student hobbies
    const { error: deleteError } = await client
      .from("student_hobbies")
      .delete()
      .eq("student_id", student?.id!);

    if (deleteError) {
      console.error("Error deleting student hobbies", deleteError);
      return setUploading(() => false);
    }

    // Create the hobbies object that will be uploaded
    const hbbys = hqR.data!.filter(h => selectedHobbyIds.includes(h.id)).map(h => ({
      student_id: student?.id!,
      hobby_id: h.id
    }));

    // Upload the hobbies
    const { error } = await client
      .from("student_hobbies")
      .insert(hbbys);

    if (error) {
      console.error("Error uploading student hobbies", error);
      return setUploading(() => false);
    }

    setUploading(() => false);

    // go back to me page
    // lets try if we can pop to the me page
    if (rt.canGoBack()) {
      rt.goBack();
    } else {
      // rt.push("/discover/me");

      // lets try if we can pop to the either discover or community me page
      rt.push("/"+rt.routeInfo.pathname.split("/")[1]+"/me");
    }
  }
  const handlePageError: SubmitErrorHandler<NewStudentTypeSteps['step4']> = (errors) => {

  }

  return (
    <IonPage>
      <IonContent>
        <IonContent className='ion-padding'>
          <IonToolbar>
            <IonButtons>
              <IonBackButton
                defaultHref={"/"+rt.routeInfo.pathname.split("/")[1]+"/me"}
                text='Me'
              />
            </IonButtons>
            <IonTitle>
              Update Interests
            </IonTitle>
            <IonButtons slot='end'>
              <IonButton
                disabled={hobbiesQuery.isLoading || selectedHobbyIds.length < 5 || uploading}
                onClick={handleSubmit(handlePageNext, handlePageError)}
              >
                {uploading ? <IonSpinner name="dots" /> : "Save"}
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonText className='text-center'>
                  <h4>{getInterestMessage()}</h4>
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonGrid>
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
            {(hcqR.data && !hqR.isLoading && !hobbiesQuery.isLoading) && hcqR.data.map((hc) => {
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
                      {filteredHobbies && 
                      filteredHobbies
                      .filter((h) => h.category_id === hc.id).map((h) => (
                        <IonChip
                          key={h.id}
                          color={isHobbySelected(h.id) ? "primary" : undefined}
                          onClick={() => toggleHobbySelection(h.id)}
                          className="outline outline-1"
                          disabled={hobbiesQuery.isLoading === true || uploading}
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
      </IonContent>
    </IonPage>
  )
}

export default UpdateHobbies