'use client';

import { Note } from '@/lib/notes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { createNote, updateNote, summarizeNote } from '@/lib/notes';
import { useUser } from '@/lib/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

const noteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

type NoteFormData = z.infer<typeof noteSchema>;

interface NoteFormProps {
  note?: Note;
  onSuccess?: () => void;
}

export function NoteForm({ note, onSuccess }: NoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: note?.title || '',
      content: note?.content || '',
    },
  });

  const onSubmit = async (data: NoteFormData) => {
    if (!user) {
      alert('You must be logged in to create a note');
      return;
    }

    try {
      setIsSubmitting(true);
      if (note) {
        await updateNote(note.id, data);
      } else {
        await createNote({
          ...data,
          user_id: user.id,
        });
      }
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onSuccess?.();
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSummarize = async () => {
    const content = (document.querySelector('textarea[name="content"]') as HTMLTextAreaElement)?.value;
    if (!content) return;

    try {
      setIsSummarizing(true);
      const summary = await summarizeNote(content);
      if (note) {
        await updateNote(note.id, { summary });
        queryClient.invalidateQueries({ queryKey: ['notes'] });
        alert('Summary generated successfully!');
        router.push('/');
      } else {
        setValue('content', `${content}\n\nSummary: ${summary}`);
        alert('Summary generated successfully!');
      }
    } catch (error) {
      console.error('Error summarizing note:', error);
      alert('Failed to summarize note');
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          {...register('title')}
          type="text"
          id="title"
          placeholder="Enter note title"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          {...register('content')}
          id="content"
          rows={6}
          placeholder="Enter note content"
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handleSummarize}
          disabled={isSummarizing}
        >
          {isSummarizing ? 'Summarizing...' : 'Summarize'}
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : note ? 'Update Note' : 'Create Note'}
        </Button>
      </div>
    </form>
  );
} 