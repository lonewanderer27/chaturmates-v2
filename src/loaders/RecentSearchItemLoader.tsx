import { IonChip, IonSkeletonText } from '@ionic/react'

const RecentSearchItemLoader = () => {
  return (
    <IonChip>
      <IonSkeletonText animated className="h-[30px] w-[100px] my-[-20px] mx-[-30px]" />
    </IonChip>
  )
}

export default RecentSearchItemLoader