import React, { useRef } from 'react';
import { IonCard, IonCardContent, IonText, IonSkeletonText } from '@ionic/react';

interface LoaderCardProps {
  title?: string;
  numChips?: number;
  hideChips?: boolean;
  showParagraph?: boolean;
  paragraphLines?: number;
}

const MeLoaderCard: React.FC<LoaderCardProps> = ({
  title,
  numChips,
  showParagraph,
  hideChips,
  paragraphLines,
}) => {
  // Use useRef to store the chip count so it doesn't change on rerenders
  const chipCountRef = useRef<number>(
    numChips !== undefined ? numChips : Math.floor(Math.random() * 5) + 3
  );

  // Use useRef to store the title width if the title is not provided
  const titleWidthRef = useRef<number | undefined>(
    title ? undefined : Math.floor(Math.random() * 80) + 80 // Width between 80px and 160px
  );

  // Use useRef to store an array of random widths for the chips
  const chipWidthsRef = useRef<number[]>(
    Array.from({ length: chipCountRef.current }).map(
      () => Math.floor(Math.random() * 60) + 60 // Widths between 60px and 120px
    )
  );

  // Use useRef to store the number of paragraph lines
  const paragraphLinesRef = useRef<number>(
    showParagraph
      ? paragraphLines !== undefined
        ? paragraphLines
        : Math.floor(Math.random() * 3) + 3 // Random between 3 and 5 lines
      : 0
  );

  // Use useRef to store an array of random widths for the paragraph lines
  const paragraphWidthsRef = useRef<string[]>(
    Array.from({ length: paragraphLinesRef.current }).map(
      () => `${Math.floor(Math.random() * 30) + 70}%` // Width between 70% and 100%
    )
  );

  return (
    <IonCard className="mt-4 mx-0 rounded-xl shadow-none">
      <IonCardContent>
        <div>
          {title ? (
            <IonText className="text-xs font-bold" color="dark">
              {title}
            </IonText>
          ) : (
            <IonSkeletonText
              animated
              className="rounded-xl h-4"
              style={{ width: `${titleWidthRef.current}px` }}
            />
          )}
        </div>

        {showParagraph && (
          <div className="my-2">
            {paragraphWidthsRef.current.map((width, index) => (
              <IonSkeletonText
                key={index}
                animated
                style={{
                  width,
                  height: '16px',
                  marginBottom: '8px',
                  display: 'block',
                }}
                className='rounded-xl'
              />
            ))}
          </div>
        )}

        {!hideChips && (
          <div className="flex flex-wrap">
            {chipWidthsRef.current.map((width, index) => (
              <IonSkeletonText
                key={index}
                animated
                className="rounded-xl h-7 mr-2 mb-2"
                style={{ width: `${width}px` }}
              />
            ))}
          </div>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default MeLoaderCard;
