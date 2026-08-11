export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-64 animate-pulse rounded bg-muted" />

      <div className="space-y-4 rounded-lg border p-6">
        <div className="h-5 w-40 animate-pulse rounded bg-muted" />
        <div className="h-5 w-56 animate-pulse rounded bg-muted" />
        <div className="h-5 w-48 animate-pulse rounded bg-muted" />
        <div className="h-5 w-44 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}