import { useEffect, useState } from "react";

import { Session } from "@supabase/supabase-js";
import client from "../../client";
import { useIonRouter } from "@ionic/react";

const useSession = () => {
  const rt = useIonRouter();
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [processing, setProcessing] = useState<boolean>(false);
  
  const logout = async () => {
    setProcessing(() => true);
    await client.auth.signOut();
    setProcessing(() => false);
    rt.push("/continue", "root");
  }

  useEffect(() => {
    client.auth.getSession().then(({ data }) => {
      setSession(data.session);
    })

    const { data: { subscription: listener } } = client.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
    })

    return () => listener.unsubscribe();
  }, [])

  return {
    session,
    logout,
    processing
  }
}

export default useSession;