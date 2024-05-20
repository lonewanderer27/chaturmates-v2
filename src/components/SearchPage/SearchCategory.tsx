import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';

import { ComponentProps } from 'react'
import { SEARCH_CATEGORY } from '../../enums/search';

type IonSegmentProps = ComponentProps<typeof IonSegment>;

export default function SearchCategory(
  props: IonSegmentProps & {
    setActivePage: (category: SEARCH_CATEGORY) => void;
  }
) {
  return (
    <IonSegment
      mode="ios"
      value={props.value ?? SEARCH_CATEGORY.ALL}
      onIonChange={(e) =>
        props.setActivePage(e.target.value as SEARCH_CATEGORY)
      }
      {...props}
    >
      <IonSegmentButton value={SEARCH_CATEGORY.ALL}>
        <IonLabel className='font-poppins font-semibold'>All</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value={SEARCH_CATEGORY.POST}>
        <IonLabel className='font-poppins font-semibold'>Post</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value={SEARCH_CATEGORY.GROUPS}>
        <IonLabel className='font-poppins font-semibold'>Groups</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value={SEARCH_CATEGORY.KLASMEYTS}>
        <IonLabel className='font-poppins font-semibold'>Klasmeyts</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  )
}
