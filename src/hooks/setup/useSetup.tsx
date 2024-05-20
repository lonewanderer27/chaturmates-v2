import { SetupProgressType } from '../../types/setup';
import client from '../../client';
import useSession from '../auth/useSession'
import { useState } from 'react'

export default function useSetup() {
  const [progress, setProgress] = useState<SetupProgressType["progress"]>([
    { studentNo: false },
    { course: false },
    { type: false },
    { yearLevel: false },
    { subjects: false },
  ]);
  const { session } = useSession();

  const checkProgress = async () => {
    // calls the edge function to check the progress of the user
  }

  const handleBack = () => {
    
  }

  const handleNext = () => {
    
  }

  const handleSetup = () => {
    // Our goal is have this function to be called
    // whenever our user logins to the app
    // using Adamson Google Account or Email
    // we shall check if there's already a user & profile
    // then we'll check if they're a student and has already setup their profile
    // these are conditions to be met before we can allow them to use the app
    // a student record must be existing in the database
    // if not, we shall redirect them to the setup page
    // where they will setup one information at a time
    // otherwise, we shall redirect them to the home page
  }

  return {
    progress,
    checkProgress,
    handleBack,
    handleNext,
    handleSetup
  }
}
