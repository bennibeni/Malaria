export const LANGUAGES = {
  IT: "it",
  EN: "en",
};

export const LANGUAGE_OPTIONS = [
  { code: LANGUAGES.IT, icon: "🇮🇹", label: "Italiano", ariaLabel: "Mostra il testo in italiano" },
  { code: LANGUAGES.EN, icon: "🇬🇧", label: "English", ariaLabel: "Show text in English" },
];

export const UI_TRANSLATIONS = {
  [LANGUAGES.IT]: {
    modalTitle: "Come funziona la simulazione",
    close: "Chiudi",
  },
  [LANGUAGES.EN]: {
    modalTitle: "How the simulation works",
    close: "Close",
  },
};

export const EXPLANATION_TRANSLATIONS = {
  [LANGUAGES.IT]: [
    {
      type: "p",
      content: [
        "La popolazione iniziale contiene individui dei tre genotipi: ",
        { genotype: "AA" },
        ", ",
        { genotype: "AS" },
        " e ",
        { genotype: "SS" },
        ". A ogni generazione gli individui si accoppiano casualmente e trasmettono i loro alleli ai figli secondo le normali regole dell’ereditarietà genetica (leggi di Mendel). Ogni generazione viene sostituita dalla successiva: i genitori non si riproducono di nuovo.",
      ],
    },
    {
      type: "p",
      content: ["I diversi genotipi hanno vantaggi o svantaggi differenti:"],
    },
    {
      type: "ul",
      items: [
        [{ genotype: "AA" }, " → più vulnerabili alla malaria"],
        [{ genotype: "AS" }, " → più protetti dalla malaria (vantaggio dell’eterozigote)"],
        [{ genotype: "SS" }, " → forma grave di anemia falciforme"],
      ],
    },
    {
      type: "p",
      content: [
        "A una certa generazione, possono comparire improvvisamente ",
        { strong: "zanzare portatrici di malaria" },
        ", cambiando le condizioni dell’ambiente. Dopo un certo tempo, le zanzare scompaiono di nuovo, permettendo di osservare anche la fase ",
        { strong: "successiva alla malaria" },
        ".",
      ],
    },
    {
      type: "p",
      content: [
        "Prima dell’arrivo della malaria, il gene ",
        { genotype: "S" },
        " tende a diminuire perché gli individui ",
        { genotype: "SS" },
        " hanno uno svantaggio importante. Quando invece la malaria compare, gli individui ",
        { genotype: "AS" },
        " sopravvivono meglio degli altri e questo permette al gene ",
        { genotype: "S" },
        " di rimanere nella popolazione o persino aumentare.",
      ],
    },
    {
      type: "p",
      content: [
        "La simulazione mostra l’intera popolazione come una ",
        { strong: "griglia dinamica di quadrati" },
        ", in cui ogni cella rappresenta un individuo:",
      ],
    },
    {
      type: "ul",
      items: [
        [{ colored: "Blu (AA)", genotype: "AA" }, " → vulnerabile alla malaria"],
        [{ colored: "Verde (AS)", genotype: "AS" }, " → vantaggio genetico contro la malaria"],
        [{ colored: "Rosso (SS)", genotype: "SS" }, " → anemia falciforme grave"],
      ],
    },
    {
      type: "p",
      content: [
        "L’animazione si aggiorna ogni ",
        { tickMs: "millisecondi" },
        ", così puoi osservare come cambia nel tempo la distribuzione dei genotipi e come un improvviso cambiamento ambientale possa modificare l’equilibrio evolutivo della popolazione.",
      ],
    },
    { type: "hr" },
    {
      type: "p",
      content: [
        "La simulazione mostra un principio fondamentale dell’evoluzione: ",
        { strong: "gli alleli che aumentano la probabilità di sopravvivere e riprodursi tendono a conservarsi" },
        ", mentre quelli svantaggiosi tendono gradualmente a diminuire o scomparire.",
      ],
    },
    {
      type: "p",
      content: [
        "In assenza di malaria, l’allele ",
        { genotype: "S" },
        " tende a diventare più raro. Questo accade perché gli individui ",
        { genotype: "SS" },
        " soffrono di una forma grave di anemia falciforme e hanno meno probabilità di sopravvivere e avere figli. Poiché l’allele ",
        { genotype: "S" },
        " può causare un forte svantaggio, la selezione naturale tende lentamente a ridurne la presenza nella popolazione.",
      ],
    },
    {
      type: "p",
      content: [
        "Quando però arrivano le zanzare portatrici di malaria, l’ambiente cambia. Gli individui ",
        { genotype: "AA" },
        " diventano più vulnerabili alla malattia, mentre gli individui ",
        { genotype: "AS" },
        " ottengono un vantaggio: pur essendo generalmente sani, risultano più protetti contro la malaria.",
      ],
    },
    {
      type: "p",
      content: [
        "Questo fenomeno è chiamato ",
        { strong: "vantaggio dell’eterozigote" },
        ": avere una sola copia dell’allele ",
        { genotype: "S" },
        " può essere utile in un ambiente in cui la malaria è presente. Di conseguenza, durante il periodo di malaria, l’allele ",
        { genotype: "S" },
        " può smettere di diminuire o addirittura aumentare nella popolazione.",
      ],
    },
    {
      type: "p",
      content: [
        "Quando le zanzare scompaiono, la pressione selettiva cambia di nuovo. L’ambiente non favorisce più gli individui ",
        { genotype: "AS" },
        " e torna a pesare soprattutto il costo biologico degli individui ",
        { genotype: "SS" },
        ". Per questo motivo l’allele ",
        { genotype: "S" },
        " può ricominciare lentamente a diminuire.",
      ],
    },
    { type: "hr" },
    {
      type: "p",
      content: [
        "La simulazione mostra quindi come ",
        { strong: "l’evoluzione non persegua un obiettivo fisso" },
        ": ciò che è vantaggioso o svantaggioso dipende dall’ambiente. Un allele può essere sfavorito in certe condizioni e diventare utile in altre. La frequenza dei geni cambia nel tempo perché la selezione naturale favorisce gli individui che, in quel particolare ambiente, hanno maggiori probabilità di sopravvivere e lasciare discendenti.",
      ],
    },
  ],

  [LANGUAGES.EN]: [
    {
      type: "p",
      content: [
        "The initial population contains individuals with all three genotypes: ",
        { genotype: "AA" },
        ", ",
        { genotype: "AS" },
        " and ",
        { genotype: "SS" },
        ". At each generation, individuals mate randomly and pass their alleles to their offspring according to normal Mendelian inheritance. Each generation is replaced by the next one: parents do not reproduce again.",
      ],
    },
    {
      type: "p",
      content: ["The three genotypes have different advantages and disadvantages:"],
    },
    {
      type: "ul",
      items: [
        [{ genotype: "AA" }, " → more vulnerable to malaria"],
        [{ genotype: "AS" }, " → more protected against malaria (heterozygote advantage)"],
        [{ genotype: "SS" }, " → severe sickle cell anemia"],
      ],
    },
    {
      type: "p",
      content: [
        "At a certain generation, ",
        { strong: "malaria-carrying mosquitoes" },
        " may suddenly appear, changing the environment. Later, the mosquitoes disappear again, so the final part of the animation shows the ",
        { strong: "post-malaria phase" },
        ".",
      ],
    },
    {
      type: "p",
      content: [
        "Before malaria arrives, the ",
        { genotype: "S" },
        " allele tends to decline because ",
        { genotype: "SS" },
        " individuals have a strong disadvantage. When malaria appears, ",
        { genotype: "AS" },
        " individuals survive better, allowing the ",
        { genotype: "S" },
        " allele to persist and sometimes increase.",
      ],
    },
    {
      type: "p",
      content: [
        "The simulation shows the whole population as a ",
        { strong: "dynamic square grid" },
        ", where each cell represents one individual:",
      ],
    },
    {
      type: "ul",
      items: [
        [{ colored: "Blue (AA)", genotype: "AA" }, " → vulnerable to malaria"],
        [{ colored: "Green (AS)", genotype: "AS" }, " → heterozygote advantage"],
        [{ colored: "Red (SS)", genotype: "SS" }, " → severe sickle cell anemia"],
      ],
    },
    {
      type: "p",
      content: [
        "The animation updates every ",
        { tickMs: "milliseconds" },
        ", allowing you to observe how genotype frequencies evolve over time and how a sudden environmental change can shift the evolutionary equilibrium of the population.",
      ],
    },
    { type: "hr" },
    {
      type: "p",
      content: [
        "The simulation illustrates a fundamental principle of evolution: ",
        { strong: "alleles that increase the chance of survival and reproduction tend to be preserved" },
        ", while disadvantageous alleles tend to gradually decrease or disappear.",
      ],
    },
    {
      type: "p",
      content: [
        "In the absence of malaria, the ",
        { genotype: "S" },
        " allele tends to become rarer. This happens because ",
        { genotype: "SS" },
        " individuals suffer from severe sickle cell anemia and are less likely to survive and have children. Since the ",
        { genotype: "S" },
        " allele can cause a strong disadvantage in double copy, natural selection slowly reduces its presence in the population.",
      ],
    },
    {
      type: "p",
      content: [
        "When malaria-carrying mosquitoes arrive, the environment changes. ",
        { genotype: "AA" },
        " individuals become more vulnerable to the disease, while ",
        { genotype: "AS" },
        " individuals gain an advantage: they are generally healthy and more protected against malaria.",
      ],
    },
    {
      type: "p",
      content: [
        "This is called ",
        { strong: "heterozygote advantage" },
        ": having one copy of the ",
        { genotype: "S" },
        " allele can be useful in an environment where malaria is present. As a result, during the malaria period, the ",
        { genotype: "S" },
        " allele can stop declining or even increase in the population.",
      ],
    },
    {
      type: "p",
      content: [
        "When the mosquitoes disappear, the selective pressure changes again. The environment no longer favors ",
        { genotype: "AS" },
        " individuals, and the biological cost of ",
        { genotype: "SS" },
        " individuals becomes the main pressure again. For this reason, the ",
        { genotype: "S" },
        " allele can slowly begin to decrease again.",
      ],
    },
    { type: "hr" },
    {
      type: "p",
      content: [
        "The simulation therefore shows that ",
        { strong: "evolution does not pursue a fixed goal" },
        ": what is advantageous or disadvantageous depends on the environment. An allele can be harmful in some conditions and useful in others. Gene frequencies change over time because natural selection favors individuals that, in that particular environment, are more likely to survive and leave descendants.",
      ],
    },
  ],
};
