import { Skeleton } from "@/components/ui/skeleton";

export function ContactTableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-64" />

      <div className="rounded-lg border">
        <div className="space-y-3 p-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <Skeleton className="h-5 w-8" />
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-56" />
              <Skeleton className="h-8 w-28" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
