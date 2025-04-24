interface LoadingProps {
  text?: string;
}

export function Loading({ text = 'Loading...' }: LoadingProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-2 text-sm text-gray-500">{text}</p>
      </div>
    </div>
  );
} 