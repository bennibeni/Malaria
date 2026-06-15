import { useEffect, useState } from "react";
import { simulaFalcemiaMalariaIndividuale } from "./falcemiaMalaria";
import MosquitoSwarm from "./MosquitoSwarm";

const generazioneArrivoMalaria = 20;
const generazioneFineMalaria = 100;
const generazioniTotali = 120;

const COLORI = {
  AA: "bg-sky-300",
  AS: "bg-emerald-400",
  SS: "bg-rose-400",
};

function creaSimulazione() {
  return simulaFalcemiaMalariaIndividuale({
    numeroIndividui: 1024,
    generazioni: generazioniTotali,
    generazioneArrivoMalaria,
    generazioneFineMalaria,
    s: 0.4,
    t: 0.4,
  });
}

function Explanation() {
  return (
    <div className="mb-6 text-[18px] text-zinc-700 dark:text-zinc-300">
      <p>
        La popolazione iniziale contiene individui dei tre genotipi:{" "}
        <span style={{ color: "blue", fontWeight: "bold" }}>AA</span>,{" "}
        <span style={{ color: "green", fontWeight: "bold" }}>AS</span> e{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>SS</span>. A ogni
        generazione gli individui si accoppiano casualmente e trasmettono i loro
        alleli ai figli secondo le normali regole dell’ereditarietà genetica
        (leggi di Mendel). Ogni generazione viene sostituita dalla successiva: i
        genitori non si riproducono di nuovo.
      </p>

      <p>I diversi genotipi hanno vantaggi o svantaggi differenti:</p>

      <ul>
        <li>
          <span style={{ color: "blue", fontWeight: "bold" }}>AA</span> → più
          vulnerabili alla malaria
        </li>
        <li>
          <span style={{ color: "green", fontWeight: "bold" }}>AS</span> → più
          protetti dalla malaria (vantaggio dell’eterozigote)
        </li>
        <li>
          <span style={{ color: "red", fontWeight: "bold" }}>SS</span> → forma
          grave di anemia falciforme
        </li>
      </ul>

      <p>
        A una certa generazione, possono comparire improvvisamente{" "}
        <strong>zanzare portatrici di malaria</strong>, cambiando le condizioni
        dell’ambiente. Dopo un certo tempo, le zanzare scompaiono di nuovo,
        permettendo di osservare anche la fase{" "}
        <strong>successiva alla malaria</strong>.
      </p>

      <p>
        Prima dell’arrivo della malaria, il gene{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>S</span> tende a
        diminuire perché gli individui{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>SS</span> hanno uno
        svantaggio importante. Quando invece la malaria compare, gli individui{" "}
        <span style={{ color: "green", fontWeight: "bold" }}>AS</span>{" "}
        sopravvivono meglio degli altri e questo permette al gene{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>S</span> di rimanere
        nella popolazione o persino aumentare.
      </p>

      <p>
        La simulazione mostra l’intera popolazione come una{" "}
        <strong>griglia dinamica di quadrati</strong>, in cui ogni cella
        rappresenta un individuo:
      </p>

      <ul>
        <li>
          <span style={{ color: "blue", fontWeight: "bold" }}>Blu (AA)</span> →
          vulnerabile alla malaria
        </li>
        <li>
          <span style={{ color: "green", fontWeight: "bold" }}>Verde (AS)</span>{" "}
          → vantaggio genetico contro la malaria
        </li>
        <li>
          <span style={{ color: "red", fontWeight: "bold" }}>Rosso (SS)</span> →
          anemia falciforme grave
        </li>
      </ul>

      <p>
        L’animazione si aggiorna ogni <strong>100 millisecondi</strong>, così
        puoi osservare come cambia nel tempo la distribuzione dei genotipi e
        come un improvviso cambiamento ambientale possa modificare l’equilibrio
        evolutivo della popolazione.
      </p>

      <hr className="my-6 border-zinc-300 dark:border-zinc-700" />

      <p>
        La simulazione mostra un principio fondamentale dell’evoluzione:
        <strong>
          {" "}
          gli alleli che aumentano la probabilità di sopravvivere e riprodursi
          tendono a conservarsi
        </strong>
        , mentre quelli svantaggiosi tendono gradualmente a diminuire o
        scomparire.
      </p>

      <p>
        In assenza di malaria, l’allele{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>S</span> tende a
        diventare più raro. Questo accade perché gli individui{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>SS</span> soffrono di
        una forma grave di anemia falciforme e hanno meno probabilità di
        sopravvivere e avere figli. Poiché l’allele{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>S</span> può causare
        un forte svantaggio, la selezione naturale tende lentamente a ridurne la
        presenza nella popolazione.
      </p>

      <p>
        Quando però arrivano le zanzare portatrici di malaria, l’ambiente
        cambia. Gli individui{" "}
        <span style={{ color: "blue", fontWeight: "bold" }}>AA</span> diventano
        più vulnerabili alla malattia, mentre gli individui{" "}
        <span style={{ color: "green", fontWeight: "bold" }}>AS</span> ottengono
        un vantaggio: pur essendo generalmente sani, risultano più protetti
        contro la malaria.
      </p>

      <p>
        Questo fenomeno è chiamato <strong>vantaggio dell’eterozigote</strong>:
        avere una sola copia dell’allele{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>S</span> può essere
        utile in un ambiente in cui la malaria è presente. Di conseguenza,
        durante il periodo di malaria, l’allele{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>S</span> può smettere
        di diminuire o addirittura aumentare nella popolazione.
      </p>

      <p>
        Quando le zanzare scompaiono, la pressione selettiva cambia di nuovo.
        L’ambiente non favorisce più gli individui{" "}
        <span style={{ color: "green", fontWeight: "bold" }}>AS</span> e torna a
        pesare soprattutto il costo biologico degli individui{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>SS</span>. Per questo
        motivo l’allele{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>S</span> può
        ricominciare lentamente a diminuire.
      </p>
      <hr className="my-6 border-zinc-300 dark:border-zinc-700" />
      <p>
        La simulazione mostra quindi come{" "}
        <strong>l’evoluzione non persegua un obiettivo fisso</strong>: ciò che è
        vantaggioso o svantaggioso dipende dall’ambiente. Un allele può essere
        sfavorito in certe condizioni e diventare utile in altre. La frequenza
        dei geni cambia nel tempo perché la selezione naturale favorisce gli
        individui che, in quel particolare ambiente, hanno maggiori probabilità
        di sopravvivere e lasciare discendenti.
      </p>
    </div>
  );
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

        {/* Explanation component extracted for readability */}
        <div className="mb-6 max-h-120 overflow-y-auto rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
          <Explanation />
        </div>

        <div className="mb-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
          <p className="text-lg font-semibold dark:text-white">
            Generation {generazione.generazione}
          </p>

          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            {malariaAttiva
              ? "🦟 Malaria-carrying mosquitoes have arrived."
              : malariaInDissolvenza
                ? "🦟 Mosquitoes are fading away."
                : generazione.generazione < generazioneArrivoMalaria
                  ? `🦟 No malaria (will arrive at generation ${generazioneArrivoMalaria}).`
                  : `🦟 No malaria: mosquitoes disappeared at generation ${generazioneFineMalaria}.`}
          </p>
        </div>
        <div className="mb-6 grid gap-3 text-sm text-zinc-700 dark:text-zinc-300 sm:grid-cols-2 lg:grid-cols-6">
          <div>
            <span className="XX">AA</span>
            <br />
            {generazione.AA}
          </div>

          <div>
            <span className="XX">AS</span>
            <br />
            {generazione.AS}
          </div>

          <div>
            <span className="XX">SS</span>
            <br />
            {generazione.SS}
          </div>

          <div>
            <span className="XX">p(A)</span>
            <br />
            {generazione.pA.toFixed(4)}
          </div>

          <div>
            <span className="XX">q(S)</span>
            <br />
            {generazione.qS.toFixed(4)}
          </div>

          <div>
            <span className="XX">Malaria</span>
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
