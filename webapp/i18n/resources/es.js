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
    forest: 'Bosque',
    otherWoodedLand: 'Otras tierras boscosas (OTB)',
    otherLand: 'Otras tierras'
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
    logout: 'Logout',
    autoSave: {
      saving: 'Saving...'
    }
  },

  review: {
    comments: 'Comentarios',
    noComments: 'No comments',
    resolve: 'Resolve',
    commentTime: {
      hour: '{{count}} hour ago',
      hour_plural: '{{count}} hours ago',
      day: '{{count}} day ago',
      day_plural: '{{count}} days ago',
      week: '{{count}} week ago',
      week_plural: '{{count}} weeks ago',
      aMomentAgo: 'A moment ago'
    },
    commentDeleted: 'Comment deleted',
    commentMarkedAsResolved: 'Marked as resolved',
    delete: 'Borrar',
    writeComment: 'Write a comment…',
    commentingClosed: 'Commenting closed',
    add: 'Add',
    cancel: 'Cancel'
  },

  description: {
    description: 'Descripción'
  },

  nationalDataPoint: {
    nationalDataPoint: 'Punto de los datos nacionales',
    addNationalDataPoint: 'Añadir un punto de los datos nacionales',
    noNationalDataAdded: 'Nigun dato nacional añadido',
    nationalData: 'Datos nacionales',
    year: 'Año',
    methods: 'Métodos',
    edit: 'Editar',
    copyPreviousValues: 'Copiar valores anteriores',
    nationalClass: 'Clase nacional',
    nationalClasses: 'Clases nacionales',
    definition: 'Definicion',
    fraClasses: 'Clases de FRA',
    class: 'Clase',
    area: 'Área',
    total: 'Total',
    delete: 'Borrar',
    cancel: 'Cancelar',
    saveData: 'Guardar los datos',
    enterOrCopyPasteNationalClasses: ' Entrar o copiar y pegar las clases nacionales'
  },

  // annually reported assessment components

  extentOfForest: {
    extentOfForest: 'Extensión de los bosques',
    generateFraValues: 'Generar valores de FRA',
    extentOfForestValues: 'Extensión de valores de los bosques',
    forestArea: 'Área de los bosques',
    dataSources: 'Fuente de datos',
    nationalClassificationAndDefinitions: 'Clasificación y definiciones nationales',
    originalData: 'Datos originales',
    chart: {
      noDataPlaceholderLine1: 'Para empezar, añada nuevos puntos de datos nacionales',
      noDataPlaceholderLine2: 'y utilícelos para generar automáticamente los valores de FRA.'
    }
  },

  growingStock: {
    growingStock: 'Existencias en formación'
  },

  biomassStock: {
    biomassStock: 'Existencias en biomasa'
  },

  carbonStock: {
    carbonStock: 'Existencias en carbono'
  },

  protectedAreas: {
    protectedAreasLongTermMgmtPlans: 'Zonas protegidas y planes de gestión a largo plazo'
  },

  // five year cycle assessment components

  forestAreaChange: {
    forestAreaLossGainChange: 'Pérdida, ganancia y variación neta de la superficie forestal',
    forestExpansion: 'Expansión del bosque (a)',
    ofWhichAfforestation: '... de las cuales forestación',
    ofWhichNaturalExpansion: '... de las cuales expansión natural',
    deforestation: 'Deforestación (b)',
    forestAreaNetChange: 'Variación neta de la superficie forestal'
  },

  forestCharacteristics: {
    forestCharacteristics: 'Características de los bosques'
  },

  specificForestCategories: {
    specificForestCategories: 'Categorías forestales específicas',
    bamboo: 'Bambú',
    mangroves: 'Manglares',
    rubberPlantations: 'Plantaciones de caucho'
  },

  growingStockComposition: {
    growingStockComposition: 'Composición de las existencias en formación'
  },

  nonWoodForestProducts: {
    nonWoodForestProducts: 'Productos forestales no madereros '
  },

  primaryDesignatedManagementObjective: {
    primaryDesignatedManagementObjective: 'Objetivo de ordenación principal designado',
    production: 'Production',
    soilWaterProtection: 'Protection of soil and water',
    biodiversityConservation: 'Conservation of biodiversity',
    socialServices: 'Social Services',
    multipleUse: 'Multiple use',
    other: 'Other',
    unknown: 'No/unknown',
    totalForestArea: 'Total forest area'
  },

  forestOwnershipManagementRights: {
    forestOwnershipManagementRights: 'Propiedad de los bosques y derechos de gestión'
  },

  disturbances: {
    disturbances: 'Perturbaciones'
  },

  areaAffectedByFire: {
    areaAffectedByFire: 'Área quemada',
    totalLandAreaAffectedByFire: 'Área total de tierra quemada',
    ofWhichForest: '... de la cual área de bosque quemado'
  },

  employment: {
    employment: 'Empleo'
  },

  graduationOfStudents: {
    graduationOfStudents: 'Graduación de estudiantes'
  },

  policiesAndLegislation: {
    policiesAndLegislation: 'Políticas y legislación'
  },

  areaOfPermanentForestEstate: {
    areaOfPermanentForestEstate: 'Área de zona forestal permanente'
  }

}
