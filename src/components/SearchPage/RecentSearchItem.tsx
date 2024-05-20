import { IonChip, IonIcon, IonLabel } from '@ionic/react'
import React, { ComponentProps } from 'react'
import { closeCircle, closeCircleOutline, closeCircleSharp, timeOutline } from 'ionicons/icons';
import { useAtom, useSetAtom } from 'jotai';

import { searchQueryAtom } from '../../atoms/search';
import useGroupSearch from '../../hooks/group/useGroupSearch';
import useSearch from '../../hooks/search/useSearch';
import useSearchHistory from '../../hooks/search/useSearchHistory';
import useStudentSearch from '../../hooks/student/useStudentSearch';

type IonChipProps = ComponentProps<typeof IonChip>;

const RecentSearchItem = (props: IonChipProps & {
  historyId: number;
  icon: string;
  query: string;
  closeIcon: string;
  lines: string;
}) => {
  const setQuery = useSetAtom(searchQueryAtom);
  const { handleGroupSearch } = useGroupSearch();
  const { handleStudentsSearch } = useStudentSearch();
  const { handleHide } = useSearchHistory();
  const { handleSearch } = useSearch();

  const handleClick = () => {
    setQuery(props.title ?? "")
    handleGroupSearch(props.title ?? "")
    handleStudentsSearch(props.title ?? "")
    handleSearch(props.title ?? "")
  }

  return (
    <IonChip>
      <IonLabel onClick={handleClick} className='cursor-pointer'>
        {props.title}
      </IonLabel>
      <IonIcon
        onClick={() => handleHide(props.historyId)}
        icon={props.closeIcon}
      ></IonIcon>
    </IonChip>
  )
}

export default RecentSearchItem

RecentSearchItem.defaultProps = {
  id: 0,
  icon: timeOutline,
  query: "Johnna Doe",
  closeIcon: closeCircle,
  lines: "none",
};