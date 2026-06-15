import { PARAMETRI_SIMULAZIONE } from "./constants";

function scegliAllele(genotipo) {
  if (genotipo === "AA") return "A";
  if (genotipo === "SS") return "S";
  return Math.random() < 0.5 ? "A" : "S";
}

function normalizzaGenotipo(a1, a2) {
  return [a1, a2].sort().join("");
}

function creaPopolazioneIniziale(
  numeroIndividui,
  frequenzaInizialeS = PARAMETRI_SIMULAZIONE.frequenzaInizialeS,
) {
  const q = Math.min(1, Math.max(0, frequenzaInizialeS));
  const p = 1 - q;

  return Array.from({ length: numeroIndividui }, (_, id) => {
    const r = Math.random();

    let genotipo = "SS";

    if (r < p * p) {
      genotipo = "AA";
    } else if (r < p * p + 2 * p * q) {
      genotipo = "AS";
    }

    return { id, genotipo };
  });
}

function getRegimeSelettivo({
  generazione,
  generazioneArrivoMalaria,
  generazioneFineMalaria,
  s,
  t,
  costoPortatoreSenzaMalaria,
}) {
  const zanzarePresenti =
    generazione >= generazioneArrivoMalaria &&
    generazione < generazioneFineMalaria;

  if (zanzarePresenti) {
    return {
      zanzarePresenti,
      nome: "malaria presente",
      descrizione:
        "Le zanzare portatrici di malaria sono presenti: AS è favorito.",
      wAA: 1 - s,
      wAS: 1,
      wSS: 1 - t,
    };
  }

  return {
    zanzarePresenti,
    nome: "malaria assente",
    descrizione: "Malaria assente: AA è favorito, S è svantaggioso.",
    wAA: 1,
    wAS: 1 - costoPortatoreSenzaMalaria,
    wSS: 1 - t,
  };
}

function fitness(genotipo, regime) {
  if (genotipo === "AA") return regime.wAA;
  if (genotipo === "AS") return regime.wAS;
  if (genotipo === "SS") return regime.wSS;
  return 0;
}

function contaGenotipi(popolazione) {
  const conteggi = {
    AA: 0,
    AS: 0,
    SS: 0,
  };

  for (const individuo of popolazione) {
    conteggi[individuo.genotipo]++;
  }

  const totale = popolazione.length || 1;
  const alleliA = 2 * conteggi.AA + conteggi.AS;
  const alleliS = 2 * conteggi.SS + conteggi.AS;
  const totaleAlleli = 2 * totale;

  return {
    totale: popolazione.length,
    AA: conteggi.AA,
    AS: conteggi.AS,
    SS: conteggi.SS,
    frequenzaAA: conteggi.AA / totale,
    frequenzaAS: conteggi.AS / totale,
    frequenzaSS: conteggi.SS / totale,
    pA: alleliA / totaleAlleli,
    qS: alleliS / totaleAlleli,
  };
}

function accoppiaCasualmente(popolazione, numeroFigli) {
  const figli = [];

  for (let i = 0; i < numeroFigli; i++) {
    const genitore1 =
      popolazione[Math.floor(Math.random() * popolazione.length)];
    const genitore2 =
      popolazione[Math.floor(Math.random() * popolazione.length)];

    const allele1 = scegliAllele(genitore1.genotipo);
    const allele2 = scegliAllele(genitore2.genotipo);

    figli.push({
      id: i,
      genotipo: normalizzaGenotipo(allele1, allele2),
    });
  }

  return figli;
}

function applicaSelezione(popolazione, regime) {
  return popolazione.filter((individuo) => {
    const probabilitaSopravvivenza = fitness(individuo.genotipo, regime);
    return Math.random() < probabilitaSopravvivenza;
  });
}

function riempiPopolazione(
  popolazione,
  dimensioneTarget,
  frequenzaInizialeS = PARAMETRI_SIMULAZIONE.frequenzaInizialeS,
) {
  if (popolazione.length === 0) {
    return creaPopolazioneIniziale(dimensioneTarget, frequenzaInizialeS);
  }

  const nuovaPopolazione = [...popolazione];

  while (nuovaPopolazione.length < dimensioneTarget) {
    const modello = popolazione[Math.floor(Math.random() * popolazione.length)];

    nuovaPopolazione.push({
      id: nuovaPopolazione.length,
      genotipo: modello.genotipo,
    });
  }

  return nuovaPopolazione.slice(0, dimensioneTarget).map((individuo, id) => ({
    ...individuo,
    id,
  }));
}

