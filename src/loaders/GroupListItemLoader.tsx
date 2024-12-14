import { IonItem, IonLabel, IonSkeletonText } from '@ionic/react'
import { useRef } from 'react';

const GroupListItemLoader = () => {
  // Use useRef to store the title width if the title is not provided
  const titleWidthRef = useRef<number | undefined>(Math.floor(Math.random() * 150) + 80 // Width between 80px and 160px
  );

  return (
    <IonItem lines="none" className='my-2 rounded-lg'>
      <IonSkeletonText animated style={{ width: '38px', height: '38px' }} slot="start" className='rounded-full my-3 ml-1' />
      <IonLabel className='ml-2'>
        <IonSkeletonText animated style={{ width: `${titleWidthRef.current}px`, height: '20px' }} className='rounded-lg' />
        <IonSkeletonText animated style={{ width: `80px`, height: '15px' }} className='rounded-lg mt-1' />
      </IonLabel>
    </IonItem>
  )
}

export default GroupListItemLoader