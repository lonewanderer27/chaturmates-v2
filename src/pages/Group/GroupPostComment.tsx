import { GroupCommentType, StudentType } from '../../types'
import { IonIcon, IonItem, IonText } from '@ionic/react'

import { personCircleOutline } from 'ionicons/icons'
import { useMemo } from 'react'

const GroupPostComment = (props: {
  student: StudentType;
  comment: GroupCommentType;
}) => {
  const isValidUrl = useMemo(() => {
    try {
      new URL(props.student?.avatar_url + "");
      return true;
    } catch (_) {
      return false;
    }
  }, [props.student?.avatar_url]);

  return (
    <div className="bg-slate-100 pb-6">
      <div className='flex items-center'>
        {props?.student?.avatar_url && isValidUrl ? (
          <>
            <img className="w-6 h-auto rounded-full" src={props!.student.avatar_url} />
          </>
        ) : (
          <IonIcon
            className="text-2xl"
            slot="start"
            icon={personCircleOutline}
          ></IonIcon>
        )}
        <IonText className="text-sm ml-2" color="medium">{props!.student.full_name}</IonText>
      </div>
      <IonText className="font-poppins text-sm">
        <p className=' mt-3'>
          {props.comment.content}
        </p>
      </IonText>
    </div>
  )
}

export default GroupPostComment