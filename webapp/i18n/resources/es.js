export const translation = {

  language: {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    ru: 'Русский'
  },

  user: {
    roles: {
      reviewer: 'Revisor',
      nationalCorrespondent: 'Corresponsal Nacional',
      national_correspondent: 'Corresponsal Nacional',
      reviewer_all: 'Revisor',
      national_correspondent_all: 'Corresponsal Nacional',
      noRole: 'N/A'
    }
  },

  fraClass: {
    forest: 'Bosque',
    otherWoodedLand: 'Otras tierras boscosas (OTB)',
    otherLand: 'Otras tierras'
  },

  // components

  countryListing: {
    annuallyReported: 'Anuales',
    fiveYearCycle: 'Quinquenales'
  },

  navigation: {
    annuallyReported: 'Informes anuales',
    fiveYearCycle: 'Ciclos quinquenales',
    assessmentStatus: {
      changing: {
        label: 'Cambiando...'
      },
      review: {
        label: 'En revisión',
        next: 'Enviar en revisión',
        previous: 'Retroceder en revisión'
      },
      accepted: {
        label: 'Aceptado',
        next: 'Aceptar',
        previous: ''
      },
      editing: {
        label: '', //Currently we do not wish to show the default state at all
        previous: 'Rechazar'
      }
    }
  },

  footer: {
    logout: 'Desconectarse',
    autoSave: {
      saving: 'Guardando ...'
    }
  },

  time: {
    hour: 'Hace {{count}} hora',
    hour_plural: 'Hace {{count}} horas',
    day: 'Hace {{count}} día',
    day_plural: 'Hace {{count}} días',
    week: 'Hace {{count}} semana',
    week_plural: 'Hace {{count}} semanas',
    aMomentAgo: 'Hace unos momentos'
  },

  review: {
    comments: 'Comentarios',
    noComments: 'Nigun comentario',
    resolve: 'Resolver',
    commentDeleted: 'Comentario borrado',
    commentMarkedAsResolved: 'Marcado como resuelto',
    delete: 'Borrar',
    writeComment: 'Escriba un comentario …',
    commentingClosed: 'Comentarios cerrados',
    add: 'Añadir',
    cancel: 'Cancelar'
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
      placeholderLine1: 'Para empezar, añada nuevos puntos de datos nacionales',
      placeholderLine2: 'y utilícelos para generar automáticamente los valores de FRA.'
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
    mangroves: 'Manglares'
  },

  growingStockComposition: {
    growingStockComposition: 'Composición de las existencias en formación'
  },

  nonWoodForestProducts: {
    nonWoodForestProducts: 'Productos forestales no madereros '
  },

  primaryDesignatedManagementObjective: {
    primaryDesignatedManagementObjective: 'Objetivo de ordenación principal designado',
    production: 'Producción',
    soilWaterProtection: 'Protección de suelos y de recursos hídricos',
    biodiversityConservation: 'Conservación de la biodiversidad',
    socialServices: 'Servicios Sociales',
    multipleUse: 'Uso múltiple',
    other: 'Otro',
    unknown: 'Desconocido',
    totalForestArea: 'Área total de los bosques'
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
