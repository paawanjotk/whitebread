'use client';

import { useQuery } from '@tanstack/react-query';
import { getNote } from '@/lib/notes';
import { NoteForm } from '@/components/notes/NoteForm';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loading } from '@/components/ui/Loading';
import { useUser } from '@/lib/user';
import { use } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface NotePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function NotePage({ params }: NotePageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const { data: note, isLoading: noteLoading } = useQuery({
    queryKey: ['notes', id],
    queryFn: () => getNote(id),
  });

  if (userLoading || noteLoading) {
    return <Loading text="Loading note..." />;
  }

  if (!note) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Note not found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                The note you&apos;re looking for doesn&apos;t exist.
              </AlertDescription>
            </Alert>
            <Button asChild>
              <Link href="/">Go back home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-3xl font-bold text-white-bread">
            White Bread
          </Link>
          <span className="text-sm text-muted-foreground">{user?.email}</span>
        </div>
      </nav>

      <main className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Note</CardTitle>
          </CardHeader>
          <CardContent>
            {note.summary && (
              <Alert className="mb-6">
                <AlertTitle>Summary</AlertTitle>
                <AlertDescription>
                  <div className="prose prose-sm dark:prose-invert">
                    <ReactMarkdown>{note.summary}</ReactMarkdown>
                  </div>
                </AlertDescription>
              </Alert>
            )}
            <NoteForm
              note={note}
              onSuccess={() => router.push('/')}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 