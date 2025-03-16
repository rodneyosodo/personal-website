import { Skeleton } from "@/components/ui/skeleton";

export function ArticleSkeleton() {
  return (
    <div className="relative overflow-hidden">
      <div className="container mx-auto max-w-8xl px-8">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <Skeleton className="h-9 w-3/4 mt-2 mb-8" />

          {/* Date */}
          <Skeleton className="h-5 w-48 mt-2 mb-8" />

          {/* Article content */}
          <div className="prose space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-[400px] w-full rounded-lg mb-8" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            {/* Form skeleton */}
            <div className="mt-8 space-y-4">
              <Skeleton className="h-32 w-full" /> {/* Text area */}
              <Skeleton className="h-10 w-24" /> {/* Submit button */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
