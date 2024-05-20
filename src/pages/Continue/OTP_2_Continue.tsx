import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonText, IonToolbar, useIonRouter } from '@ionic/react'
import React, { useState } from 'react';

import OtpInput from 'react-otp-input';
import { PostgrestError } from '@supabase/supabase-js';
import { RouteComponentProps } from 'react-router';
import { chevronForward } from 'ionicons/icons'
import useOTP from '../../hooks/useOTP'

const OTP_2_Continue: React.FC<RouteComponentProps> = ({ location }) => {
  const rt = useIonRouter();
  const query = new URLSearchParams(location.search);
  const email = query.get("email") ?? "";
  console.log("email: ", email)

  const [otpInput, setOtpInput] = useState<string>("");
  const onOTPSuccess = () => {
    console.log("OTP entered by user is correct")
  }
  const onOTPFailure = (error: PostgrestError) => {
    console.log("Error: ", error)
  }

  const { handleVerify, processing } = useOTP({ handleSuccess: onOTPSuccess, handleFailure: onOTPFailure })

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/continue' />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding'>
        <IonGrid className='mt-5'>
          <IonRow className='my-2'>
            <IonText className="text-3xl font-poppins font-bold">Verification</IonText>
          </IonRow>
          <IonRow className='my-2'>
            <IonText className=" font-poppins">Enter the 6-digit code sent to your email</IonText>
          </IonRow>
          <IonRow className='ml-[-4px] my-2'>
            <OtpInput
              numInputs={6}
              inputType='tel'
              value={otpInput}
              onChange={e => {
                console.log(e)
                setOtpInput(e)
              }}
              containerStyle={"flex flex-row justify-center mt-3"}
              inputStyle={"border-2 mx-1 rounded-lg w-25 font-poppins text-center text-5xl"}
              renderInput={(props) => <input {...props} />}
            />
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter className='ion-padding'>
        <IonButton onClick={() => handleVerify(otpInput, email)} expand='block' className='mt-5' disabled={otpInput?.length < 6 ? true : false}>
          {!processing && <>
            Continue
            <IonIcon slot="end" src={chevronForward} />
          </>}
          {processing && "Verifying..."}
        </IonButton>
      </IonFooter>
    </IonPage>
  )
}

export default OTP_2_Continue;