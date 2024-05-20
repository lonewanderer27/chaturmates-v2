import { PostgrestError } from '@supabase/supabase-js';
import client from "../client";
import { useState } from "react";

export default function useOTP(props: {
  handleSuccess?: () => void;
  handleFailure?: (error: PostgrestError) => void;
}) {
  const [error, setError] = useState<PostgrestError | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleSend = async (emailInput?: string) => {
    // if email was provided,
    // then this function was called from the Continue page
    // otherwise is not provided
    // we shall get it from currently logged in user

    let email: string = "";
    if (emailInput) {
      email = emailInput;
    } else {
      // TODO: get email from currently logged in user
    }

    // log the email
    console.log("User entered email: ", email);

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // set processing to true
    setProcessing(() => true);

    // save OTP to the database
    // @ts-ignore
    const { data, error } = await client
      .from("otp_codes")
      .insert({
        email: email,
        code: otp.toString(),
      })
      .select("*")
      .single();

    // if we get an error, set it to the state
    if (error) {
      // set the error to the state
      setError(error);

      // call the failure handler if provided and pass the error
      props.handleFailure && props.handleFailure(error);

      // finally, set processing to false
      setProcessing(() => false);

      return;
    }

    // send the OTP to the email of the user using our otp-email edge function
    const { data: data2, error: error2 } = await client.functions.invoke("otp-email", {
      body: {
        otp_code_id: data?.code,
        email: email,
      }
    });

    // if we get an error, set it to the state
    if (error2) {
      setError(error2);

      // call the failure handler if provided and pass the error
      props.handleFailure && props.handleFailure(error2);

      // finally, set processing to false
      setProcessing(() => false);

      return;
    }

    // log the response 
    console.log("Email sent: ", data2);

    // call the success handler if provided
    props.handleSuccess && props.handleSuccess();

    // finally, set processing to false
    setProcessing(() => false);
  }

  const handleVerify = async(otpInput: string, emailInput?: string) => {
    // if email was provided,
    // then this function was called from the Continue page
    // otherwise is not provided
    // we shall get it from currently logged in user

    let email: string = "";
    if (emailInput) {
      email = emailInput;
    } else {
      // TODO: get email from currently logged in user
    }

    // log the email
    console.log("User entered email: ", email);

    // log the otpInput
    console.log("User entered OTP: ", otpInput);

    // set processing to true
    setProcessing(() => true);

    // find the OTP in the database
    const otp_code = await client
      .from("otp_codes")
      .select("*")
      .eq("email", email)
      .eq("code", otpInput)
      .single();

    // if we get an error, set it to the state
    if (otp_code.error) {
      setError(otp_code.error);

      // call the failure handler if provided and pass the error
      props.handleFailure && props.handleFailure(otp_code.error);
    } else {
      // call the success handler if provided
      props.handleSuccess && props.handleSuccess();
    }

    // finally, set processing to false
    setProcessing(() => false);
  }

  return {
    error,
    processing,
    handleSend,
    handleVerify,
  }
}
