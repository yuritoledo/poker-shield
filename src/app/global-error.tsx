"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-4 text-center dark">
        <h1 className="text-sm font-semibold text-foreground">
          Critical error
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          {error.message || "The application encountered a critical error."}
        </p>
        <button
          onClick={() => reset()}
          className="text-sm underline text-muted-foreground hover:text-foreground"
        >
          Reload
        </button>
      </body>
    </html>
  );
}
