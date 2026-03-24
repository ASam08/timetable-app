interface TempusLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function TempusLogo({
  width = 150,
  height = 150,
  className = "",
}: TempusLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 150 150"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer rounded rect */}
      <rect
        x="20"
        y="20"
        width="110"
        height="110"
        rx="16"
        fill="none"
        stroke="#3B7BE8"
        strokeWidth="2.5"
      />

      {/* Top header bar */}
      <rect x="20" y="20" width="110" height="26" rx="16" fill="#3B7BE8" />
      <rect x="20" y="32" width="110" height="14" fill="#3B7BE8" />

      {/* Inner grid lines - vertical */}
      <line
        x1="57"
        y1="46"
        x2="57"
        y2="130"
        stroke="#3B7BE8"
        strokeWidth="1.5"
        opacity="0.35"
      />
      <line
        x1="93"
        y1="46"
        x2="93"
        y2="130"
        stroke="#3B7BE8"
        strokeWidth="1.5"
        opacity="0.35"
      />

      {/* Inner grid lines - horizontal */}
      <line
        x1="20"
        y1="72"
        x2="130"
        y2="72"
        stroke="#3B7BE8"
        strokeWidth="1.5"
        opacity="0.35"
      />
      <line
        x1="20"
        y1="98"
        x2="130"
        y2="98"
        stroke="#3B7BE8"
        strokeWidth="1.5"
        opacity="0.35"
      />

      {/* Filled blocks */}
      <rect
        x="24"
        y="76"
        width="29"
        height="18"
        rx="4"
        fill="#3B7BE8"
        opacity="0.9"
      />
      <rect
        x="60"
        y="50"
        width="29"
        height="18"
        rx="4"
        fill="#3B7BE8"
        opacity="0.9"
      />
      <rect
        x="96"
        y="102"
        width="30"
        height="18"
        rx="4"
        fill="#3B7BE8"
        opacity="0.7"
      />
      <rect
        x="24"
        y="102"
        width="29"
        height="18"
        rx="4"
        fill="#3B7BE8"
        opacity="0.5"
      />
    </svg>
  );
}
