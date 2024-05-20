import { GroupPostType, GroupType } from '../../types';
import { IonCard, useIonRouter } from '@ionic/react';

import { useHistory } from 'react-router';

const AdminPostCard = (props: {
  group?: GroupType;
  post?: GroupPostType;
  icon?: string;
}) => {
  const rt = useIonRouter();
  const hst = useHistory();

  const handleClick = () => {
    hst.push(`${rt.routeInfo.pathname}/group/vu/${props.group?.vanity_id}/post/${props.post?.id}`, {
      post_id: props.post?.id,
      vanity_url: props.group?.vanity_id
    });
  };

  return (
    <IonCard className='my-0' onClick={handleClick}>
      <img src={props.post?.image_url!} />
    </IonCard>
  )
}

export default AdminPostCard