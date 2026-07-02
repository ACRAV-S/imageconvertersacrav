interface ErrorAlertProps {
  error: string | null;
}

export default function ErrorAlert({ error }: ErrorAlertProps) {
  if (!error) return null;

  return (
    <div
      className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400"
      role="alert"
    >
      {error}
    </div>
  );
}
