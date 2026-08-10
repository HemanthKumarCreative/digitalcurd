const SkeletonBlock = ({ className }: { className: string }) => (
  <div
    className={`animate-pulse rounded-[var(--admin-radius-sm)] bg-[var(--admin-border)] ${className}`}
  />
)

export default function AdminLoading() {
  return (
    <div aria-busy="true" aria-label="Loading" className="space-y-6">
      <div className="space-y-3">
        <SkeletonBlock className="h-3 w-40" />
        <SkeletonBlock className="h-8 w-64" />
        <SkeletonBlock className="h-4 w-96 max-w-full" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="rounded-[var(--admin-radius)] border border-[var(--admin-border)] bg-white p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1 space-y-2">
                <SkeletonBlock className="h-4 w-1/3" />
                <SkeletonBlock className="h-3 w-1/2" />
              </div>
              <SkeletonBlock className="h-5 w-20 shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
