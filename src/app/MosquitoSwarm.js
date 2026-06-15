"use client";

const MOSQUITO_COUNT = 40;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function MosquitoSwarm({ active = false, fadeOut = false }) {
  if (!active && !fadeOut) return null;

  const mosquitoes = Array.from({ length: MOSQUITO_COUNT }, (_, i) => ({
    id: i,
    top: randomBetween(5, 90),
    delay: randomBetween(0, 4),
    duration: randomBetween(5, 12),
    size: randomBetween(14, 28),
  }));

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-3000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {mosquitoes.map((m) => (
        <div
          key={m.id}
          className="absolute animate-mosquito"
          style={{
            top: `${m.top}%`,
            right: "-40px",
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
            fontSize: `${m.size}px`,
          }}
        >
          🦟
        </div>
      ))}
    </div>
  );
}
