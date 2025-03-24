import { Skeleton } from "./ui/skeleton";

export function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-32 text-muted-foreground" />

      <div className="flex items-center gap-6 lg:gap-8">
        <Skeleton className="h-4 w-24 text-muted-foreground" />

        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  )
}