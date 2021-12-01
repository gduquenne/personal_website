const part3 = [
  {
    en: 'I discovered programming during my ',
    fr: "J'ai découvert la programmation lors de ma première année de "
  },
  {
    en: [
      'D.U.T. G.E.I.I.',
      'https://www.onisep.fr/Ressources/Univers-Formation/Formations/Post-bac/dut-genie-electrique-et-informatique-industrielle'
    ],
    fr: [
      'D.U.T. G.E.I.I.',
      'https://www.onisep.fr/Ressources/Univers-Formation/Formations/Post-bac/dut-genie-electrique-et-informatique-industrielle'
    ]
  },
  {
    en: ' first year with C and automation languages (',
    fr: " avec le C et les langages d'automatisme ("
  },
  {
    en: ['GRAFCET', 'https://fr.wikipedia.org/wiki/Grafcet'],
    fr: ['GRAFCET', 'https://fr.wikipedia.org/wiki/Grafcet']
  },
  {
    en: ', ',
    fr: ', '
  },
  {
    en: ['LADDER', 'https://en.wikipedia.org/wiki/Ladder_logic'],
    fr: ['LADDER', 'https://fr.wikipedia.org/wiki/Langage_Ladder']
  },
  {
    en: ').',
    fr: ').'
  }
];
const part4 = [
  {
    en:
      'I have always been able to think of things as more complicated than they really are, but this means that I am never afraid of the task, no matter how complex it is.' +
      ' Some methods and tools help me to make the code clearer and more optimised, I particularly think to ',
    fr:
      "J'ai toujours su penser les choses plus compliquées qu'elles ne le sont réellement, néanmoins cela me vaut de ne jamais être effrayé par la tâche, quelque soit sa complexité." +
      " Certaines méthodes et outils m'aident notamment à rendre le code toujours plus clair et optimisé, je pense particulièrement à la programmation fonctionnelleSonarCloud."
  },
  {
    en: [
      'functionnal programming',
      'https://en.wikipedia.org/wiki/Functional_programming'
    ],
    fr: [
      'programmation fonctionnelle',
      'https://fr.wikipedia.org/wiki/Programmation_fonctionnelle'
    ]
  },
  {
    en: ' and the ',
    fr: " et l'outil de contrôle qualité "
  },
  {
    en: ['SonarCloud', 'https://sonarcloud.io/'],
    fr: ['SonarCloud', 'https://sonarcloud.io/']
  },
  { en: ' quality control tool.', fr: '.' }
];
const texts = {
  paragraphs: [
    {
      en:
        'Hello! My name is Grégoire and I like just about anything related to technology.' +
        ' My interest in this last one goes back to my youngest age, I was born with a controller in my hands so to speak.',
      fr:
        "Bonjour! Je m'appelle Grégoire et j'aime un peu tout ce qui touche à la technologie." +
        ' Mon intérêt pour cette dernière remonte à mon plus jeune âge, je suis pour ainsi dire né avec une manette dans les mains.'
    },
    {
      en: 'As the third of five siblings, my perseverance and sense of perfectionism were honed by the constant competition between us.',
      fr: "Troisième d'une fratrie de cinq, ma persévérance et mon sens du perfectionnisme ont été aiguisés grâce la constante compétition régnant entre nous."
    },
    part3,
    part4,
    {
      en: 'Here are some of the technologies I have recently worked with :',
      fr: "Voici quelques unes des technologies avec lesquelles j'ai récemment travaillé :"
    }
  ],
  technos: ['Javascript (ES6+)', 'React', 'Node.js', 'Material-UI', 'Fabric.js']
};

export default texts;
