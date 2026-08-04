interface AnimatedLogoProps {
  className?: string
  variant: 'dark' | 'light'
}

export default function AnimatedLogo({ className = '', variant }: AnimatedLogoProps) {
  const textColor = variant === 'dark' ? '#05164D' : '#FFFFFF'

  return (
    <svg
      className={className}
      viewBox="0 0 260 40"
      height="32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <style>
          {`
            .brand-text {
              font-family: var(--font-plus-jakarta-sans), system-ui, sans-serif;
            }
          `}
        </style>
      </defs>

      <g transform="translate(0, 0)">
        <image
          href="/logo-icon.png"
          x="2"
          y="2"
          width="36"
          height="36"
          preserveAspectRatio="xMidYMid meet"
        />
      </g>

      <g className="brand-text">
        <text
          x="44"
          y="20"
          fontSize="24"
          fontWeight="800"
          dominantBaseline="central"
          letterSpacing="-0.5"
        >
          <tspan fill={textColor}>Digital </tspan>
          <tspan fill="#f0a000">Curd</tspan>
        </text>
      </g>
    </svg>
  )
}
