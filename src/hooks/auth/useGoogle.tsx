import { App } from "@capacitor/app";
import { AuthError } from "@supabase/supabase-js";
import { Capacitor } from "@capacitor/core";
import client from "../../client";
import { useIonRouter } from "@ionic/react";
import { useState } from "react";

export default function useGoogle(props: {
  handleSuccess?: () => void;
  handleFailure?: (error: any) => void;
}) {
  const rt = useIonRouter();
  const [error, setError] = useState<AuthError | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleGoogle = async () => {
    // get the redirect URL
    let redirectUrl;
    if (Capacitor.isNativePlatform()) {
      // get the app id if we are on native platform
      redirectUrl = (await App.getInfo()).id;
    } else {
      // get the current route path if we are on web
      redirectUrl = rt.routeInfo.pathname;
    }

    // set processing to true
    setProcessing(() => true);

    // sign in with google
    const resG = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          prompt: "select_account",
        }
      },
    });

    // if we get an error, call the failure handler and return
    if (resG.error) {
      setError(() => resG.error);
      props.handleFailure && props.handleFailure(resG.error);
      setProcessing(() => false);
      return;
    }

    // call the success handler if provided
    props.handleSuccess && props.handleSuccess();
    setProcessing(() => false);
  }

  return {
    handleGoogle,
    error,
    processing,
  }
}
