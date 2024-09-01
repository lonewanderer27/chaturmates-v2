import { IonCard, IonSkeletonText } from '@ionic/react'

const AdminPostCardLoader = () => {
  return (
    <IonCard>
      <IonSkeletonText animated className="h-[225px] w-full my-[-2px] " />
    </IonCard>
  )
}

export default AdminPostCardLoader