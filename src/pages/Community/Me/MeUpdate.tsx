import { IonBackButton, IonButton, IonButtons, IonCardContent, IonContent, IonFooter, IonGrid, IonHeader, IonInput, IonLabel, IonList, IonPage, IonRow, IonSpinner, IonText, IonTextarea, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import React, { FC } from 'react'
import { hideTabBar, showTabBar } from '../../../utils/TabBar'

import { Controller } from 'react-hook-form'
import MemberAvatarLarge from '../../../components/Me/MemberAvatarLarge'
import { RouteComponentProps } from 'react-router'
import StudentItem from '../../../components/SearchPage/StudentItem'
import useSelfStudent from '../../../hooks/student'
import useUpdateInfo from '../../../hooks/me/useUpdateInfo'

const MeUpdate: FC<RouteComponentProps> = ({ match }) => {
  const { student, profile, groups, school, academic_year, following, followers } = useSelfStudent();
  const { handleSubmit, handleSave, handleError, setValue, register, saving, control } = useUpdateInfo();
  useIonViewWillEnter(() => {
    hideTabBar();
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton disabled={saving} className='ml-2' defaultHref="/community" text={""} />
          </IonButtons>
          <IonTitle>Update Your Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <MemberAvatarLarge avatarUrl={student?.avatar_url} />
        <div className="pt-20 bg-slate-200 rounded-xl px-4">
          <IonGrid>
            <IonRow>
              <IonLabel className='font-poppins font-semibold text-l' color="medium">Full Name</IonLabel>
              <Controller
                render={({ field: { value, onChange, onBlur }, fieldState: { error, isTouched } }) => (
                  <IonInput
                    className={`${error && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                    fill="outline"
                    value={value}
                    onIonChange={onChange}
                    onIonBlur={onBlur}
                    errorText={error?.message}
                  />
                )}
                name="fullName"
                control={control}
              />
            </IonRow>
            <IonRow>

            </IonRow>
          </IonGrid>
        </div>
        <div className='mt-4 rounded-xl bg-slate-200'>
          <IonCardContent>
            <IonLabel className='font-poppins font-semibold text-l' color="medium">Bio</IonLabel>
            <Controller
              render={({ field: { value, onChange, onBlur }, fieldState: { error, isTouched } }) => (
                <IonTextarea
                  autoGrow counter
                  className={`${error && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                  fill="outline"
                  value={value}
                  onIonChange={onChange}
                  onIonBlur={onBlur}
                  errorText={error?.message}
                />
              )}
              name="description"
              control={control}
            />
          </IonCardContent>
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar className="p-3">
          <IonButton
            className="font-poppins font-bold"
            expand="block"
            onClick={() => {
              handleSubmit(handleSave, handleError);
              console.log("Submitting new profile info")
            }}
          >
            {saving ? <IonSpinner name="dots" /> : <IonText>Update Profile</IonText>}
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
}

export default MeUpdate