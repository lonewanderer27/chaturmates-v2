import { IonBackButton, IonButton, IonButtons, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonText, IonToolbar, useIonRouter } from '@ionic/react'

import { FC } from 'react'
import MemberAvatarLarge from '../../components/Me/MemberAvatarLarge'
import { RouteComponentProps } from 'react-router'
import useSelfStudent from '../../hooks/student'
import useSession from '../../hooks/auth/useSession'

const Me: FC<RouteComponentProps> = ({ match }) => {
  const { session } = useSession();
  const rt = useIonRouter();
  const { student, profile, groups, school, academic_year, following, followers } = useSelfStudent();

  const handleFollowing = () => {
    rt.push(rt.routeInfo.pathname+"/following")
  }

  const handleGroups = () => {
    rt.push(rt.routeInfo.pathname+"/groups")
  }

  const handleUpdate = () => {
    rt.push(rt.routeInfo.pathname+"/update")
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton className='ml-2' defaultHref="/community" text={""} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <MemberAvatarLarge avatarUrl={student?.avatar_url} />
        <div className="pt-16 bg-slate-200 rounded-xl">
          <IonCardContent>
            <div className='flex justify-end mt-[-30px] z-100'>
              <IonButton size="small" onClick={handleUpdate}>Edit</IonButton>
            </div>
            <IonGrid>
              <IonRow className='flex justify-center'>
                <IonText>{student?.full_name ?? "-"}</IonText>
              </IonRow>
              <IonRow className='flex justify-center mt-1'>
                <IonText className='text-sm capitalize' color="medium">{student?.type ?? "-"}</IonText>
              </IonRow>
              <IonRow className='text-center mt-2'>
                <IonCol className='cursor-pointer' onClick={handleFollowing}>
                  <IonText className='text-2xl'>{following?.length ?? "-"}</IonText>
                  <br />
                  <IonText className="text-sm">following</IonText>
                </IonCol>
                <IonCol className='cursor-pointer' onClick={handleGroups}>
                  <IonText className='text-2xl'>{groups?.length ?? "-"}</IonText>
                  <br />
                  <IonText className="text-sm">groups</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </div>
        <div className='mt-4 rounded-xl bg-slate-200'>
          <IonCardContent>
            <div>
              <IonText className='text-xs font-bold'>BIO</IonText><br />
            </div>
            <div className=''>
              <IonText className='text-sm'>{student?.description}</IonText>
            </div>
          </IonCardContent>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Me