import { Controller, useForm } from "react-hook-form";
import { IonButton, IonContent, IonFooter, IonIcon, IonImg, IonPage, IonText, IonTitle, useIonRouter, useIonViewWillEnter } from "@ionic/react";
import { boolean, object, ref, string } from 'yup';
import { chevronForward, logoGoogle, mailOutline, mailSharp } from "ionicons/icons";
import { StatusBar } from '@capacitor/status-bar';

import EmailOTP_1_Continue from "../components/ContinuePage/EmailOTP_Continue";
import { NewStudentType } from "../types/student/post/NewStudentType";
import useGoogle from "../hooks/auth/useGoogle";
import useSession from "../hooks/auth/useSession";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Capacitor } from "@capacitor/core";

export const formSchema = object().shape({
  email: string().email().required().label("Email").matches(/^[a-zA-Z0-9._%+-]+@adamson\.edu\.ph$/, "Must be an Adamson mail"),
  // email: string().email().required().label("Email").matches(/^[a-zA-Z0-9._%+-]+@protonmail\.ch$/, "Must be a ProtonMail"),
  fullName: string().required().label("Full Name"),
  password: string().required().label("Password"),
  passwordConfirmation: string().required("Confirm Password is a required field").oneOf([ref("password")], "Passwords must match"),
  agreeToTerms: boolean().required("You must agree to the terms and conditions")
})

export default function Continue() {
  const [open, setOpen] = useState(false)
  const [showMoreContinueOptions, setShowMoreContinueOptions] = useState(false);
  const handleShowMoreContinueOptions = () => {
    setShowMoreContinueOptions(prev => !prev);
  }

  const rt = useIonRouter();
  const { session } = useSession();

  const handleContinue = () => {
    // check if our user is already logged in
    // and they've just redirected to this page by accident
    if (session) {
      rt.push("/discover", "forward", "replace");
    } else {
      setOpen(true)
    }
  }

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    clearErrors,
    getFieldState,
    getValues,
    setValue,
    control,
    trigger,
  } = useForm<NewStudentType>({
    resolver: yupResolver(formSchema)
  });

  const { handleGoogle } = useGoogle({});

  const handleTermsOfService = () => {

  }

  const handlePrivacyPolicy = () => {

  }

  useIonViewWillEnter(() => {
    // if we're on the web, we can't use the status bar
    if (Capacitor.isNativePlatform() === false) return;

    // set the status bar to overlay the webview
    StatusBar.setOverlaysWebView({ overlay: true });
  }, []);

  return (
    <IonPage>
      <EmailOTP_1_Continue open={open} setOpen={setOpen} />
      <IonContent className="ion-padding ">
        <video
          className="fixed z-[-10] top-0 left-0 min-w-full min-h-full w-auto h-auto transform object-cover"
          autoPlay
          muted
          loop
        >
          <source src="/480.mp4" type="video/mp4" />
        </video>
        <IonImg src="/logo_w_name.png" className="w-32 mx-auto mt-28" />
      </IonContent>
      <IonFooter className="ion-padding text-center">
        <div className="mb-32">
          <IonButton expand="block" fill="outline" color="light" onClick={handleContinue} shape="round">
            Continue with Email
            <IonIcon slot="start" src={mailOutline} />
          </IonButton>
          {Capacitor.isNativePlatform() === false && <IonButton
            onClick={handleGoogle}
            expand="block"
            fill="clear"
            size="small"
            className="mt-4"
            color="light">
            <IonIcon slot="start" icon={logoGoogle} />
            Continue with Google
          </IonButton>}
        </div>
        <IonText color="light">
          By continuing, you confirm that you agree to our <span className="underline" onClick={handleTermsOfService}>Terms of Service</span> and <span className="underline" onClick={handlePrivacyPolicy}>Privacy Policy</span>.
        </IonText>
      </IonFooter>
      {/* <IonFooter className="ion-padding text-center">
          <div className="mb-32">
            <IonButton expand="block" fill="outline" color="light" onClick={handleGoogle} >
              <IonIcon slot="start" src={logoGoogle} />
              Continue with Google
            </IonButton>
            <IonButton
              onClick={() => setOpen(true)}
              expand="block"
              fill="clear"
              size="small"
              className="mt-4"
              color="light">
              Log in with OTP Code
              <IonIcon slot="end" icon={chevronForward} />
            </IonButton>
          </div>
          <IonText color="light">
            By continuing, you confirm that you agree to our <span className="underline" onClick={handleTermsOfService}>Terms of Service</span> and <span className="underline" onClick={handlePrivacyPolicy}>Privacy Policy</span>.
          </IonText>
        </IonFooter> */}
    </IonPage>
  )
}
