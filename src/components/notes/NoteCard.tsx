'use client';

import { Note } from '@/lib/notes';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { useState } from 'react';
import { deleteNote } from '@/lib/notes';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        setIsDeleting(true);
        await deleteNote(note.id);
        queryClient.invalidateQueries({ queryKey: ['notes'] });
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Failed to delete note');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="group relative rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/50">
          <Link
            href={`/notes/${note.id}`}
            className=" transition-colors duration-200 hover:text-primary"
          >
      <div className="flex items-start justify-between">
        <div className="flex-1 ">
          <h2 className='block text-lg font-medium text-foreground'>
            {note.title}
          </h2>
          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
            {note.content}
          </p>
          {note.summary && (
            <div className="mt-2 rounded-md bg-muted p-2 transition-colors duration-200 group-hover:bg-muted/80">
              <div className="prose prose-sm dark:prose-invert">
                <ReactMarkdown>{note.summary}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
        <Button
          onClick={handleDelete}
          disabled={isDeleting}
          variant="ghost"
          size="icon"
          className="ml-4 text-muted-foreground transition-colors duration-200 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      </Link>
      <div className="mt-4 flex items-center text-xs text-muted-foreground">
        <span>
          {formatDistanceToNow(new Date(note.created_at), { addSuffix: true })}
        </span>
      </div>
    </div>
  );
} 