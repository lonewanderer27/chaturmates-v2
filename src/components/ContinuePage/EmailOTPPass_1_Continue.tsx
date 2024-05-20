import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonLabel, IonModal, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react'
import { object, string } from 'yup';

import { PostgrestError } from '@supabase/supabase-js';
import { chevronBackOutline } from 'ionicons/icons'
import useOTP from "../../hooks/useOTP";
import { yupResolver } from '@hookform/resolvers/yup';

const schema = object({
  email: string().email().required().label("Email").matches(/^[a-zA-Z0-9._%+-]+@adamson\.edu\.ph$/, "Must be an Adamson Email")
})

export default function EmailOTPPass_1_Continue(props: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const rt = useIonRouter();
  const { handleSubmit, control, setError, getValues } = useForm<{ email: string }>({
    resolver: yupResolver(schema)
  });

  // Handle OTP 
  const onOTPError = (error: PostgrestError) => {
    // Set the error to the email field
    setError("email", {
      type: "manual",
      message: error.message
    })

    // Log the error
    console.error(error)
  }

  const onOTPSuccess = () => {
    // Dismiss the modal
    props.setOpen(false)

    // Redirect to OTP_2_Continue
    rt.push(`${rt.routeInfo.pathname}/email/otp?email=${getValues("email")}`, "forward", "push")
  }

  const { handleSend, processing } = useOTP({ 
    handleFailure: onOTPError, 
    handleSuccess: onOTPSuccess
  });

  // Handle form submission
  const handleError: SubmitErrorHandler<{ email: string }> = (errors, e) => {
    console.log(errors)
  }

  const handleSuccess: SubmitHandler<{ email: string }> = (data) => {
    console.log(data)
    // TODO: Send OTP Code
    handleSend(data.email);
  }

  return (
    <IonModal
      onDidDismiss={() => props.setOpen(false)}
      isOpen={props.open}
      breakpoints={[0, 0.50]}
      initialBreakpoint={0.50}
      handle={false}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => props.setOpen(false)}>
              <IonIcon src={chevronBackOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className='ion-padding'>
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
            <IonCol size="12">
              <IonButton
                expand="block"
                disabled={processing}
                onClick={handleSubmit(handleSuccess, handleError)}
              >
                {processing ? "Sending OTP..." : "Send OTP"}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  )
}
