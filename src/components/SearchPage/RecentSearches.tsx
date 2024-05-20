import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonChip } from '@ionic/react'

import React from 'react'
import RecentSearchItem from './RecentSearchItem';
import { SearchHistoryType } from '../../types'
import useSelfStudent from '../../hooks/student';

const RecentSearches = (props: {
  searchHistory?: SearchHistoryType[];
}) => {
  const { student } = useSelfStudent();

  if (props.searchHistory?.length === 0) {
    return <></>
  }

  if (!student) {
    return <></>
  }

  return (
    <IonCard color="light" className='mx-[-20px] shadow-none rounded-2xl mt-5'>
      <IonCardHeader>
        <IonCardSubtitle>Recent Searches</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent className='px-4 my-0'>
        {props.searchHistory?.slice(0, 7).map((search, index) => (
          <RecentSearchItem historyId={search.id!} key={search + "index" + index} title={search.query} />
        ))}
      </IonCardContent>
    </IonCard>
  )
}

export default RecentSearches