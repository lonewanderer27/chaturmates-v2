import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonLabel, IonModal, IonRow, IonSpinner, IonText, IonTitle, IonToolbar, useIonRouter } from '@ionic/react'
import { object, string } from 'yup';

import { EmailOTP_Continue_Enum } from "../../enums/continue";
import OtpInput from 'react-otp-input';
import { chevronBackOutline } from 'ionicons/icons'
import client from "../../client";
import useSetup from "../../hooks/setup/useSetup";
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import MaskEmail from "../../utils/MaskEmail";

const schema = object({
  email: string().email().required().label("Email").matches(/^[a-zA-Z0-9._%+-]+@adamson\.edu\.ph$/, "Must be an Adamson Email"),
  code: string().label("Code").matches(/^[0-9]{6}$/, "Must be a 6-digit code")
})

const EmailOTP_1_Continue = (props: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const rt = useIonRouter();
  const { handleSubmit, control, setError, clearErrors, reset, getValues } = useForm<{ email: string, code?: string }>({ resolver: yupResolver(schema) });
  const [processing, setProcessing] = useState(false)
  const [state, setState] = useState<EmailOTP_Continue_Enum>(EmailOTP_Continue_Enum.InputEmail)


  const handleError: SubmitErrorHandler<{ email: string, code?: string }> = (errors, e) => {
    console.log(errors)
  }

  // Handle form submission
  const handleEmailOTPSuccess: SubmitHandler<{ email: string }> = async (data) => {
    console.log(data)
    // TODO: Send OTP Code using Supabase 

    setProcessing(true)

    const { data: data2, error } = await client.auth.signInWithOtp({
      email: data.email
    })

    if (error) {
      setError("email", {
        type: "manual",
        message: error.message
      })
      console.error(error)
      setProcessing(false)
      return;
    }

    console.log(data2)
    setProcessing(false)
    setState(EmailOTP_Continue_Enum.VerifyOTP)
  }

  // Handle OTP Submission
  const handleSubmitOTPSuccess: SubmitHandler<{ email: string, code?: string }> = async (data) => {
    // fail fast if the code is undefined
    if (!data.code) {
      setError("code", {
        type: "manual",
        message: "Code is required"
      })
      return;
    }

    // TODO: Verify OTP Code using Supabase
    console.log(data)

    setProcessing(true)

    const { data: data2, error } = await client.auth.verifyOtp({
      email: data.email,
      token: data.code,
      type: "email"
    })

    if (error) {
      setError("code", {
        type: "manual",
        message: error.message
      })
      console.error(error)
      setProcessing(false)
      return;
    }

    console.log(data2)
    setProcessing(false)
    reset();
    onOTPSuccess()
  }

  // Handle what happens if the OTP that was sent to user's email
  // matches the OTP that the user entered
  const onOTPSuccess = async () => {
    rt.push("/")
  }

  // Handles the back button
  // If the state is in VerifyOTP, it will go back to InputEmail
  // If the state is in InputEmail, it will close the modal 
  const handleBack = () => {
    if (state === EmailOTP_Continue_Enum.VerifyOTP) {
      // set the state back
      setState(EmailOTP_Continue_Enum.InputEmail)

      // reset the error from the OTP input
      clearErrors("code")
    } else {
      props.setOpen(false)
    }
  }

  return (
    <IonModal
      onDidDismiss={() => props.setOpen(false)}
      isOpen={props.open}
      breakpoints={[0, 0.50]}
      initialBreakpoint={0.50}
      backdropDismiss={false}
      handle={false}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleBack}>
              <IonIcon src={chevronBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>
            {state === EmailOTP_Continue_Enum.InputEmail ? "Continue with Email" : "Enter Verification Code"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        {state === EmailOTP_Continue_Enum.InputEmail && <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel className="font-poppins font-semibold text-lg">Adamson Email</IonLabel>
              <Controller
                render={({ field: { value, onChange, onBlur }, fieldState: { error, isTouched } }) => (
                  <IonInput
                    className={`${error && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                    fill="outline"
                    type="email"
                    value={value}
                    onIonChange={onChange}
                    onIonBlur={onBlur}
                    placeholder="Enter your Adamson Email"
                    errorText={error?.message}
                  />
                )}
                name="email"
                control={control}
              />
            </IonCol>
          </IonRow>
          <IonRow className="mt-4">
            <IonCol size="12" className="flex justify-end">
              <IonButton
                shape="round"
                disabled={processing}
                onClick={handleSubmit(handleEmailOTPSuccess, handleError)}
              >
                {processing ? <IonSpinner name="dots" /> : "Next"}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>}
        {state === EmailOTP_Continue_Enum.VerifyOTP &&
          <IonGrid>
            <IonRow className='my-2'>
              <IonText className="text-3xl font-poppins font-bold">Verification</IonText>
            </IonRow>
            <IonRow className='my-2'>
              <IonText className=" font-poppins">Your verification code is sent via email to</IonText>
              <IonText className="font-poppins">{MaskEmail(getValues("email"))}</IonText>
            </IonRow>
            <IonRow className='ml-[-4px] my-2'>
              <Controller
                render={({ field: { value, onChange, onBlur }, fieldState: { error, isTouched } }) => (
                  <>
                    <OtpInput
                      numInputs={6}
                      inputType='tel'
                      value={value}
                      onChange={e => {
                        onChange(e)
                        if (e.length === 6) {
                          handleSubmit(handleSubmitOTPSuccess, handleError)
                        }
                      }}
                      onPaste={() => handleSubmit(handleSubmitOTPSuccess, handleError)}
                      containerStyle={"flex flex-row justify-center mt-3"}
                      inputStyle={"border-2 mx-1 rounded-lg w-25 font-poppins text-center text-5xl"}
                      renderInput={(props) => <input {...props} />}
                    />
                    {error && <IonLabel color="danger" className="p-2">
                      {error?.message}
                    </IonLabel>}
                  </>
                )}
                name="code"
                control={control}
              />
              { }
            </IonRow>
            <IonRow className="mt-4 ml-[-5px]">
              <IonCol size="12">
                <IonButton
                  expand="block"
                  disabled={processing}
                  onClick={handleSubmit(handleSubmitOTPSuccess, handleError)}
                >
                  {processing ? <IonSpinner name="dots" /> : "Submit"}
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>}
      </IonContent>
    </IonModal>
  )
}

export default EmailOTP_1_Continue;