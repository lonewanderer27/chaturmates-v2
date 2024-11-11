import { IonItem, IonSkeletonText } from '@ionic/react'
import { useRef } from 'react';

const GroupListItemLoader = () => {
  // Use useRef to store the title width if the title is not provided
  const titleWidthRef = useRef<number | undefined>(Math.floor(Math.random() * 80) + 80 // Width between 80px and 160px
  );

  return (
    <IonItem lines="none" className='my-2 rounded-lg'>
      <IonSkeletonText animated style={{ width: '50px', height: '50px' }} slot="start" className='rounded-full my-3' />
      <IonSkeletonText animated style={{ width: `${titleWidthRef.current}px`, height: '20px' }} className='rounded-lg' />
    </IonItem>
  )
}

export default GroupListItemLoader