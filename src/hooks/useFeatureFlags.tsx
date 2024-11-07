import { useState, useEffect } from "react";
import client from "../client";
import { PostgrestError } from "@supabase/supabase-js";
import { RemoteConfigType } from "../types";
import { UseFeatureFlagsResult, FlagsMap } from "../types/remoteConfigs";

const useFeatureFlags = (): UseFeatureFlagsResult => {
  const [flags, setFlags] = useState<FlagsMap>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const fetchFeatureFlags = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await client
          .from('remote_configs')
          .select('*')
          .eq("is_active", true);

        if (error) throw error;

        const flagsMap: FlagsMap = (data as RemoteConfigType[]).reduce((acc: FlagsMap, item) => {
          acc[item.key] = item;
          return acc;
        }, {} as FlagsMap);

        setFlags(flagsMap);
      } catch (err: unknown) {
        const supabaseError = err as PostgrestError;
        console.error("Error fetching feature flags:", supabaseError.message);
        setError(supabaseError);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchFeatureFlags();

    // Set up real-time subscription
    interface Payload {
      eventType: 'INSERT' | 'UPDATE' | 'DELETE';
      new: RemoteConfigType | null;
      old: RemoteConfigType | null;
    }

    const subscription = client
      .channel('remote_configs')
      // @ts-ignore
      .on("postgres_changes", { event: '*', schema: 'public', table: 'remote_configs' }, (payload: Payload) => {
        const { eventType, new: newConfig, old: oldConfig } = payload;

        if (eventType === 'INSERT' || eventType === 'UPDATE') {
          if (newConfig && newConfig.is_active) {
            // Add or update the flag
            setFlags((prevFlags) => ({ ...prevFlags, [newConfig.key]: newConfig }));
          } else if (newConfig && !newConfig.is_active) {
            // Remove the flag if it's no longer active
            setFlags((prevFlags) => {
              const updatedFlags = { ...prevFlags };
              delete updatedFlags[newConfig.key];
              return updatedFlags;
            });
          }
        } else if (eventType === 'DELETE') {
          if (oldConfig) {
            // Remove the deleted flag
            setFlags((prevFlags) => {
              const updatedFlags = { ...prevFlags };
              delete updatedFlags[oldConfig.key];
              return updatedFlags;
            });
          }
        }
      })
      .subscribe();

    // Clean up subscription on unmount
    return () => {
      client.removeChannel(subscription);
    };
  }, []);

  return { flags, loading, error };
};

export default useFeatureFlags;
