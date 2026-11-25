import React from "react";
import { ArtworkVariant } from "@/data/chocolates";

export function ChocolateArtwork({
  variant,
  className = "w-full h-48",
}: {
  variant: ArtworkVariant;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#2d1810] via-[#3d2116] to-[#1d0f0a] ${className}`}
    >
      <svg
        viewBox="0 0 320 200"
        className="w-full h-full"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`glow-${variant}`} cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#c89b3c" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#23140e" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`gold-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f3d98b" />
            <stop offset="50%" stopColor="#c89b3c" />
            <stop offset="100%" stopColor="#8d651a" />
          </linearGradient>
          <linearGradient id={`cocoa-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6a3d29" />
            <stop offset="100%" stopColor="#321a11" />
          </linearGradient>
        </defs>

        <rect width="320" height="200" fill={`url(#glow-${variant})`} />
        <circle
          cx="160"
          cy="100"
          r="76"
          fill="none"
          stroke={`url(#gold-${variant})`}
          strokeOpacity="0.22"
          strokeDasharray="3 5"
        />

        {variant === "kunafa" && (
          <g>
            <rect
              x="68"
              y="52"
              width="184"
              height="96"
              rx="12"
              fill={`url(#cocoa-${variant})`}
              stroke={`url(#gold-${variant})`}
              strokeWidth="1.5"
            />
            <rect
              x="82"
              y="66"
              width="156"
              height="68"
              rx="6"
              fill="#6a7c38"
              fillOpacity="0.88"
            />
            {[0, 1, 2, 3, 4].map((i) => (
              <path
                key={i}
                d={`M90 ${78 + i * 11} Q130 ${72 + i * 11} 165 ${80 + i * 11} T232 ${76 + i * 11}`}
                stroke="#e6c36e"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            ))}
            <rect
              x="68"
              y="52"
              width="72"
              height="96"
              rx="10"
              fill="#4b291b"
              opacity="0.92"
            />
            <line
              x1="104"
              y1="56"
              x2="104"
              y2="144"
              stroke="#2a150d"
              strokeWidth="2"
            />
            <line
              x1="72"
              y1="100"
              x2="136"
              y2="100"
              stroke="#2a150d"
              strokeWidth="2"
            />
            <circle cx="204" cy="84" r="5" fill="#9bc25b" />
            <circle cx="192" cy="112" r="4" fill="#d9b259" />
          </g>
        )}

        {variant === "truffle-dark" && (
          <g>
            {[
              { cx: 120, cy: 108, r: 28 },
              { cx: 196, cy: 112, r: 26 },
              { cx: 160, cy: 86, r: 32 },
            ].map((t, idx) => (
              <g key={idx}>
                <circle
                  cx={t.cx}
                  cy={t.cy}
                  r={t.r}
                  fill="#3a1e13"
                  stroke={`url(#gold-${variant})`}
                  strokeWidth="1.2"
                />
                <circle
                  cx={t.cx - 8}
                  cy={t.cy - 9}
                  r={t.r * 0.36}
                  fill="#5c3323"
                  opacity="0.65"
                />
                <circle cx={t.cx + 7} cy={t.cy - 6} r="2" fill="#e4c170" />
                <circle cx={t.cx - 5} cy={t.cy + 8} r="1.5" fill="#c89b3c" />
              </g>
            ))}
          </g>
        )}

        {variant === "saffron-gold" && (
          <g>
            {[0, 1, 2].map((i) => {
              const x = 86 + i * 58;
              return (
                <g key={i}>
                  <rect
                    x={x}
                    y="68"
                    width="42"
                    height="64"
                    rx="8"
                    fill="#4c2a1b"
                    stroke={`url(#gold-${variant})`}
                    strokeWidth="1.5"
                  />
                  <path
                    d={`M${x + 12} 90 Q${x + 21} 76 ${x + 30} 92 Q${x + 21} 104 ${x + 12} 90 Z`}
                    fill={`url(#gold-${variant})`}
                  />
                  <path
                    d={`M${x + 14} 112 C${x + 18} 106 ${x + 24} 118 ${x + 28} 110`}
                    stroke="#d95b26"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </g>
              );
            })}
          </g>
        )}

        {variant === "caramel-salt" && (
          <g>
            {[
              { cx: 112, cy: 100 },
              { cx: 162, cy: 88 },
              { cx: 206, cy: 108 },
            ].map((m, idx) => (
              <g key={idx}>
                <circle
                  cx={m.cx}
                  cy={m.cy}
                  r="30"
                  fill="#3b2016"
                  stroke={`url(#gold-${variant})`}
                  strokeWidth="1.5"
                />
                <circle cx={m.cx} cy={m.cy} r="19" fill="#b76e22" />
                <circle
                  cx={m.cx - 4}
                  cy={m.cy - 4}
                  r="8"
                  fill="#df9b42"
                  opacity="0.6"
                />
                <rect
                  x={m.cx + 3}
                  y={m.cy - 2}
                  width="4"
                  height="4"
                  fill="#faf4ec"
                  transform={`rotate(20 ${m.cx + 5} ${m.cy})`}
                />
                <rect
                  x={m.cx - 7}
                  y={m.cy + 4}
                  width="3.5"
                  height="3.5"
                  fill="#faf4ec"
                  transform={`rotate(-15 ${m.cx - 5} ${m.cy + 5})`}
                />
              </g>
            ))}
          </g>
        )}

        {variant === "hazelnut" && (
          <g>
            <rect
              x="76"
              y="56"
              width="168"
              height="88"
              rx="10"
              fill="#2a150e"
              stroke={`url(#gold-${variant})`}
              strokeWidth="1.5"
            />
            {[0, 1, 2].map((col) =>
              [0, 1].map((row) => (
                <g key={`${col}-${row}`}>
                  <rect
                    x={92 + col * 50}
                    y={69 + row * 34}
                    width="38"
                    height="26"
                    rx="5"
                    fill="#683d27"
                    stroke="#c89b3c"
                    strokeWidth="0.9"
                  />
                  <circle
                    cx={111 + col * 50}
                    cy={82 + row * 34}
                    r="6"
                    fill="#c89b3c"
                  />
                </g>
              ))
            )}
          </g>
        )}

        {variant === "date-tahini" && (
          <g>
            {[0, 1, 2, 3].map((i) => {
              const cx = 92 + i * 45;
              const cy = i % 2 === 0 ? 92 : 112;
              return (
                <g key={i}>
                  <ellipse
                    cx={cx}
                    cy={cy}
                    rx="20"
                    ry="24"
                    fill="#4c2818"
                    stroke={`url(#gold-${variant})`}
                    strokeWidth="1.4"
                  />
                  <path
                    d={`M${cx - 12} ${cy - 4} Q${cx} ${cy - 12} ${cx + 12} ${cy - 2}`}
                    stroke="#e7d3b3"
                    strokeWidth="2.2"
                    fill="none"
                  />
                  <circle cx={cx} cy={cy + 6} r="3" fill="#c89b3c" />
                </g>
              );
            })}
          </g>
        )}

        {variant === "rose-raspberry" && (
          <g>
            {[
              { cx: 122, cy: 102, r: 28 },
              { cx: 162, cy: 84, r: 30 },
              { cx: 200, cy: 106, r: 26 },
            ].map((t, idx) => (
              <g key={idx}>
                <circle
                  cx={t.cx}
                  cy={t.cy}
                  r={t.r}
                  fill="#f3e7d8"
                  stroke={`url(#gold-${variant})`}
                  strokeWidth="1.5"
                />
                <path
                  d={`M${t.cx - 14} ${t.cy - 4} Q${t.cx} ${t.cy - 18} ${t.cx + 14} ${t.cy - 2}`}
                  stroke="#a43b4f"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx={t.cx + 4} cy={t.cy + 7} r="3" fill="#a43b4f" />
                <circle cx={t.cx - 6} cy={t.cy + 5} r="2" fill="#c89b3c" />
              </g>
            ))}
          </g>
        )}

        {variant === "espresso-gold" && (
          <g>
            <path
              d="M72 64 L238 54 L250 134 L82 146 Z"
              fill={`url(#cocoa-${variant})`}
              stroke={`url(#gold-${variant})`}
              strokeWidth="1.6"
            />
            {[
              { x: 118, y: 92, r: 15 },
              { x: 162, y: 110, r: -20 },
              { x: 202, y: 86, r: 35 },
              { x: 148, y: 78, r: -10 },
            ].map((b, idx) => (
              <g key={idx} transform={`rotate(${b.r} ${b.x} ${b.y})`}>
                <ellipse cx={b.x} cy={b.y} rx="10" ry="7" fill="#23140e" />
                <path
                  d={`M${b.x - 7} ${b.y} Q${b.x} ${b.y - 2} ${b.x + 7} ${b.y}`}
                  stroke="#c89b3c"
                  strokeWidth="1.2"
                  fill="none"
                />
              </g>
            ))}
            <path
              d="M92 122 L226 70"
              stroke={`url(#gold-${variant})`}
              strokeWidth="2"
              strokeDasharray="6 4"
              opacity="0.7"
            />
          </g>
        )}
      </svg>
    </div>
  );
}

export function HeroArtwork() {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-gold/30 bg-gradient-to-br from-[#2d1810] via-[#3f2217] to-[#1a0d08] p-6 shadow-2xl">
      <svg
        viewBox="0 0 420 340"
        className="w-full h-auto"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="heroGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#dfba63" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#1a0d08" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="heroGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5dd95" />
            <stop offset="50%" stopColor="#c89b3c" />
            <stop offset="100%" stopColor="#8d651a" />
          </linearGradient>
        </defs>

        <rect width="420" height="340" fill="url(#heroGlow)" />
        <circle
          cx="210"
          cy="165"
          r="132"
          fill="none"
          stroke="url(#heroGold)"
          strokeOpacity="0.3"
          strokeWidth="1.2"
        />
        <circle
          cx="210"
          cy="165"
          r="116"
          fill="none"
          stroke="url(#heroGold)"
          strokeOpacity="0.18"
          strokeDasharray="4 6"
        />

        {/* Luxury presentation box */}
        <rect
          x="78"
          y="88"
          width="264"
          height="164"
          rx="18"
          fill="#26140d"
          stroke="url(#heroGold)"
          strokeWidth="2"
        />
        <rect
          x="92"
          y="102"
          width="236"
          height="136"
          rx="12"
          fill="#f3e7d8"
          fillOpacity="0.06"
          stroke="#c89b3c"
          strokeOpacity="0.35"
        />

        {/* Assorted bonbons & bars */}
        <rect
          x="108"
          y="118"
          width="58"
          height="46"
          rx="8"
          fill="#4b291b"
          stroke="url(#heroGold)"
          strokeWidth="1.4"
        />
        <path d="M122 141 Q137 128 152 141" stroke="#e4c170" strokeWidth="2.4" fill="none" />

        <circle
          cx="210"
          cy="141"
          r="24"
          fill="#361c12"
          stroke="url(#heroGold)"
          strokeWidth="1.4"
        />
        <circle cx="210" cy="141" r="10" fill="#c89b3c" fillOpacity="0.85" />

        <rect
          x="254"
          y="118"
          width="58"
          height="46"
          rx="8"
          fill="#5c3322"
          stroke="url(#heroGold)"
          strokeWidth="1.4"
        />
        <circle cx="283" cy="141" r="11" fill="#6a7c38" />
        <circle cx="283" cy="141" r="4" fill="#e4c170" />

        <circle
          cx="137"
          cy="202"
          r="23"
          fill="#f3e7d8"
          stroke="url(#heroGold)"
          strokeWidth="1.4"
        />
        <circle cx="137" cy="202" r="9" fill="#a43b4f" />

        <rect
          x="180"
          y="179"
          width="60"
          height="46"
          rx="8"
          fill="#4b291b"
          stroke="url(#heroGold)"
          strokeWidth="1.4"
        />
        <circle cx="210" cy="202" r="11" fill="#b76e22" />

        <circle
          cx="283"
          cy="202"
          r="23"
          fill="#3a1e13"
          stroke="url(#heroGold)"
          strokeWidth="1.4"
        />
        <path
          d="M273 202 L293 202 M283 192 L283 212"
          stroke="#e4c170"
          strokeWidth="2"
        />

        {/* Ribbon */}
        <path
          d="M175 62 C188 44, 210 56, 210 74 C210 56, 232 44, 245 62 C236 78, 218 78, 210 74 C202 78, 184 78, 175 62 Z"
          fill="url(#heroGold)"
        />
      </svg>
      <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-gold-light">
        <span>Hand-Tempered Daily</span>
        <span>Dubai · UAE</span>
      </div>
    </div>
  );
}
