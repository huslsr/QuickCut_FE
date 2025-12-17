export default function SkeletonStoryCard() {
  return (
    <div className="flex flex-col h-full bg-card border border-border/50 rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 animate-pulse">
      {/* Image Placeholder */}
      <div className="relative w-full aspect-video bg-muted" />
      
      {/* Content Placeholder */}
      <div className="flex-1 flex flex-col p-6 space-y-4">
        {/* Title Lines */}
        <div className="space-y-2">
            <div className="h-6 bg-muted rounded w-3/4" />
            <div className="h-6 bg-muted rounded w-2/3" />
        </div>

        {/* Summary Lines */}
        <div className="space-y-2 pt-2">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
        </div>
        
        {/* Footer Placeholder */}
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
            <div className="h-3 bg-muted rounded w-20" />
            <div className="h-3 bg-muted rounded w-16" />
        </div>
      </div>
    </div>
  );
}
