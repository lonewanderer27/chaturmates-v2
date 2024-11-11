import React from 'react'
import { GroupMemberType, GroupType, StudentType } from '../../types';
import { IonIcon, IonItem, IonLabel, useIonRouter } from '@ionic/react';
import { isValidUrl } from '../../utils/ValidUrl';
import { peopleCircleOutline } from 'ionicons/icons';

export interface GroupMemberType2 extends GroupMemberType {
  student: StudentType;
}

export interface RecommendGroupType2 extends GroupType {
  group_members: GroupMemberType2[];
}

const RealGroupListItem = (props: { group: RecommendGroupType2 }) => {
  const rt = useIonRouter();
  const handleClick = () => {
    rt.push("/discover/group/vu/" + props.group.vanity_id);
  };

  return (
    <IonItem lines="none" className='my-2 rounded-lg' onClick={handleClick}>
      {props.group.avatar_url && isValidUrl(props.group.avatar_url + "") ? (
        <img
          className="rounded-full w-[50px] h-auto mx-auto"
          src={props.group.avatar_url!}
          slot="start"
        />
      ) : (
        <IonIcon src={peopleCircleOutline} className="text-5xl" slot="start" />
      )}
      <IonLabel>{props.group.name}</IonLabel>
    </IonItem>
  )
}

export default RealGroupListItem