"use client";

import { useMemo } from "react";

import {
  MOSQUITO_COUNT,
  MOSQUITO_FADE_TRANSITION_MS,
  MOSQUITO_POSITION_RANGE,
} from "./constants";

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function MosquitoSwarm({ active = false, fadeOut = false }) {
  const mosquitoes = useMemo(
    () =>
      Array.from({ length: MOSQUITO_COUNT }, (_, i) => ({
        id: i,
        top: randomBetween(
          MOSQUITO_POSITION_RANGE.topMin,
          MOSQUITO_POSITION_RANGE.topMax,
        ),
        delay: randomBetween(
          MOSQUITO_POSITION_RANGE.delayMin,
          MOSQUITO_POSITION_RANGE.delayMax,
        ),
        duration: randomBetween(
          MOSQUITO_POSITION_RANGE.durationMin,
          MOSQUITO_POSITION_RANGE.durationMax,
        ),
        size: randomBetween(
          MOSQUITO_POSITION_RANGE.sizeMin,
          MOSQUITO_POSITION_RANGE.sizeMax,
        ),
      })),
    [],
  );

  if (!active && !fadeOut) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
      style={{ transitionDuration: `${MOSQUITO_FADE_TRANSITION_MS}ms` }}
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
