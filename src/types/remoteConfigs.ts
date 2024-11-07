import { PostgrestError } from '@supabase/supabase-js';
import { RemoteConfigType } from '.';

// Define TypeScript interfaces based on the `remote_configs` table structure

export interface FlagsMap {
  [key: string]: RemoteConfigType;
}

export interface UseFeatureFlagsResult {
  flags: FlagsMap;
  loading: boolean;
  error: PostgrestError | null;
}

