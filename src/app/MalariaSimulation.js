import { useEffect, useState } from "react";
import { simulaFalcemiaMalariaIndividuale } from "./falcemiaMalaria";
import MosquitoSwarm from "./MosquitoSwarm";

const generazioneArrivoMalaria = 40;

const COLORI = {
  AA: "bg-sky-300",
  AS: "bg-emerald-400",
  SS: "bg-rose-400",
};

function creaSimulazione() {
  return simulaFalcemiaMalariaIndividuale({
    numeroIndividui: 1024,
    generazioni: 100,
    generazioneArrivoMalaria,
    s: 0.4,
    t: 0.4,
  });
}

export default function MalariaSimulation() {
  const [risultato, setRisultato] = useState(() => creaSimulazione());

  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (indice >= risultato.storia.length - 1) {
      return;
    }

    const timer = setTimeout(() => {
      setIndice((i) => i + 1);
    }, 100);

    return () => clearTimeout(timer);
  }, [indice, risultato.storia.length]);

  function nuovaSimulazione() {
    setIndice(0);
    setRisultato(creaSimulazione());
  }

  const generazione = risultato.storia[indice];

  const generazioneFineMalaria = 100;

  const malariaAttiva =
    generazione.generazione >= generazioneArrivoMalaria &&
    generazione.generazione < generazioneFineMalaria;

  const malariaInDissolvenza =
    generazione.generazione >= generazioneFineMalaria;
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

          <button
            type="button"
            onClick={nuovaSimulazione}
            className="rounded-xl bg-zinc-900 px-5 py-3 text-white transition hover:opacity-80 dark:bg-zinc-100 dark:text-black"
          >
            New Simulation
          </button>
        </div>

        <p className="mb-6 max-w-3xl text-zinc-700 dark:text-zinc-300">
          The initial population consists of heterozygous individuals{" "}
          <strong>AS</strong>. At each generation, individuals mate randomly and
          produce offspring according to Mendelian inheritance. Parents do not
          reproduce again after their generation, creating a fully discrete
          generational model. Natural selection acts on genotypes with different
          fitness values: AA — vulnerable to malaria AS — protected against
          malaria (heterozygote advantage) SS — severe sickle cell anemia At a
          configurable generation, malaria-carrying mosquitoes may suddenly
          invade the environment, changing the selective pressure on the
          population. Before malaria arrives, the sickle-cell allele S tends to
          decline because SS individuals are strongly disadvantaged. After
          malaria appears, heterozygous AS individuals gain a survival
          advantage, allowing the S allele to persist and sometimes increase.
          The simulation visualizes the entire population as a dynamic square
          grid in which each cell represents one individual: Blue (AA) — malaria
          vulnerable Green (AS) — heterozygote advantage Red (SS) — severe
          sickle cell anemia The animation updates every 100 ms, allowing you to
          observe how genotype frequencies evolve over time and how a sudden
          environmental change can shift the evolutionary equilibrium of the
          population.
        </p>

        <div className="mb-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
          <p className="text-lg font-semibold dark:text-white">
            Generation {generazione.generazione}
          </p>

          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            {malariaAttiva
              ? "🦟 Malaria-carrying mosquitoes have arrived."
              : malariaInDissolvenza
                ? "🦟 Mosquitoes are fading away."
                : `🦟 No malaria (will arrive at generation ${generazioneArrivoMalaria}).`}
          </p>
        </div>
        <div className="mb-6 grid gap-3 text-sm text-zinc-700 dark:text-zinc-300 sm:grid-cols-2 lg:grid-cols-6">
          <div>
            <strong>AA</strong>
            <br />
            {generazione.AA}
          </div>

          <div>
            <strong>AS</strong>
            <br />
            {generazione.AS}
          </div>

          <div>
            <strong>SS</strong>
            <br />
            {generazione.SS}
          </div>

          <div>
            <strong>p(A)</strong>
            <br />
            {generazione.pA.toFixed(4)}
          </div>

          <div>
            <strong>q(S)</strong>
            <br />
            {generazione.qS.toFixed(4)}
          </div>

          <div>
            <strong>Malaria</strong>
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
            gridTemplateColumns: `repeat(${lato}, 12px)`,
          }}
        >
          {generazione.individui.map((individuo) => (
            <div
              key={individuo.id}
              title={individuo.genotipo}
              className={`h-3 w-3 rounded-xs ${COLORI[individuo.genotipo]}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
