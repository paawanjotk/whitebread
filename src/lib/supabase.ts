import { createClient } from '@supabase/supabase-js';
import { User as SupabaseUser } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      debug: false,
      storage: {
        getItem: (key) => {
          if (typeof window === 'undefined') {
            return null;
          }
          const value = window.localStorage.getItem(key);
          if (value && !document.cookie.includes(key)) {
            document.cookie = `${key}=${value}; path=/`;
          }
          return value;
        },
        setItem: (key, value) => {
          if (typeof window === 'undefined') {
            return;
          }
          window.localStorage.setItem(key, value);
          // Sync to cookie
          document.cookie = `${key}=${value}; path=/`;
        },
        removeItem: (key) => {
          if (typeof window === 'undefined') {
            return;
          }
          window.localStorage.removeItem(key);
          // Remove from cookie
          document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        },
      },
    },
  }
);

export type Note = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  summary?: string;
  created_at: string;
  updated_at: string;
};

export type User = SupabaseUser; 