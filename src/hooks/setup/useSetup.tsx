import { SetupProgressType } from '../../types/setup';
import { useIonRouter } from '@ionic/react';
import useSession from '../auth/useSession'
import { useState } from 'react'
import { useSteps } from '../useSteps';

export default function useSetup() {
  const [progress, setProgress] = useState<SetupProgressType["progress"]>([
    { Intro: false },
    { PdfOrManual: false },
    { Course_YrLevel_Type: false },
    { Subjects: false },
  ]);
  const stepHookParts = useSteps(4);
  const rt = useIonRouter();

  const checkProgress = async () => {console.log(stepHookParts)
    // calls the edge function to check the progress of the user
  }

  const handleNext = () => {
    switch (stepHookParts.currentStep) {
      case 0:
        setProgress([{ Intro: true }, { PdfOrManual: false }, { Course_YrLevel_Type: false }, { Subjects: false }]);
        rt.push('/setup/pdfOrManual');
        console.log("going to pdfOrManual")
        break;
      case 1:
        setProgress([{ Intro: true }, { PdfOrManual: true }, { Course_YrLevel_Type: false }, { Subjects: false }]);
        rt.push('/setup/courseYrLevelType');
        console.log("going to courseYrLevelType")
        break;
      case 2:
        setProgress([{ Intro: true }, { PdfOrManual: true }, { Course_YrLevel_Type: true }, { Subjects: false }]);
        rt.push('/setup/subjects');
        console.log("going to subjects")
        break;
      case 3:
        setProgress([{ Intro: true }, { PdfOrManual: true }, { Course_YrLevel_Type: true }, { Subjects: true }]);
        rt.push('/setup/finish');
        console.log("going to finish")
        break;
    }
    if (stepHookParts.currentStep < 3) {
      stepHookParts.goToNextStep();
    }
    console.log(stepHookParts.currentStep)
  }

  const handlePrev = () => {
    switch (stepHookParts.currentStep) {
      case 0:
        setProgress([{ Intro: false }, { PdfOrManual: false }, { Course_YrLevel_Type: false }, { Subjects: false }]);
        rt.push('/discover');
        break;
      case 1:
        setProgress([{ Intro: true }, { PdfOrManual: false }, { Course_YrLevel_Type: false }, { Subjects: false }]);
        rt.push('/setup');
        break;
      case 2:
        setProgress([{ Intro: true }, { PdfOrManual: true }, { Course_YrLevel_Type: false }, { Subjects: false }]);
        rt.push('/setup/pdfOrManual');
        break;
      case 3:
        setProgress([{ Intro: true }, { PdfOrManual: true }, { Course_YrLevel_Type: true }, { Subjects: false }]);
        rt.push('/setup/courseYrLevelType');
        break;
    }
    if (stepHookParts.currentStep > 0) {
      stepHookParts.goToPrevStep();
    }
    console.log(stepHookParts.currentStep)
  }

  return {
    progress,
    checkProgress,
    ...stepHookParts,
    handlePrev,
    handleNext
  }
}
