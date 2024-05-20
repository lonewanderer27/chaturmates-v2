import { baseCorsHeaders } from "../_shared/cors.ts";
import brevo from "../_shared/brevo.ts";
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />
import clientAdmin from "../_shared/admin.ts";

const corsHeaders = {
  ...baseCorsHeaders,
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
}

// function to send the actual email
async function createEmail(otp_code_id: string) {
  // we don't pass the actual otp code and email
  // instead we let supabase on this edge function
  // to look for it in the otp_codes table instead
  // so we dont leak the code and the email of the user itself

  const { data, error } = await clientAdmin
    .from("otp_codes")
    .select("*")
    .eq("id", otp_code_id)
    .single();

  // if there's an error, return a not found Response
  if (error) {
    return new Response("Not Found", {
      status: 404,
      statusText: "OTP Code Not Found",
      headers:  {
        ...corsHeaders,
        "Content-Type": "application/json"
      },
    });
  }

  // otherwise send the email
  await brevo.send({
    from: "smtp-relay.sendinblue.com",
    to: data!.email,
    subject: "Your Chat-Ur-Meyts OTP Code",
    content: `Your OTP Code is: ${data!.code}`,
    html: `Your OTP Code is: <strong>${data!.code}</strong>`,
  });

  // return a success response
  return new Response(
    "OK",
    {
      status: 200,
      statusText: "Email Sent",
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    },
  );
}

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders, status: 200, statusText: 'OK' })
  }

  // get the otp_code_id from the request body
  const { otp_code_id } = await req.json();

  // send the email
  const response = await createEmail(otp_code_id);

  // return the response
  return response;
});