function creaSnapshotGenerazione({
  generationIndex,
  population,
  parametri,
}) {
  const regime = getRegimeSelettivo({
    generazione: generationIndex,
    generazioneArrivoMalaria: parametri.generazioneArrivoMalaria,
    generazioneFineMalaria: parametri.generazioneFineMalaria,
    s: parametri.s,
    t: parametri.t,
    costoPortatoreSenzaMalaria: parametri.costoPortatoreSenzaMalaria,
  });

  return {
    generationIndex,
    generazione: generationIndex,
    regime,
    ...contaGenotipi(population),
    individui: population.map((individuo) => ({
      id: individuo.id,
      genotipo: individuo.genotipo,
    })),
  };
}

function creaStatoInizialeFalcemiaMalaria({
  numeroIndividui = PARAMETRI_SIMULAZIONE.numeroIndividui,
  generazioni = PARAMETRI_SIMULAZIONE.generazioni,
  generazioneArrivoMalaria = PARAMETRI_SIMULAZIONE.generazioneArrivoMalaria,
  generazioneFineMalaria = PARAMETRI_SIMULAZIONE.generazioneFineMalaria,
  frequenzaInizialeS = PARAMETRI_SIMULAZIONE.frequenzaInizialeS,
  s = PARAMETRI_SIMULAZIONE.s,
  t = PARAMETRI_SIMULAZIONE.t,
  costoPortatoreSenzaMalaria = PARAMETRI_SIMULAZIONE.costoPortatoreSenzaMalaria,
} = {}) {
  const parametri = {
    numeroIndividui,
    generazioni,
    generazioneArrivoMalaria,
    generazioneFineMalaria,
    frequenzaInizialeS,
    s,
    t,
    costoPortatoreSenzaMalaria,
  };

  const population = creaPopolazioneIniziale(numeroIndividui, frequenzaInizialeS);
  const generationIndex = 0;
  const snapshot = creaSnapshotGenerazione({ generationIndex, population, parametri });

  return {
    generationIndex,
    population,
    snapshot,
    history: [snapshot],
    parametri,
    completed: generazioni <= 0,
  };
}

function avanzaStatoFalcemiaMalaria(stato) {
  if (!stato || stato.completed) return stato;

  const nextGenerationIndex = stato.generationIndex + 1;
  const regimeFigli = getRegimeSelettivo({
    generazione: nextGenerationIndex,
    generazioneArrivoMalaria: stato.parametri.generazioneArrivoMalaria,
    generazioneFineMalaria: stato.parametri.generazioneFineMalaria,
    s: stato.parametri.s,
    t: stato.parametri.t,
    costoPortatoreSenzaMalaria: stato.parametri.costoPortatoreSenzaMalaria,
  });

  const figli = accoppiaCasualmente(
    stato.population,
    stato.parametri.numeroIndividui,
  );
  const figliSopravvissuti = applicaSelezione(figli, regimeFigli);
  const nextPopulation = riempiPopolazione(
    figliSopravvissuti,
    stato.parametri.numeroIndividui,
    stato.parametri.frequenzaInizialeS,
  );

  const snapshot = creaSnapshotGenerazione({
    generationIndex: nextGenerationIndex,
    population: nextPopulation,
    parametri: stato.parametri,
  });

  return {
    ...stato,
    generationIndex: nextGenerationIndex,
    population: nextPopulation,
    snapshot,
    history: [...stato.history, snapshot],
    completed: nextGenerationIndex >= stato.parametri.generazioni,
  };
}

function simulaFalcemiaMalariaIndividuale(parametri = {}) {
  let stato = creaStatoInizialeFalcemiaMalaria(parametri);

  while (!stato.completed) {
    stato = avanzaStatoFalcemiaMalaria(stato);
  }

  return {
    popolazioneFinale: stato.population,
    storia: stato.history,
    parametri: stato.parametri,
  };
}

export {
  avanzaStatoFalcemiaMalaria,
  contaGenotipi,
  creaStatoInizialeFalcemiaMalaria,
  getRegimeSelettivo,
  simulaFalcemiaMalariaIndividuale,
};
