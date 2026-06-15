import {
  avanzaStatoFalcemiaMalaria,
  creaStatoInizialeFalcemiaMalaria,
} from "./falcemiaMalaria";
import { PARAMETRI_SIMULAZIONE, SIMULATION_TICK_MS } from "./constants";
import { LANGUAGES } from "./translations";

export const SIMULATION_ACTIONS = {
  RESET: "reset",
  RESTART: "restart",
  PLAY: "play",
  PAUSE: "pause",
  TOGGLE_PLAY: "toggle-play",
  TICK: "tick",
  STEP_FORWARD: "step-forward",
  RUN_TO_END: "run-to-end",
  SET_SPEED: "set-speed",
  SET_PARAMETER: "set-parameter",
  SET_LANGUAGE: "set-language",
};

export function createSimulationState(parametri = PARAMETRI_SIMULAZIONE) {
  return creaStatoInizialeFalcemiaMalaria(parametri);
}

export const initialSimulationReducerState = {
  simulation: null,
  isPlaying: true,
  tickMs: SIMULATION_TICK_MS,
  language: LANGUAGES.IT,
};

function advanceSimulation(simulation) {
  if (!simulation || simulation.completed) return simulation;
  return avanzaStatoFalcemiaMalaria(simulation);
}

function runSimulationToEnd(simulation) {
  let current = simulation;

  while (current && !current.completed) {
    current = avanzaStatoFalcemiaMalaria(current);
  }

  return current;
}

function recreateSimulationWithParams(state, parametri) {
  return {
    ...state,
    simulation: createSimulationState(parametri),
  };
}

export function simulationReducer(state, action) {
  switch (action.type) {
    case SIMULATION_ACTIONS.RESET:
      return {
        ...state,
        simulation: action.payload ?? createSimulationState(),
        isPlaying: false,
      };

    case SIMULATION_ACTIONS.RESTART:
      return {
        ...state,
        simulation: createSimulationState(
          state.simulation?.parametri ?? PARAMETRI_SIMULAZIONE,
        ),
        isPlaying: true,
      };

    case SIMULATION_ACTIONS.PLAY:
      return {
        ...state,
        isPlaying: true,
      };

    case SIMULATION_ACTIONS.PAUSE:
      return {
        ...state,
        isPlaying: false,
      };

    case SIMULATION_ACTIONS.TOGGLE_PLAY:
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };

    case SIMULATION_ACTIONS.TICK:
      if (!state.isPlaying) return state;

      return {
        ...state,
        simulation: advanceSimulation(state.simulation),
      };

    case SIMULATION_ACTIONS.STEP_FORWARD:
      return {
        ...state,
        isPlaying: false,
        simulation: advanceSimulation(state.simulation),
      };

    case SIMULATION_ACTIONS.RUN_TO_END:
      return {
        ...state,
        isPlaying: false,
        simulation: runSimulationToEnd(state.simulation),
      };

    case SIMULATION_ACTIONS.SET_SPEED:
      return {
        ...state,
        tickMs: action.payload,
      };

    case SIMULATION_ACTIONS.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };

    case SIMULATION_ACTIONS.SET_PARAMETER: {
      if (!state.simulation) return state;

      const nextParametri = {
        ...state.simulation.parametri,
        [action.payload.name]: action.payload.value,
      };

      return recreateSimulationWithParams(
        {
          ...state,
          isPlaying: false,
        },
        nextParametri,
      );
    }

    default:
      return state;
  }
}
