'use client';

import { useQuery } from '@tanstack/react-query';
import { getNotes } from '@/lib/notes';
import { NoteCard } from '@/components/notes/NoteCard';
import { NoteForm } from '@/components/notes/NoteForm';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loading } from '@/components/ui/Loading';
import { useUser } from '@/lib/user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function HomePage() {
  const [isCreating, setIsCreating] = useState(false);
  const { user, loading: userLoading } = useUser();
  const { data: notes, isLoading: notesLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (userLoading || notesLoading) {
    return <Loading text="Loading notes..." />;
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-3xl text-white-bread font-bold">White Bread</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </div>
      </nav>

      <main className="container py-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Notes</h2>
          <Button onClick={() => setIsCreating(true)}>
            Create Note
          </Button>
        </div>

        {isCreating && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create New Note</CardTitle>
            </CardHeader>
            <CardContent>
              <NoteForm onSuccess={() => setIsCreating(false)} />
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notes?.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>

        {notes?.length === 0 && (
          <Alert>
            <AlertDescription>
              No notes yet. Create your first note!
            </AlertDescription>
          </Alert>
        )}
      </main>
    </div>
  );
}
