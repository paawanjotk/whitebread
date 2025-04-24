'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loading } from '@/components/ui/Loading';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session) {
          // Session exists, redirect to home
          router.push('/');
        } else {
          // No session, redirect to sign in
          router.push('/auth/signin');
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        router.push('/auth/signin');
      }
    };

    handleAuthCallback();
  }, [router]);

  return <Loading text="Completing sign in..." />;
} 