export const translation = {

  language: {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    ru: 'Русский'
  },

  user: {
    roles: {
      reviewer: 'Reviewer',
      nationalCorrespondent: 'National Correspondent',
      noRole: 'N/A'
    }
  },

  fraClass: {
    forest: 'Forêt',
    otherWoodedLand: 'Autres terres boisées (ATB)',
    otherLand: 'Autres terres'
  },

  // components

  navigation: {
    annuallyReported: 'Annually reported',
    fiveYearCycle: 'Five-year Cycle',
    assessmentStatus: {
      changing: {
        label: 'Changing...'
      },
      review: {
        label: 'In Review',
        next: 'Send to review',
        previous: 'Back to review'
      },
      accepted: {
        label: 'Accepted',
        next: 'Accept',
        previous: ''
      },
      editing: {
        label: '', //Currently we do not wish to show the default state at all
        next: 'Start over (to editing)',
        previous: 'remove'
      }
    }
  },

  footer: {
    logout: 'Se déconnecter',
    autoSave: {
      saving: 'En train de enregistrer...'
    }
  },

  review: {
    comments: 'Commentaires',
    noComments: 'Aucun commentaire',
    resolve: 'Résolvez',
    commentTime: {
      hour: 'Il y a {{count}} heure',
      hour_plural: 'Il y a {{count}} heures',
      day: 'Il y a {{count}} jour',
      day_plural: 'Il y a {{count}} jours',
      week: 'Il y a {{count}} semaine',
      week_plural: 'Il y a {{count}} semaines',
      aMomentAgo: 'Il y a quelques instants'
    },
    commentDeleted: 'Commentaire effacé',
    commentMarkedAsResolved: 'Marqué comme résolu',
    delete: 'Effacez',
    writeComment: 'Écrivez un commentaire …',
    commentingClosed: 'Commentaires fermés',
    add: 'Ajoutez',
    cancel: 'Annulez'
  },

  description: {
    description: 'Description'
  },

  nationalDataPoint: {
    nationalDataPoint: 'Point national des données',
    addNationalDataPoint: 'Ajoutez un point nationl des données',
    noNationalDataAdded: 'Aucune donnée nationale ajoutée',
    nationalData: 'Données nationales',
    year: 'Année',
    methods: 'Méthodes',
    edit: 'Editez',
    copyPreviousValues: 'Copiez les valeurs précédentes',
    nationalClass: 'Classe nationale',
    nationalClasses: 'Classes nationales',
    definition: 'Définition',
    fraClasses: 'Classes de FRA',
    class: 'Classe',
    area: 'Superficie',
    total: 'Total',
    delete: 'Effacez',
    cancel: 'Annulez',
    saveData: 'Enregistrez les données',
    enterOrCopyPasteNationalClasses: 'Entrez ou copiez et collez les classes nationales'
  },

  // annually reported assessment components

  extentOfForest: {
    extentOfForest: 'Étendue de la forêt',
    generateFraValues: 'Générer les valeurs de FRA',
    extentOfForestValues: 'Étendue de valeurs de la forêt',
    forestArea: 'Superficie forestière',
    dataSources: 'Sources des données',
    nationalClassificationAndDefinitions: 'Classement et définitions nationals',
    originalData: 'Données de base',
    chart: {
      noDataPlaceholderLine1: 'Pour commencer, ajoutez des nouveaux points nationaux des données',
      noDataPlaceholderLine2: 'et utilisez-les pour générer automatiquement les valeurs de FRA.'
    }
  },

  growingStock: {
    growingStock: 'Matériel sur pied'
  },

  biomassStock: {
    biomassStock: 'Stock de biomasse'
  },

  carbonStock: {
    carbonStock: 'Stock de carbone'
  },

  protectedAreas: {
    protectedAreasLongTermMgmtPlans: 'Aires protégées et plans de gestion à long terme'
  },

  // five year cycle assessment components

  forestAreaChange: {
    forestAreaLossGainChange: 'Perte, augmentation et variation nette de la superficie forestière',
    forestExpansion: 'Expansion de la forêt (a)',
    ofWhichAfforestation: '... dont boisement',
    ofWhichNaturalExpansion: '... dont expansion naturelle',
    deforestation: 'Déforestation (b)',
    forestAreaNetChange: 'Variation nette de la superficie forestière'
  },

  forestCharacteristics: {
    forestCharacteristics: 'Caractéristiques des forêts'
  },

  specificForestCategories: {
    specificForestCategories: 'Catégories forestières spécifiques',
    bamboo: 'Bambou',
    mangroves: 'Mangroves',
    rubberPlantations: 'Plantations de caoutchouc '
  },

  growingStockComposition: {
    growingStockComposition: 'Composition du matériel sur pied'
  },

  nonWoodForestProducts: {
    nonWoodForestProducts: 'Produit forestier non ligneux'
  },

  primaryDesignatedManagementObjective: {
    primaryDesignatedManagementObjective: 'Principaux objectifs de gestion désignés',
    production: 'Production',
    soilWaterProtection: 'Protection des sols et de l\'eau',
    biodiversityConservation: 'Conservation de la biodiversité',
    socialServices: 'Services sociaux',
    multipleUse: 'Usages multiples',
    other: 'Autres',
    unknown: 'Inconnue',
    totalForestArea: 'Superficie forestière totale'
  },

  forestOwnershipManagementRights: {
    forestOwnershipManagementRights: 'Propriété des forêts et droits de gestion'
  },

  disturbances: {
    disturbances: 'Perturbation'
  },

  areaAffectedByFire: {
    areaAffectedByFire: 'Superficie brûlée',
    totalLandAreaAffectedByFire: 'Superficie brûlée totale',
    ofWhichForest: '... dont forestière'
  },

  employment: {
    employment: 'Emploi'
  },

  graduationOfStudents: {
    graduationOfStudents: 'Diplômes d\'étudiants'
  },

  policiesAndLegislation: {
    policiesAndLegislation: 'Politiques et législation'
  },

  areaOfPermanentForestEstate: {
    areaOfPermanentForestEstate: 'Superficie forestière destinée à rester forêt permanente'
  }

}

