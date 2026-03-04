import Link from "next/link";

interface CircularLinkProps {
  href: string;
  children: string;
}

export default function CircularLink({ href, children }: CircularLinkProps) {
  const text = `${children} • ${children} •`;

  return (
    <Link
      href={href}
      style={{
        display: "block",
        position: "absolute",
        width: "clamp(140px, 20vw, 230px)",
        aspectRatio: "1 / 1",
      }}
    >
      {/* Arrow icon — centered */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 49 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32.844 21.9998L22.116 11.2718L24.944 8.44385L40.5 23.9998L24.944 39.5558L22.116 36.7278L32.844 25.9998H8.5V21.9998H32.844Z"
            fill="#121821"
          />
        </svg>
      </div>

      {/* Rotating text ring */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        width="100%"
        height="100%"
        style={{
          animation: "rotateCW 30s linear infinite",
          transformOrigin: "center",
          display: "block",
        }}
      >
        <defs>
          <path
            id="textcircle-kage"
            d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
          />
        </defs>
        <text
          dy="70"
          textLength={1220}
          fill="#121821"
          fontSize={24}
          fontFamily="sans-serif"
          letterSpacing={15.5}
        >
          <textPath href="#textcircle-kage">{text}</textPath>
        </text>
      </svg>
    </Link>
  );
}
