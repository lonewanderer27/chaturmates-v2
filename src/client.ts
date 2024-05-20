import { Database } from "./types/supabase";
import { createClient } from "@supabase/supabase-js";

const client = createClient<Database>(
  import.meta.env.VITE_SUPABASE_API_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default client;