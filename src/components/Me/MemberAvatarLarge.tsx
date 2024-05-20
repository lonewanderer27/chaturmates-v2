import { IonIcon, IonRow } from '@ionic/react'
import { peopleCircle, person, personCircleOutline } from 'ionicons/icons'

const MemberAvatarLarge = (props: {
  avatarUrl: string | null | undefined
}) => {
  return (
    <IonRow className="justify-center mb-[-65px] z-[500]">
      {props.avatarUrl ? <>
        <div>
          <img className="w-32 rounded-full" src={props.avatarUrl} />
        </div>
      </> : <>
        <div className='flex rounded-full p-[0.5] bg-white'>
          <IonIcon
            className="text-9xl"
            src={personCircleOutline}
          />
        </div>
      </>}
    </IonRow>
  )
}

export default MemberAvatarLarge