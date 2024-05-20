import { Database } from "../_types/supabase.d.ts";
import { createClient } from "https://esm.sh/v135/@supabase/supabase-js@2.7.1/dist/module/index.js";

// create supabase with admin privileges
const clientAdmin = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

export default clientAdmin;