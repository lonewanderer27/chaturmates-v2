import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

// create an smtp client based on brevo's credentials
const brevo = new SMTPClient({
  connection: {
    hostname: "smtp-relay.brevo.com",
    port: 587,
    tls: true,
    auth: {
      username: Deno.env.get("BREVO_SMTP_LOGIN")!,
      password: Deno.env.get("BREVO_SMTP_MASTER_PASS")!,
    },
  },
});

export default brevo;