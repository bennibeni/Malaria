export const GENERAZIONE_ARRIVO_MALARIA = 20;
export const GENERAZIONE_FINE_MALARIA = 100;
export const GENERAZIONI_TOTALI = 120;
export const GENERAZIONI_DISSOLVENZA_ZANZARE = 6;
export const SIMULATION_TICK_MS = 100;

export const SIMULATION_SPEED_OPTIONS = [
  { label: "Slow", tickMs: 300 },
  { label: "Normal", tickMs: 100 },
  { label: "Fast", tickMs: 40 },
];

export const COLORI = {
  AA: "bg-sky-300",
  AS: "bg-emerald-400",
  SS: "bg-rose-400",
};

export const GENOTYPE_TEXT_COLORS = {
  AA: "blue",
  AS: "green",
  SS: "red",
  S: "red",
};

export const PARAMETRI_SIMULAZIONE = {
  numeroIndividui: 1024,
  generazioni: GENERAZIONI_TOTALI,
  generazioneArrivoMalaria: GENERAZIONE_ARRIVO_MALARIA,
  generazioneFineMalaria: GENERAZIONE_FINE_MALARIA,
  frequenzaInizialeS: 0.35,
  s: 0.4,
  t: 0.4,
  costoPortatoreSenzaMalaria: 0.02,
};

export const MOSQUITO_COUNT = 40;
export const MOSQUITO_FADE_TRANSITION_MS = 3000;

export const MOSQUITO_POSITION_RANGE = {
  topMin: 5,
  topMax: 90,
  delayMin: 0,
  delayMax: 4,
  durationMin: 5,
  durationMax: 12,
  sizeMin: 14,
  sizeMax: 28,
};

export const GRID_CELL_SIZE_PX = 12;
