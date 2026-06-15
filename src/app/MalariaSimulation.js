"use client";

import { Fragment, useEffect, useReducer, useState } from "react";
import MosquitoSwarm from "./MosquitoSwarm";
import {
  COLORI,
  GENOTYPE_TEXT_COLORS,
  GENERAZIONI_DISSOLVENZA_ZANZARE,
  GRID_CELL_SIZE_PX,
  SIMULATION_TICK_MS,
  SIMULATION_SPEED_OPTIONS,
} from "./constants";
import {
  SIMULATION_ACTIONS,
  createSimulationState,
  initialSimulationReducerState,
  simulationReducer,
} from "./simulationReducer";
import {
  EXPLANATION_TRANSLATIONS,
  LANGUAGE_OPTIONS,
  UI_TRANSLATIONS,
} from "./translations";

function GenotypeLabel({ children, genotype }) {
  return (
    <span
      style={{
        color: GENOTYPE_TEXT_COLORS[genotype],
        fontWeight: "bold",
      }}
    >
      {children ?? genotype}
    </span>
  );
}

function renderTextToken(token, index) {
  if (typeof token === "string") {
    return <Fragment key={index}>{token}</Fragment>;
  }

  if (token.genotype && token.colored) {
    return (
      <GenotypeLabel key={index} genotype={token.genotype}>
        {token.colored}
      </GenotypeLabel>
    );
  }

  if (token.genotype) {
    return <GenotypeLabel key={index} genotype={token.genotype} />;
  }

  if (token.strong) {
    return <strong key={index}>{token.strong}</strong>;
  }

  if (token.tickMs) {
    return (
      <strong key={index}>
        {SIMULATION_TICK_MS} {token.tickMs}
      </strong>
    );
  }

  return null;
}

function renderTextContent(content) {
  return content.map((token, index) => renderTextToken(token, index));
}

function Explanation({ language }) {
  const blocks = EXPLANATION_TRANSLATIONS[language];

  return (
    <div className="mb-6 text-[18px] text-zinc-700 dark:text-zinc-300">
      {blocks.map((block, blockIndex) => {
        if (block.type === "hr") {
          return (
            <hr
              key={`hr-${blockIndex}`}
              className="my-6 border-zinc-300 dark:border-zinc-700"
            />
          );
        }

        if (block.type === "ul") {
          return (
            <ul key={`ul-${blockIndex}`}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderTextContent(item)}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`p-${blockIndex}`}>{renderTextContent(block.content)}</p>
        );
      })}
    </div>
  );
}

