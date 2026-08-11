export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="h-10 w-56 animate-pulse rounded bg-muted" />

      <div className="space-y-6">
        <div className="h-48 rounded-lg bg-muted animate-pulse" />
        <div className="h-48 rounded-lg bg-muted animate-pulse" />
        <div className="h-48 rounded-lg bg-muted animate-pulse" />
      </div>
    </div>
  );
}