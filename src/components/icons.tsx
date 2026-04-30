// Inline SVG icons for the AAOS plugin. We can't import from a host icon
// library (the plugin must be self-contained), so each icon is a tiny React
// component returning an SVG. Stroke colour is inherited from `currentColor`.

const React: any = (globalThis as any).React

type IconProps = {
  size?: number
  className?: string
  style?: any
  strokeWidth?: number
}

const baseSvg = (size: number, strokeWidth: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

export const ChevronRight = ({
  size = 16,
  className,
  style,
  strokeWidth = 2,
}: IconProps) => (
  <svg {...baseSvg(size, strokeWidth)} className={className} style={style}>
    <path d="M9 6l6 6-6 6" />
  </svg>
)

export const ChevronDown = ({
  size = 16,
  className,
  style,
  strokeWidth = 2,
}: IconProps) => (
  <svg {...baseSvg(size, strokeWidth)} className={className} style={style}>
    <path d="M6 9l6 6 6-6" />
  </svg>
)

export const SearchIcon = ({
  size = 16,
  className,
  style,
  strokeWidth = 2,
}: IconProps) => (
  <svg {...baseSvg(size, strokeWidth)} className={className} style={style}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
)

export const CopyIcon = ({
  size = 14,
  className,
  style,
  strokeWidth = 2,
}: IconProps) => (
  <svg {...baseSvg(size, strokeWidth)} className={className} style={style}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
)

export const CheckIcon = ({
  size = 14,
  className,
  style,
  strokeWidth = 2.5,
}: IconProps) => (
  <svg {...baseSvg(size, strokeWidth)} className={className} style={style}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export const PlusIcon = ({
  size = 14,
  className,
  style,
  strokeWidth = 2,
}: IconProps) => (
  <svg {...baseSvg(size, strokeWidth)} className={className} style={style}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const AndroidIcon = ({
  size = 20,
  className,
  style,
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
  >
    <path d="M17.523 15.341a1.005 1.005 0 1 1 0-2.01 1.005 1.005 0 0 1 0 2.01zm-11.046 0a1.005 1.005 0 1 1 0-2.01 1.005 1.005 0 0 1 0 2.01zm11.405-6.02 2.005-3.474a.42.42 0 1 0-.727-.42L17.13 8.943a12.474 12.474 0 0 0-10.26 0L4.84 5.428a.42.42 0 1 0-.727.42l2.005 3.474A11.43 11.43 0 0 0 .5 18.5h23a11.43 11.43 0 0 0-5.618-9.18z" />
  </svg>
)