function ExplanationModal({ language, onChangeLanguage, open, onClose }) {
  if (!open) return null;

  const t = UI_TRANSLATIONS[language];

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[80vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            {t.modalTitle}
          </h2>

          <div className="flex items-center gap-2">
            {LANGUAGE_OPTIONS.map((option) => (
              <button
                key={option.code}
                type="button"
                onClick={() => onChangeLanguage(option.code)}
                aria-label={option.ariaLabel}
                title={option.label}
                className={`rounded-xl border px-3 py-2 text-lg transition ${
                  language === option.code
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-black"
                    : "border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
                }`}
              >
                {option.icon}
              </button>
            ))}

            <button
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="rounded-xl border border-zinc-300 px-3 py-2 text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
            >
              ✕
            </button>
          </div>
        </div>

        <Explanation language={language} />

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-zinc-900 px-5 py-3 text-white transition hover:opacity-80 dark:bg-zinc-100 dark:text-black"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MalariaSimulation() {
  const [state, dispatch] = useReducer(
    simulationReducer,
    initialSimulationReducerState,
  );
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);

  useEffect(() => {
    dispatch({
      type: SIMULATION_ACTIONS.RESET,
      payload: createSimulationState(),
    });
  }, []);

  useEffect(() => {
    if (!state.simulation || !state.isPlaying || state.simulation.completed) {
      return;
    }

    const timer = setTimeout(() => {
      dispatch({ type: SIMULATION_ACTIONS.TICK });
    }, state.tickMs);

    return () => clearTimeout(timer);
  }, [state.simulation, state.isPlaying, state.tickMs]);

  function nuovaSimulazione() {
    dispatch({
      type: SIMULATION_ACTIONS.RESET,
      payload: createSimulationState(),
    });
  }

  function togglePlay() {
    dispatch({ type: SIMULATION_ACTIONS.TOGGLE_PLAY });
  }

  function stepForward() {
    dispatch({ type: SIMULATION_ACTIONS.STEP_FORWARD });
  }

  function runToEnd() {
    dispatch({ type: SIMULATION_ACTIONS.RUN_TO_END });
  }

  function setSpeed(tickMs) {
    dispatch({ type: SIMULATION_ACTIONS.SET_SPEED, payload: tickMs });
  }

  function setLanguage(language) {
    dispatch({ type: SIMULATION_ACTIONS.SET_LANGUAGE, payload: language });
  }

  if (!state.simulation) {
    return (
      <div className="relative min-h-screen bg-zinc-50 p-8 font-sans dark:bg-black">
        <div className="mx-auto max-w-6xl rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-900">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Sickle Cell / Malaria Simulation
          </h1>
          <p className="mt-4 text-zinc-700 dark:text-zinc-300">
            Preparing simulation...
          </p>
        </div>
      </div>
    );
  }

  const simulationState = state.simulation;
  const generazione = simulationState.snapshot;
  const parametri = simulationState.parametri;

  const malariaAttiva =
    generazione.generazione >= parametri.generazioneArrivoMalaria &&
    generazione.generazione < parametri.generazioneFineMalaria;

  const malariaTerminata =
    generazione.generazione >= parametri.generazioneFineMalaria;

  const malariaInDissolvenza =
    malariaTerminata &&
    generazione.generazione <
      parametri.generazioneFineMalaria + GENERAZIONI_DISSOLVENZA_ZANZARE;
  const lato = Math.ceil(Math.sqrt(generazione.individui.length));

  return (
    <div className="relative min-h-screen bg-zinc-50 p-8 font-sans dark:bg-black">
      {/* SCIAME DI ZANZARE */}
      <MosquitoSwarm active={malariaAttiva} fadeOut={malariaInDissolvenza} />

      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-900">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Sickle Cell / Malaria Simulation
          </h1>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsExplanationOpen(true)}
              className="rounded-xl border border-zinc-300 px-5 py-3 text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
            >
              How it works
            </button>

            <button
              type="button"
              onClick={togglePlay}
              disabled={simulationState.completed}
              className="rounded-xl border border-zinc-300 px-5 py-3 text-zinc-900 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
            >
              {state.isPlaying && !simulationState.completed ? "Pause" : "Play"}
            </button>

            <button
              type="button"
              onClick={stepForward}
              disabled={simulationState.completed}
              className="rounded-xl border border-zinc-300 px-5 py-3 text-zinc-900 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
            >
              Step +1
            </button>

            <button
              type="button"
              onClick={runToEnd}
              disabled={simulationState.completed}
              className="rounded-xl border border-zinc-300 px-5 py-3 text-zinc-900 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
            >
              Run to end
            </button>

            <button
              type="button"
              onClick={nuovaSimulazione}
              className="rounded-xl bg-zinc-900 px-5 py-3 text-white transition hover:opacity-80 dark:bg-zinc-100 dark:text-black"
            >
              New Simulation
            </button>
          </div>
        </div>

        <ExplanationModal
          language={state.language}
          onChangeLanguage={setLanguage}
          open={isExplanationOpen}
          onClose={() => setIsExplanationOpen(false)}
        />

        <div className="mb-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
          <p className="text-lg font-semibold dark:text-white">
            Generation {generazione.generazione}
            {simulationState.completed ? " — completed" : ""}
          </p>

          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            {malariaAttiva
              ? "🦟 Malaria-carrying mosquitoes have arrived."
              : malariaInDissolvenza
                ? "🦟 Mosquitoes are fading away."
                : generazione.generazione < parametri.generazioneArrivoMalaria
                  ? `🦟 No malaria (will arrive at generation ${parametri.generazioneArrivoMalaria}).`
                  : `🦟 No malaria: mosquitoes disappeared at generation ${parametri.generazioneFineMalaria}.`}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <span className="mr-2 font-semibold">Speed</span>
            {SIMULATION_SPEED_OPTIONS.map((option) => (
              <button
                key={option.tickMs}
                type="button"
                onClick={() => setSpeed(option.tickMs)}
                className={`rounded-lg border px-3 py-2 transition ${
                  state.tickMs === option.tickMs
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-black"
                    : "border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6 grid gap-3 text-sm text-zinc-700 dark:text-zinc-300 sm:grid-cols-2 lg:grid-cols-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              AA
            </span>
            <br />
            {generazione.AA}
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              AS
            </span>
            <br />
            {generazione.AS}
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              SS
            </span>
            <br />
            {generazione.SS}
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              p(A)
            </span>
            <br />
            {generazione.pA.toFixed(4)}
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              q(S)
            </span>
            <br />
            {generazione.qS.toFixed(4)}
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Malaria
            </span>
            <br />
            {malariaAttiva
              ? "Present"
              : malariaInDissolvenza
                ? "Fading away"
                : "Absent"}
          </div>
        </div>
        <div className="mb-6 flex flex-wrap gap-4 text-sm text-zinc-700 dark:text-zinc-300">
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-sky-300" />
            AA — malaria vulnerable
          </span>

          <span className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-emerald-400" />
            AS — heterozygote advantage
          </span>

          <span className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-rose-400" />
            SS — severe sickle cell anemia
          </span>
        </div>
        <div
          className="grid gap-px"
          style={{
            gridTemplateColumns: `repeat(${lato}, ${GRID_CELL_SIZE_PX}px)`,
          }}
        >
          {generazione.individui.map((individuo) => (
            <div
              key={individuo.id}
              title={individuo.genotipo}
              className={`rounded-xs ${COLORI[individuo.genotipo]}`}
              style={{
                width: `${GRID_CELL_SIZE_PX}px`,
                height: `${GRID_CELL_SIZE_PX}px`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
