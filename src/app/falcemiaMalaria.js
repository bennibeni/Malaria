function scegliAllele(genotipo) {
  if (genotipo === "AA") return "A";
  if (genotipo === "SS") return "S";
  return Math.random() < 0.5 ? "A" : "S";
}

function normalizzaGenotipo(a1, a2) {
  return [a1, a2].sort().join("");
}

function creaPopolazioneEterozigote(numeroIndividui) {
  return Array.from({ length: numeroIndividui }, (_, id) => ({
    id,
    genotipo: "AS",
  }));
}

function getRegimeSelettivo({ generazione, generazioneArrivoMalaria, s, t, costoPortatoreSenzaMalaria }) {
  const zanzarePresenti = generazione >= generazioneArrivoMalaria;

  if (zanzarePresenti) {
    return {
      zanzarePresenti,
      nome: "malaria presente",
      descrizione: "Le zanzare portatrici di malaria sono presenti: AS è favorito.",
      wAA: 1 - s,
      wAS: 1,
      wSS: 1 - t,
    };
  }

  return {
    zanzarePresenti,
    nome: "malaria assente",
    descrizione: "Prima dell’arrivo della malaria: AA è favorito, S è debolmente svantaggioso.",
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

  const totale = popolazione.length;
  const alleliA = 2 * conteggi.AA + conteggi.AS;
  const alleliS = 2 * conteggi.SS + conteggi.AS;
  const totaleAlleli = 2 * totale;

  return {
    totale,
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
    const genitore1 = popolazione[Math.floor(Math.random() * popolazione.length)];
    const genitore2 = popolazione[Math.floor(Math.random() * popolazione.length)];

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

function riempiPopolazione(popolazione, dimensioneTarget) {
  if (popolazione.length === 0) {
    throw new Error("Popolazione estinta.");
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

function simulaFalcemiaMalariaIndividuale({
  numeroIndividui = 1024,
  generazioni = 100,
  generazioneArrivoMalaria = 40,
  s = 0.15,
  t = 0.8,
  costoPortatoreSenzaMalaria = 0.02,
} = {}) {
  let popolazione = creaPopolazioneEterozigote(numeroIndividui);

  const storia = [];

  for (let generazione = 0; generazione <= generazioni; generazione++) {
    const regime = getRegimeSelettivo({
      generazione,
      generazioneArrivoMalaria,
      s,
      t,
      costoPortatoreSenzaMalaria,
    });

    storia.push({
      generazione,
      regime,
      ...contaGenotipi(popolazione),
      individui: popolazione.map((individuo) => ({
        id: individuo.id,
        genotipo: individuo.genotipo,
      })),
    });

    const figli = accoppiaCasualmente(popolazione, numeroIndividui);
    const figliSopravvissuti = applicaSelezione(figli, regime);

    popolazione = riempiPopolazione(figliSopravvissuti, numeroIndividui);
  }

  return {
    popolazioneFinale: popolazione,
    storia,
    parametri: {
      numeroIndividui,
      generazioni,
      generazioneArrivoMalaria,
      s,
      t,
      costoPortatoreSenzaMalaria,
    },
  };
}

export { simulaFalcemiaMalariaIndividuale };
