import { IonCard, IonCol, IonRow, IonSkeletonText, IonThumbnail } from "@ionic/react"

const GroupCardLoader = () => {
  return (
    <IonCol size="6" className="flex flex-column w-full cursor-pointer">
      <IonCard className="groupCard ion-padding ion-no-margin w-full font-poppins">
        <IonRow>
          <IonThumbnail>
            <IonSkeletonText animated className="rounded-full"></IonSkeletonText>
          </IonThumbnail>
        </IonRow>
        <IonRow className="my-2">
          <IonSkeletonText animated className="h-5 rounded-md"></IonSkeletonText>
        </IonRow>
        <div className="avatar-group -space-x-3 rtl:space-x-reverse ml-[-2px]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="avatar" key={i}>
              <IonThumbnail className="h-7">
                <IonSkeletonText animated className="rounded-full"></IonSkeletonText>
              </IonThumbnail>
            </div>
          ))}
        </div>
      </IonCard>
    </IonCol>
  )
}

export default GroupCardLoader