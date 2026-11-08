export function Skeleton({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block rounded-lg bg-(--loading-background) [--loading-background:color-mix(in_srgb,var(--color-white)_30%,transparent)] [--loading-background-dim:color-mix(in_srgb,var(--color-white)_20%,transparent)] ${className}`}
    />
  )
}
