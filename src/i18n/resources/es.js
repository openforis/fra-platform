const area = require('./es/area')
const assessmentSection = require('./es/assessmentSection')
const common = require('./es/common')
const dataDownload = require('./es/dataDownload')
const fra = require('./es/fra')
const statisticalFactsheets = require('./es/statisticalFactsheets')
const login = require('./es/login')
const uc = require('./es/uc')
const print = require('./es/print')
const contentCheck = require('./es/contentCheck')
const dataSource = require('./es/dataSource')
const editUser = require('./es/editUser')

module.exports.translation = {
  area,
  common,
  contentCheck,
  dataDownload,
  dataSource,
  fra,
  login,
  print,
  statisticalFactsheets,
  uc,

  page: {
    assessmentSection,
  },

  language: {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    ru: 'Русский',
    ar: 'العربية',
    zh: '中文',
  },

  home: {
    keyFindings: `El área total de bosques en el mundo es de 4 060 millones de hectáreas (ha),
que corresponde al 31 por ciento de la superficie total de la tierra. Esta área
es equivalente a 0,52 ha por persona
, aunque los bosques no están distribuidos
de manera equitativa por población mundial o situación geográfica. Las zonas
tropicales poseen la mayor proporción de los bosques del mundo (45 por ciento),
el resto está localizado en las regiones boreales, templadas y subtropicales.`,
  },

  footer: {
    contactUs: 'Contacto',
    termsAndConditions: 'Términos y condiciones',
    scamAlert: 'Alerta de estafa',
    reportMisconduct: 'Reportar mala conducta',
    userGuide: 'Guía del usuario',
    tutorials: 'Vídeo',
    sendFeedback: 'Enviar comentarios',
    licenses: 'Licencias',
    platformVersion: 'Versión de la plataforma',
  },

  disclaimer: {
    statisticalFactsheets:
      'Descargo de responsabilidad: puede contener estimaciones de la FAO, puede contener valores faltantes',
    part1: 'Este portal se ha realizado con la asistencia de la ',
    europeanUnion: 'Unión Europea',
    part2: ', el ',
    govFinland: 'Gobierno de Finlandia',
    part3: ', el ',
    govNorway: 'Gobierno de Noruega',
    part4: ' y el ',
    gef: 'Fondo para el Medio Ambiente Mundial',
    part5:
      '. Su contenido es responsabilidad exclusiva de la FAO y no puede considerarse que refleje en modo alguno las opiniones de la Unión Europea, el Gobierno de Finlandia, el Gobierno de Noruega y el Fondo para el Medio Ambiente Mundial.',
    termsOfUse: 'Condiciones de uso de la base de datos estadísticos',
  },

  unit: {
    haThousand: '1000 ha',
    ha: 'ha',
    kmSq: 'km²',
    mileSq: 'mi²',
    acre1000: '1000 acres',
    acre: 'acre',
    haMillion: 'millones de ha',
    haThousandPerYear: '1000 ha / an',
    tonnesPerHa: 'toneladas / ha',
    millionsCubicMeterOverBark: 'millones de m³ sobre corteza',
    billionCubicMeter: 'mil millones m³',
    gt: 'Gt',
    fte1000: '1000 EDC',
    numberOfStudents: '$t(graduationOfStudents.numberOfStudents)',
    growingStockPercent: '% del total de las Existencias Forestales en Formación',
  },

  countrySelection: {
    selectCountry: 'Seleccionar país',
  },

  definition: {
    definitionLabel: 'Véanse las definiciones',
    faqLabel: 'Preguntas frecuentes',
  },

  audit: {
    notStarted: 'No iniciado',
    edited: 'Editado',
  },

  yesNoTextSelect: {
    yes: 'Sí',
    no: 'No',
    notSelected: '',
  },

  user: {
    roles: {
      REVIEWER: 'Evaluador',
      NATIONAL_CORRESPONDENT: 'Corresponsal Nacional',
      ALTERNATE_NATIONAL_CORRESPONDENT: 'Corresponsal Nacional alterno',
      COLLABORATOR: 'Colaborador',
      ADMINISTRATOR: 'Administrador',
      noRole: '',

      VIEWER: 'Observador',
      reviewer_plural: 'Revisores',
      nationalCorrespondent_plural: 'Corresponsales nacionales',
      alternateNationalCorrespondent_plural: 'Corresponsales nacionales suplentes',
      collaborator_plural: 'Colaboradores',
    },
    resetPasswordEmail: {
      subject: 'Plataforma FRA - Restablecer contraseña',
    },
  },

  fraClass: {
    forest: 'Bosque',
    otherWoodedLand: 'Otras tierras boscosas',
    otherLand: 'Otras tierras',
  },

  fraForestCharacteristicsClass: {
    naturallyRegeneratingForest: 'Bosque regenerado de forma natural',
    plantationForest: 'Plantación forestal',
    ofWhichIntroduced: '…de la cual de especies introducidas',
    otherPlantedForest: 'Otros bosques plantados',
    totalForest: 'Área total de bosque',
  },

  fraOtherLandClass: {
    palms: '…de las cuales palmas (aceitera, cocotera, dátiles, etc)',
    treeOrchards: '…de las cuales huertos de árboles (frutas, frutos secos, aceitunas,etc.)',
    agroforestry: '…de las cuales agroforestería',
    treesUrbanSettings: '…de las cuales árboles en espacios urbanos',
  },

  landing: {
    home: 'Inicio',
    sections: {
      overview: 'Visión general',
      messageBoard: 'Tablero de mensajes',
      about: 'Acerca de FRA',
      recentActivity: 'Actividad reciente',
      userManagement: 'Gestionar colaboradores',
      externalData: 'Datos externos',
      links: 'Enlaces y Repositorio',
      contentCheck: 'Contenido / Comprobar',
      versioning: 'Versionando',
    },
    overview: {
      loadingMap: 'Cargando mapa…',
      withFinancialSupportOf: 'Con el apoyo financiero de',
    },
    milestones: {
      milestones: 'Logros',
      milestone1: 'Reunión mundial de Corresponsales Nacionales',
      milestone2: 'Talleres regionales y subregionales',
      milestone3: 'Plazo de presentación de los informes nacionales',
      milestone4: 'Validación de los informes nacionales finales',
      milestone5: 'Resultados preliminares de FRA 2020',
      milestone6: 'Informe principal de FRA 2020',
      milestone7: 'Análisis de datos y redacción de informes',
      milestone8: 'Lanzamiento de la plataforma de análisis y difusión',
      date1: 'Marzo',
      date2: 'Abril – Septiembre',
      date3: 'Octubre',
      date4: 'Enero – Febrero',
      date5: 'Marzo',
      date6: 'Julio',
      date7: 'Marzo – Diciembre',
      date8: 'Agosto',
    },
    users: {
      users: 'Contactos',
      message: 'Mensaje',
    },
    about: {
      contact: 'Contacto',
      seniorForestryOfficer: 'Oficial Forestal Superior',
      faoForestryDepartment: 'Departamento Forestal de la FAO',
      email: 'Correo electrónico',
      fraProcess:
        'La FAO ha estado monitoreando los bosques del mundo en intervalos de 5 a 10 años desde 1946. Las recientes Evaluaciones de los Recursos Forestales Mundiales (FRA) se llevan a cabo ahora cada 5 años, en un esfuerzo por proporcionar un enfoque conherente para describir los bosques del mundo y cómo estos están cambiando. La evaluación se basa en dos principales fuentes de datos: los informes nacionales desarrollados por Corresponsales Naciones y la teledetección, llevada a cabo por la FAO junto con los coordinadores nacionales y los asociados regionales. El alcance de FRA ha cambiado de forma regular desde que se publicó la primera evaluación en 1948. Dichas evaluaciones constituyen una interesante historia sobre los intereses forestales mundiales, tanto en lo que respecta a su contenido sustancial como a su alcance cambiante.',
      linkFraProcess: 'Más información sobre el proceso de FRA',
      or: 'O',
      selectArea: 'Seleccione un área a continuación para acceder a los datos de FRA',
    },
    recentActivity: {
      noRecentActivityTitle: 'Parece que no hay ninguna actividad reciente',
      noRecentActivityBody:
        'Los cambios realizados en la plataforma aparecerán aquí, para que se pueda poner al día sobre lo que ha estado ocurriendo mientras estaba ausente.',
      getStarted: 'Para empezar',
      actions: {
        added: 'ha añadido',
        addedFile: 'ha añadido {{file}}',
        commented: 'ha comentado',
        deleted: 'ha borrado',
        deletedFile: 'ha borrado {{file}}',
        edited: 'ha editado',
        resolved: 'ha resuelto el asunto',
        status: 'ha cambiado el estado a',
        addUser: 'ha añadido a {{user}} como {{role}}',
        updateUser: 'ha editado a {{user}}',
        removeUser: 'ha eliminado a {{user}}',
        acceptInvitation: 'ha sido incorporado/a como {{role}}',
        addInvitation: 'ha invitado a {{user}} como {{role}}',
        removeInvitation: 'ha eliminado la invitación de {{user}} como {{role}}',
        updateInvitation: 'ha actualizado la invitación de {{user}} como {{role}}',
        updateAssessmentStatus: 'ha cambiado el estado de {{assessment}} a {{status}}',
      },
      fraProcess:
        'La FAO ha estado monitoreando los bosques del mundo en intervalos de 5 a 10 años desde 1946. Las recientes Evaluaciones de los Recursos Forestales Mundiales (FRA) se llevan a cabo cada 5 años, en un esfuerzo por proporcionar un enfoque conherente para describir los bosques del mundo y cómo estos están cambiando. La evaluación se basa en dos principales fuentes de datos: los informes nacionales desarrollados por Corresponsales Naciones y la teledetección, llevada a cabo por la FAO junto con los coordinadores nacionales y los asociados regionales. El alcance de FRA ha cambiado de forma regular desde que se publicó la primera evaluación en 1948. Dichas evaluaciones constituyen una interesante historia sobre los intereses forestales mundiales, tanto en lo que respecta a su contenido sustancial como a su alcance cambiante.',
      linkFraProcess: 'Más información sobre el proceso de FRA',
    },
    links: {
      links: 'Enlaces',
      unfcccFocalPoints: 'Puntos de contacto de la CMNUCC',
      sdgFocalPoints: 'Puntos de contacto nacionales para los ODS',
      reddPortal: 'Sistemas satelitales de monitoreo terrestre habilitados por el Programa ONU-REDD y la FAO',
      fraGeoSpatialTools: 'Herramientas geoespaciales del FRA',
      repository: 'Repositorio',
      uploadFile: 'Cargar un archivo',
      confirmDelete: '¿Borrar {{file}}? Esta acción no puede deshacerse.',
      fileUploaded: 'Archivo cargado correctamente',
      fileDeleted: 'Archivo eliminado correctamente',
    },
    dataExport: {
      downloadData: 'Descargar datos',
    },
  },

  userChat: {
    chatHeader: 'Mensajes con {{user}}',
    noMessages: 'Ningún mensaje',
    writeMessage: 'Escriba un mensaje…',
    send: 'Enviar',
    cancel: 'Cancelar',
    notificationEmail: {
      subject: '{{sender}} le envió un mensaje',
      textMessage: `Estimado/a {{recipient}},


{{sender}} le envió un mensaje.


Acceda a la plataforma en la siguiente dirección URL para verlo y responder:
{{- link}}


El equipo de FRA
{{- url}}
   `,
      htmlMessage: `Estimado/a {{recipient}},
<br/><br/>
{{sender}} le envió un mensaje.
<br/><br/>
<b><a href="{{- link}}">Acceda a la plataforma para verlo y responder.</a></b>
<br/><br/>
El equipo de FRA
<br/>
{{- url}}
   `,
    },
  },

  // error messages
  error: {
    access: {
      countryRoleNotSpecified:
        'Error: El usuario {{user}} intentó acceder {{countryIso}} pero no se había especificado ninguna función',
      countryUserNotReviewer: 'Error: El usuario {{user}} intentó acceder {{countryIso}}, del cual no es evaluador',
      roleChangeNotAllowed:
        'Error: El usuario {{user}} intentó asignar otra función de usuario a {{role}}, lo que está prohibido para el usuario conectado',
      invitationAlreadyUsed:
        'Error: La invitación {{invitationUuid}} ya se ha utilizado, ¡el robo del {{loginEmail}} está prohibido!',
      countryDoesNotMatch: 'Error: El país {{countyryIso}} no coincide',
      assessmentEditingNotAllowed:
        'Error: El usuario {{user}} en función {{role}} no puede editar la evaluación en el estado {{assessmentStatus}} por país {{countryIso}}',
      assessmentCommentingNotAllowed:
        'Error: El usuario {{user}} en función {{role}} no puede comentar la evaluación en el estado {{assessmentStatus}} por país {{countryIso}}',
      userNotAdministrator:
        'Error: El usuario {{user}} ha intentado acceder a un recurso disponible sólo para administradores',
      userAlreadyAddedToCountry: 'Error: El usuario {{user}} ya está añadido al país {{country Iso}}',
    },
    assessment: {
      transitionNotAllowed:
        'Error: El paso de {{currentStatus}} a {{status}} está prohibido en el caso de la función {{role}}',
      deskStudyNotAllowed: 'Error: El administrador es el único que puede cambiar el estado del estudio técnico',
    },
    review: {
      commentDeleteNotOwner: 'Error: El usuario {{user}} intentó borrar un comentario que no es suyo',
      commentEnterResolvedIssue:
        'Error: El usuario {{user}} intentó introducir un comentario a un asunto que ya se había resuelto',
    },
    ndp: {
      previousNdpNotFound: 'No es posible encontrar ningún punto de información nacional anterior a {{year}}',
    },
  },
  // components

  countryListing: {
    annuallyUpdated: 'Actualizado anualmente',
    fra2020: 'FRA 2020',
  },

  navigation: {
    hideAll: 'Esconder todo',
    showAll: 'Mostrar todo',
    support: {
      dontDelete: 'No elimine la información del sistema',
      feedbackEmailSubject: 'Comentarios de la plataforma de FRA',
      platformVersion: 'Versión de la plataforma',
      userAgent: 'Agente de usuario',
      user: 'Usuario',
      manageCollaborators: 'Gestionar colaboradores',
    },
    sectionHeaders: {
      introduction: 'Introducción',
      forestExtentCharacteristicsAndChanges: 'Extensión de bosque, características y cambios',
      forestGrowingStockBiomassAndCarbon: 'Existencias en formación, biomasa y carbono',
      forestDesignationAndManagement: 'Designación y gestión del bosque',
      forestOwnershipAndManagementRights: 'Propiedad del bosque y derechos de gestión',
      forestDisturbances: 'Perturbaciones en el bosque',
      forestPolicyAndLegislation: 'Política y legislación forestal',
      employmentEducationAndNwfp: 'Empleo, educación y PFNM',
      sustainableDevelopment: 'Objetivo de Desarrollo Sostenible 15',
      panEuropeanIndicators: 'Indicadores paneuropeos',
    },
    submit: 'Enviar',
    cancel: 'Cancelar',
    changeStatusTextPlaceholder: 'Añadir un mensaje opcional',
    doNotNotifyUsers: 'No notificar a los usuarios',
  },

  header: {
    editProfile: 'Editar perfil',
    logout: 'Desconectar',
    hideSidebar: 'Esconder la barra lateral',
    showSidebar: 'Mostrar la barra lateral',
    autoSave: {
      saving: 'Guardando…',
      complete: 'Todos los cambios han sido guardados',
      lastSaveTimestampReceived: 'Editado por última vez',
    },
  },

  time: {
    hour: '{{count}} hace una hora',
    day: '{{count}} hace un día',
    week: '{{count}} hace una semana',
    aMomentAgo: 'hace un momento',
    hour_plural: 'Hace {{count}} horas',
    day_plural: 'Hace {{count}} días ',
    week_plural: 'Have {{count}} semanas',
  },

  review: {
    comments: 'Comentarios',
    noComments: 'Sin comentarios',
    resolve: 'Resolver',
    confirmDelete: '¿Borrar este comentario? Esta acción no puede deshacerse.',
    commentDeleted: 'Comentario borrado',
    commentMarkedAsResolved: 'Señalado como resuelto',
    delete: 'Borrar',
    writeComment: 'Escriba un comentario…',
    commentingClosed: 'Se han desactivado los comentarios',
    add: 'Añadir',
    cancel: 'Cancelar',
    loading: 'Cargando',
  },

  description: {
    edit: 'Editar',
    done: 'Finalizado',
    loading: 'Cargando contenido…',
    description: 'Descripción',
    dataSourcesTitle: 'Fuentes de datos, datos originales y clasificación nacional y definiciones',
    generalCommentsTitle: 'Comentarios',
    dataSources: 'Fuentes de datos',
    dataSourcesPlus: 'Fuentes de datos + tipo de fuente de datos, por ej. el inventario nacional de los bosques, etc',
    originalData: 'Datos originales',
    nationalClassificationAndDefinitions: 'Clasificación nacional y definiciones',
    nationalData: 'Datos nacionales',
    analysisAndProcessing: 'Análisis y procesamiento de datos nacionales',
    estimationAndForecasting: 'Estimación y proyección',
    reclassification: 'Reclasificación en categorías de FRA {{cycleName}}',
  },

  nationalDataPoint: {
    clickOnNDP: 'Haga clic en el año para acceder a los datos originales',
    nationalDataPoint: 'Punto de datos nacionales',
    addNationalDataPoint: 'Añadir un punto de datos nacionales',
    noNationalDataAdded: 'No se ha añadido ningún punto de datos nacionales',
    nationalData: 'Datos nacionales',
    reclassificationLabel: 'Datos originales y reclasificación',
    forestCategoriesLabel: 'El bosque, otras tierras boscosas y otras tierras',
    referenceYearData: 'Año de referencia para los datos',
    referenceYear: 'Año de referencia',
    references: 'Referencias',
    selectYear: 'Seleccionar…',
    methods: 'Métodos',
    methodsUsed: 'Métodos usados',
    dataSource: 'Fuente de datos',
    dataSources: 'Fuentes de datos',
    additionalComments: 'Comentarios adicionales',
    edit: 'Editar',
    copyPreviousValues: 'Copiar las referencias anteriores',
    nationalClass: 'Clase nacional',
    nationalClasses: 'Clasificaciones y definiciones',
    definition: 'Definición',
    class: 'Clase',
    fraClasses: 'Clases de FRA',
    area: 'Área (1000 ha)',
    total: 'Total',
    delete: 'Borrar',
    modifiedExplanation: 'Punto de datos nacionales con modificaciones',
    confirmDelete: '¿Borrar este punto de datos? Esta acción no puede deshacerse.',
    discardChanges: 'Cancelar cambios',
    doneEditing: 'Edición finalizada',
    enterOrCopyPasteNationalClasses: 'Introducir o copiar y pegar las clases nacionales',
    forestCharacteristics: 'Características de los bosques',
    otherLandCharacteristics: 'Otras tierras con cubierta de árboles',
    plantationForest: 'Plantación forestal',
    remindDirtyOdp: 'El punto de datos nacionales ha sido actualizado, recuerde restablecer los valores',
    disabled: 'Desactivado, activar en el apartado 1b',
    dataSourceMethodsOptions: {
      nationalForestInventory: 'Inventario nacional de los bosques',
      sampleBasedRemoteSensingAssessment: 'Evaluación de teledetección por muestreo',
      fullCoverMaps: 'Bosque de cubierta total/mapas de vegetación',
      registersQuestionnaires: 'Registros/cuestionarios',
      other: 'Otros (especificar en comentarios)',
    },
    appliesToVariablesOptions: {
      forest: 'Bosque',
      otherWoodedLand: 'Otras tierras boscosas',
      otherLand: 'Otras tierras',
    },
    forestCategoriesLabel2025: 'Bosque, Otras Tierras Boscosas y Superfície Terrestre Restante',
    nationalClassifications: 'Clasificaciones nacionales',
    categories: 'Categorías',
  },

  userManagement: {
    manageCollaborators: 'Gestionar colaboradores',
    name: 'Nombre',
    role: 'Función',
    email: 'Correo electrónico',
    loginEmail: 'Nombre de usuario',
    noUsers: 'No se han añadido colaboradores',
    placeholder: 'Elegir…',
    remove: 'Eliminar',
    done: 'Finalizado',
    edit: 'Editar',
    addUser: 'Añadir colaborador',
    formErrors: 'Hay errores en el formulario. Por favor, corrígelos y envíalo de nuevo.',
    insufficientPrivileges: 'Privilegios insuficientes',
    confirmDelete: '¿Eliminar {{user}}?',
    allUsers: 'Todos los colaboradores',
    info: 'Información',
    tableAccess: 'Acceso a las mesas',
    invitationLink: 'Enlace de invitación',
    sendInvitation: 'Enviar correo electrónico de invitación',
    invitationEmail: {
      subject: 'Invitación a la plataforma de FRA',
      textMessage: `Estimado/a {{invitedUser}},


Ha sido invitado/a a acceder {{assessmentName}} {{cycleName}} como {{role}} para {{country}}.


Acepte esta invitación y acceda a la plataforma en la siguiente dirección URL:
{{- link}}


¡Que disfrute del trabajo!


El equipo de FRA
{{- url}}
   `,
      htmlMessage: `Estimado/a {{invitedUser}},
<br/><br/>
Ha sido invitado/a a acceder {{assessmentName}} {{cycleName}} como {{role}} para {{country}}.
<br/><br/>
<b><a href="{{- link}}">Acepte esta invitación y acceda a la plataforma</a></b>
<br/><br/>
¡Que disfrute del trabajo!
<br/><br/>
El equipo de FRA
<br/>
{{- url}}
   `,
    },
    editPermissions: 'Editar permisos',
    invitationDeleted: 'La invitación ha sido eliminada',
    invitationEmailSent: 'Se le ha enviado un correo electrónico de invitación',
    permissions: 'Permisos',
    personalInfoRequired: 'Por favor complete sus datos personales antes de continuar',
    userAdded: 'El email {{email}} ha sido añadido',
    userModified: 'El usuario {{usuario}} ha sido modificado',
    permissionNames: {
      tableData: 'Datos de la tabla',
      descriptions: 'Descripciones',
    },
  },

  // FRA 2020 questionare
  // Object name and title should have always the same name

  contactPersons: {
    reportPreparationAndContactPersons: 'Elaboración de informes y personas de contacto',
    contactPersons: 'Introducción',
    contactPersonsSupport: 'El presente informe fue preparado por la/s siguiente/s persona/s',
    introductoryText: 'Texto introductorio',
    introductoryTextSupport: 'Incluir un texto introductorio en el contenido del presente informe',
    firstName: 'Nombre',
    lastName: 'Apellido',
    institution: 'Institución/dirección',
    email: 'Correo electrónico',
    tables: 'Tablas',
    all: 'Todas',
    none: 'Ninguna',
  },

  extentOfForest: {
    extentOfForest: 'Extensión de bosque y otras tierras boscosas',
    estimationAndForecasting: 'Estimación and proyección',
    categoryHeader: 'Categorías de FRA',
    forestArea: 'Bosque',
    chart: {
      placeholderLine1: 'Para empezar, añada nuevos puntos de datos nacionales y úselos',
      placeholderLine2: 'para generar los valores de FRA de forma automática.',
    },
    otherLandCategories: 'Otras categorías de tierras',
    ofWhichPalms: '…de las cuales palmas (aceitera, cocotera, dátiles, etc.)',
    ofWhichTreeOrchards: '…de las cuales huertos de árboles (frutas, frutos secos, aceitunas, etc.)',
    ofWhichAgroforestry: '…de las cuales agroforestería',
    ofWhichTreesUrbanSettings: '…de las cuales árboles en espacios urbanos',
    totalLandArea: 'Superficie total de tierra',
    fedAreasExceedTotalLandArea: 'El área de bosque y otras tierras boscosas exceden la superficie total de tierra',
    forestAreaDoesNotMatchPreviouslyReported: 'El área de bosque no coincide con el área de FRA {{year}}: {{previous}}',
    useOriginalDataPoints: 'Usar puntos de datos nacionales',
    dontUseOriginalDataPoints: 'No usar puntos de datos nacionales',
    whatIsThis: '¿Qué significa esto?',
    tableNoticeMessage:
      'La superficie de tierra registrada según FAOSTAT para el año 2015 se usa para todos los años de referencia',
    ndpMissingValues: 'El punto de dato nacional tiene valores faltantes',
    showNDPs: 'Mostrar puntos de datos nacionales',
    hideNDPs: 'Esconder puntos de datos nacionales',
    forestAreaNetChangeDoesNotMatch:
      'El cambio neto de la superficie forestal no coincide con el valor esperado: {{value}}',
  },

  climaticDomain: {
    climaticDomain: 'Región climática',
    percentOfForestArea2015: 'Porcentaje de área de bosque en 2015',
    percentOfForestArea2015Override: 'Reemplazar valor',
    selectDefault: 'Por defecto',
    boreal: 'Boreal',
    temperate: 'Templada',
    subtropical: 'Subtropical',
    tropical: 'Tropical',
  },

  forestCharacteristics: {
    forestCharacteristics: 'Características de los bosques',
    estimationAndForecasting: 'Estimación y proyección',
    categoryHeader: 'Categorías de FRA',
    naturalForestArea: 'Bosque regenerado de forma natural',
    plantationForestArea: 'Plantación forestal',
    plantationForestIntroducedArea: '…de la cual de especies introducidas',
    otherPlantedForestArea: 'Otros bosques plantado',
    plantedForest: 'Bosque plantado',
    totalForestArea: 'Área total de bosque',
    total: 'Total',
    useOriginalDataPoints: 'Usar puntos de datos nacionales',
    dontUseOriginalDataPoints: 'No usar puntos de datos nacionales',
  },

  tableWithOdp: {
    confirmGenerateFraValues: '¿Reemplazar los valores existentes?',
    generateFraValues: 'Generar valores',
    linearExtrapolation: 'Lineal',
    repeatLastExtrapolation: 'Repetir el último',
    annualChangeExtrapolation: 'Cambio anual',
    placeholderFuture: 'Futuro',
    placeholderPast: 'Pasado',
    copyToClipboard: 'Copiar valores',
    placeholderSelect: 'Estimación y proyección',
    _1000haYear: '1000 ha/año',
    generatingFraValues: 'Generando...',
  },

  forestAreaChange: {
    forestAreaChange: 'Expansión, deforestación anual y cambio neto anual',
    categoryHeader: 'Categorías de FRA',
    areaUnitLabel: 'Área (1000 ha/año)',
    forestExpansion: 'Expansión del bosque',
    ofWhichAfforestation: '…de la cual es forestación',
    ofWhichNaturalExpansion: '…de la cual es expansión natural',
    deforestation: 'Deforestación',
    forestAreaNetChange: 'Cambio neto en el área de bosque',
    netChangeDoesNotMatch: 'No coincide con el cambio neto en el área de bosque',
    forestAreaNetChangeFrom1a: 'Cambio neto en el área de bosque de la tabla 1a',
  },

  annualReforestation: {
    annualReforestation: 'Reforestación anual',
    categoryHeader: 'Categorías de FRA',
    areaUnitLabel: 'Área (1000 ha/año)',
    reforestation: 'Reforestación',
  },

  specificForestCategories: {
    specificForestCategories: 'Bosque primario y categorías especiales de los bosques',
    categoryHeader: 'Categorías de FRA',
    areaUnitLabel: 'Área (1000 ha)',
    bamboo: 'Bambúes',
    mangroves: 'Manglares',
    temporarilyUnstocked: 'Bosque temporalmente sin cubierta de árboles y/o recientemente regenerado',
    primaryForest: 'Bosque primario',
    exceedsNaturallyRegeneratingForest: 'Excede el bosque regenerado de forma natural (1b)',
    rubberWood: 'Caucho',
  },

  otherLandWithTreeCover: {
    otherLandWithTreeCover: 'Otras tierras con cubierta de árboles',
    areaUnitLabel: 'Área (1000 ha)',
    categoryHeader: 'Categorías de FRA',
    palms: 'Palmas',
    treeorchards: 'Huertos de árboles',
    agroforestry: 'Agroforestería',
    treesinurbansettings: 'Árboles en espacios urbanos',
    total: 'Total',
    otherLandArea: 'Área de otras tierras',
    other: 'Otros (especificar en comentarios)',
  },

  growingStock: {
    growingStock: 'Existencias en formación',
    supportText: 'Asegúrese de que ha introducido los datos en las tablas 1a y 1b antes de editar esta tabla',
    categoryHeader: 'Categorías de FRA',
    avgTableHeader: 'Existencias en formación en m³/ha (sobre la corteza)',
    totalTableHeader: 'Existencias totales en formación (millones de m³ sobre la corteza)',
    naturallyRegeneratingForest: 'Bosque regenerado de forma natural',
    plantedForest: 'Bosque plantado',
    plantationForest: '…del cual es plantación forestal',
    otherPlantedForest: '…del cual son otros bosques plantados',
    forest: 'Bosque',
    otherWoodedLand: 'Otras tierras boscosas',
    copyToClipboard: 'Copiar valores',
  },

  growingStockComposition: {
    native: 'Nativa',
    introduced: 'Introducida',
    growingStockComposition: 'Composición de las existencias en formación',
    categoryHeader: 'Categorías de FRA',
    nativeTreeSpecies: 'Especies de árboles nativos',
    introducedTreeSpecies: 'Especies introducidas',
    areaUnitLabel: 'Existencias en formación en el bosque (millones de m³ sobre la corteza)',
    scientificName: 'Nombre científico',
    commonName: 'Nombre común',
    rank: '#{{idx}} Clasificadas en cuanto al volumen',
    remainingNative: 'Especies de árboles nativos restantes',
    remainingIntroduced: 'Especies introducidas restantes',
    totalNative: 'Volumen total de especies de árboles nativos ',
    totalIntroduced: 'Volumen total de especies introducidas',
    totalGrowingStock: 'Existencias totales en formación',
    rankingYear: 'Clasificación en el año 2015',
  },

  biomassStock: {
    biomassStock: 'Biomasa',
    categoryHeader: 'Categorías de FRA',
    tableHeader: 'Biomasa forestal (toneladas/ha)',
    aboveGround: 'Biomasa por encima del suelo',
    belowGround: 'Biomasa por debajo del suelo',
    deadWood: 'Madera muerta',
    downloadExcel: 'Descargar calculadora de excel',
  },

  carbonStock: {
    carbonStock: 'Carbono',
    categoryHeader: 'Categorías de FRA',
    tableHeader: 'Carbono forestal (toneladas/ha)',
    carbonAboveGroundBiomass: 'Carbono en la biomasa por encima del suelo',
    carbonBelowGroundBiomass: 'Carbono en la biomasa por debajo del suelo',
    carbonDeadwood: 'Carbono en la madera muerta',
    carbonLitter: 'Carbono en la hojarasca',
    carbonSoil: 'Carbono en el suelo',
    soilDepthHeading: 'Profundidad del suelo (cm) utilizada para calcular el carbono en el suelo',
  },

  designatedManagementObjective: {
    designatedManagementObjective: 'Objetivo de gestión designado',
    primaryDesignatedManagementObjective: 'Objetivo primario de gestión designado',
    primaryDesignatedManagementObjectiveSupport:
      'El objetivo primario de gestión designado es significativamente más importante que otros objetivos de gestión. Los diferentes objetivos primarios de gestión son *exclusivos* y las áreas reportadas bajo un objetivo primario de gestión no deben ser reportadas para ningún otro objetivo primario de gestión. La suma de los diferentes objetivos de gestión se debe añadir al área de bosque.',
    totalAreaWithDesignatedManagementObjective: 'Área total con objetivo de gestión designado',
    totalAreaWithDesignatedManagementObjectiveSupport:
      'Objetivo de gestión designado, independientemente de si es primario o no. Las diferentes categorías de designación *no son exclusivas*. Por lo tanto, las áreas se pueden reportar más de una vez. Por ejemplo, el área de bosque reportado como objetivo primario de gestión "de uso múltiple" debe ser reportado para cada objetivo de gestión específico. De este modo, la suma de los diferentes objetivos de gestión puede ser superior al área total de bosque.',
    categoryHeader: 'Categorías de FRA 2020',
    areaUnitLabel: 'Área forestal (1000 ha)',
    production: 'Producción',
    soilWaterProtection: 'Protección del suelo y del agua',
    biodiversityConservation: 'Conservación de la biodiversidad',
    socialServices: 'Servicios sociales',
    multipleUse: 'Uso múltiple',
    other: 'Otros (especificar en comentarios)',
    unknown: 'Ninguno/desconocido',
    totalForestArea: 'Área total de bosque',
    total: 'Total',
  },

  forestAreaWithinProtectedAreas: {
    forestAreaWithinProtectedAreas:
      'Área de bosque dentro de áreas protegidas legalmente establecidas y área de bosque con planes de gestión a largo plazo',
    categoryHeader: 'Categorías de FRA',
    areaUnitLabel: 'Área (1000 ha)',
    header: 'Área de bosque dentro de áreas protegidas legalmente establecidas',
    forestAreaWithLongTermManagementPlan: 'Área de bosque con planes de gestión a largo plazo',
    ofWhichInProtectedAreas: '…de la cual en áreas protegidas',
  },

  forestOwnership: {
    forestOwnership: 'Propiedad del bosque',
    categoryHeader: 'Categorías de FRA',
    areaUnitLabel: 'Área de bosque (1000 ha)',
    privateOwnership: 'Propiedad privada',
    ofWhichIndividuals: '…de la cual es propiedad de individuos',
    ofWhichPrivateBusinesses: '…de la cual es propiedad de entidades comerciales e instituciones privadas',
    ofWhichCommunities: '…de la cual es propiedad de comunidades locales, tribales e indígenas',
    publicOwnership: 'Propiedad pública',
    otherOrUnknown: 'Desconocidas/otras (especificar en comentarios)',
    totalForestArea: 'Área total de bosque',
    total: 'Total',
  },

  holderOfManagementRights: {
    holderOfManagementRights: 'Titular de los derechos de gestión de bosques públicos',
    categoryHeader: 'Categorías de FRA',
    areaUnitLabel: 'Área de bosque (1000 ha)',
    publicAdministration: 'La Administración Pública',
    individuals: 'Individuos',
    privateBusinesses: 'Entidades comerciales e instituciones privadas',
    communities: 'Comunidades locales, tribales e indígenas',
    other: 'Desconocidas/otras (especificar en comentarios)',
    totalPublicOwnership: 'Propiedad pública total',
    total: 'Total',
    publicOwnershipDoesNotMatch: 'No coincide con la propiedad pública total',
  },

  disturbances: {
    disturbances: 'Perturbaciones',
    categoryHeader: 'Categorías de FRA',
    areaUnitLabel: 'Área (1000 ha)',
    insects: 'Insectos',
    diseases: 'Enfermedades',
    severeWeatherEvents: 'Eventos climáticos extremos',
    other: 'Otras (especificar en comentarios)',
    totalForestArea: 'Área total de bosque',
    total: 'Total',
  },

  areaAffectedByFire: {
    areaAffectedByFire: 'Área afectada por incendios',
    categoryHeader: 'Categorías de FRA',
    areaUnitLabel: 'Área (1000 ha)',
    totalLandAreaAffectedByFire: 'Área total afectada por incendios',
    ofWhichForest: '…de la cual en bosque',
  },

  degradedForest: {
    degradedForest: 'Bosque degradado',
    doesYourCountryMonitor: '¿Su país hace un seguimiento del área de bosque degradado?',
    ifYes: 'En caso afirmativo',
    whatIsDefinition: '¿Cuál es la definición nacional de "bosque degradado"?',
    howMonitored: 'Describa el proceso de seguimiento y los resultados',
  },

  forestPolicy: {
    forestPolicy:
      'Políticas, legislación y plataforma nacional para la participación de los grupos de interés en la política forestal',
    categoryHeader: 'Indicar la existencia de',
    areaUnitLabel: 'Booleana (Sí/No)',
    national: 'Nacional',
    subnational: 'Subnacional',
    policiesSFM: 'Políticas que apoyan la gestión forestal sostenible',
    legislationsSFM: 'Leyes y/o reglamentos que apoyan la gestión forestal sostenible',
    stakeholderParticipation:
      'Platforma que fomenta o permite la participación de grupos de interés en la elaboración de políticas forestales',
    existenceOfTraceabilitySystem: 'Sistema/s de trazabilidad para los productos madereros',
  },

  areaOfPermanentForestEstate: {
    areaOfPermanentForestEstate: 'Área de zona forestal permanente',
    categoryHeader: 'Categorías de FRA 2020',
    areaUnitLabel: 'Área de bosque (1000 ha)',
    applicable: '¿Es aplicable?',
  },

  employment: {
    employment: 'Empleo en silvicultura y extracción de madera',
    average: 'en un promedio de 3 años',
    categoryHeader: 'Categorías de FRA 2020',
    unitHeader: 'Empleo equivalente dedicación completa (1000 EDC)',
    inForestry: 'Empleo en silvicultura y extracción de madera',
    ofWhichSilviculture: '…del cual en la silvicultura y otras actividades forestales',
    ofWhichLogging: '…del cual en la extracción de madera',
    ofWhichGathering: '…del cual en la recolección de productos forestales no maderables',
    ofWhichSupport: '…del cual en los servicios de apoyo a la silvicultura',
    total: 'Total',
    female: 'Mujeres',
    male: 'Hombres',
  },

  graduationOfStudents: {
    graduationOfStudents: 'Graduación de alumnos en estudios relativos al bosque',
    average: 'en un promedio de 3 años',
    numberOfStudents: 'Número de graduados',
    fra2020Categories: 'Categorías de FRA 2020',
    doctoralDegree: 'Doctorado',
    mastersDegree: 'Maestría',
    bachelorsDegree: 'Título de grado',
    technicianCertificate: 'Certificado/diploma de técnico',
    total: 'Total',
    female: 'Mujeres',
    male: 'Hombres',
  },

  nonWoodForestProductsRemovals: {
    nonWoodForestProductsRemovals: 'Extracción y valor de los productos forestales no maderables en 2015',
    nameOfProduct: 'Nombre del PFNM',
    keySpecies: 'Especies principales',
    quantity: 'Cantidad',
    unit: 'Unidad',
    value: 'Valor (1000 en moneda local)',
    category: 'Categoría de PFNM',
    plantProductsSelectHeading: 'Productos vegetales / materia prima',
    food: '1 Alimentos',
    fodder: '2 Forraje',
    rawMaterialForMedicine: '3 Materia prima para la preparación de medicamentos y productos aromáticos',
    rawMaterialForColorants: '4 Materia prima para la preparación de colorantes y tintes',
    rawMaterialForUtensils: '5 Materia prima para la fabricación de utensilios, artesanías y para la construcción',
    ornamentalPlants: '6 Plantas ornamentales',
    exudates: '7 Exudados',
    otherPlantProducts: '8 Otros productos vegetales',
    animalProductsSelectHeading: 'Productos animales / materia prima',
    livingAnimals: '9 Animales vivos',
    hidesSkins: '10 Cueros, pieles y trofeos',
    wildHoney: '11 Miel silvestre y cera de abeja',
    wildMeat: '12 Carne silvestre',
    animalRawMaterialForMedicine: '13 Materia prima para la preparación de medicamentos',
    animalRawMaterialForColorants: '14 Materia prima para la preparación de colorantes',
    otherEdibleAnimalProducts: '15 Otros productos animales comestibles',
    otherNonEdibleAnimalProducts: '16 Otros productos animales no comestibles',
    allOtherPlantProducts: 'Todos los demás productos vegetales',
    allOtherAnimalProducts: 'Todos los demás productos animales',
    total: 'Total',
    currency: 'Nombre de la moneda local',
    notSelected: '',
  },

  sustainableDevelopment: {
    sustainableDevelopment: 'Objetivo de Desarrollo Sostenible 15',
    indicator: 'Indicador',
    percent: 'Porcentaje',
    nameOfAgencyResponsible: 'Nombre del organismo responsable',
    sdgIndicator1: 'Indicador 15.1.1 de los ODS: Superficie forestal como proporción de la superficie total en 2015',
    sdgIndicator2: 'Indicador 15.2.1 de los ODS: Progresos en la gestión forestal sostenible',
    forestAreaProportionLandArea2015: 'Superficie forestal como proporción de la superficie total en 2015',
    subIndicator: 'Subindicador {{no}}',
    forestAreaAnnualNetChangeRate: 'Porcentaje anual de cambio neto en el área de bosque',
    aboveGroundBiomassStockForests: 'Biomasa aérea en los bosques',
    percent2015ForestAreaBaseline: 'Porcentaje (referencia del área de bosque en 2015)',
    proportionForestAreaLegallyEstablishedProtectedAreas:
      'Proporción de área de bosque dentro de áreas protegidas legalmente establecidas',
    proportionForestAreaLongTermForestManagement: 'Proporción de área de bosque con planes de gestión a largo plazo',
    forestArea1000Ha: 'Área de bosque (1000 ha)',
    forestAreaVerifiedForestManagement:
      'Área de bosque bajo sistemas de certificación de manejo forestal verificados de forma independiente',
  },

  panEuropeanIndicators: {
    panEuropeanIndicators: 'Indicadores cuantitativos paneuropeos para la gestión forestal sostenible',
    uploadQuestionnaire: 'Cargar cuestionario',
    chooseFile: 'Elegir archivo',
    downloadQuestionnaire: 'Descargar el cuestionario',
    download: 'Descargar',
    remove: 'Eliminar',
    noQuestionnaire: 'Ningún cuestionario seleccionado',
    panEuropeanQualitativeIndicators: 'Indicadores cualitativos paneuropeos para la gestión forestal sostenible',
    accessReportingPage: 'Acceder a la página de informes',
  },

  assessment: {
    fra: 'FRA',
    deskStudy: 'Estudio técnico',
    statusChangeNotification: {
      subject: 'El estado de {{country}} cambió a {{status}} en la plataforma de FRA',
      textMessage: `Estimado/a {{recipientName}},


{{changer}} ha cambiado el estado de {{assessment}} a "{{status}}" para {{country}} en la plataforma de FRA.


{{message}}


Visite la plataforma en la siguiente dirección: {{- serverUrl}}


El equipo de FRA
{{- serverUrl}}`,
      htmlMessage: `Estimado/a {{recipientName}},
<br/><br/>
{{changer}} ha cambiado el estado de {{assessment}} a "{{status}}" para {{country}} en la plataforma de FRA.
<br/><br/>
{{message}}
<br/><br/>
<a href="{{- serverUrl}}"><b>Visite la plataforma</b></a>
<br/><br/>
El equipo de FRA
<br/>
{{- serverUrl}}`,
    },
    status: {
      changing: {
        label: 'Cambiando…',
      },
      editing: {
        label: 'Editando',
        previous: 'Volver a editar',
      },
      review: {
        label: 'En revisión',
        next: 'Enviar a revisión',
        previous: 'Volver a revisar',
      },
      approval: {
        label: 'Esperando aprobación',
        next: 'Enviar para aprobación',
        previous: 'Volver a aprobación',
      },
      accepted: {
        label: 'Aceptado',
        next: 'Aceptar',
        previous: '',
      },
      notStarted: {
        label: 'No iniciado',
      },
    },
  },

  multiSelect: {
    placeholder: 'Elegir…',
  },

  generalValidation: {
    subCategoryExceedsParent: 'La subcategoría es superior a la categoría',
    forestAreaDoesNotMatchExtentOfForest: 'No coincide con el área de bosque (1a)',
    forestAreaExceedsExtentOfForest: 'Superior al área de bosque (1a)',
    otherLandExceedsExtentOfForest: 'Superior al área de otras tierras (1a)',
    valueMustBePositive: 'El valor debe ser superior a cero',
    emptyField: 'Este campo está vacío',
    mustBeEqualToTotalGrowingStock: 'El valor debe ser igual al valor total de Existencias Forestales en Formación(2a)',
    remainingLandExceedsExtentOfForest: 'Excede la Superficie Terrestre Restante (1a)',
    valueMustBeYear: 'El valor debe ser un año válido',
    countryReportYearGreaterThanCurrentYear: 'El valor debe ser mayor o igual que {{valor mínimo}}',
    valueNotGreaterThan: 'El valor no debe ser mayor que {{Valor máximo}}',
    sumNotGreaterThan: 'La suma no debe superar el valor {{Valor máximo}}',
    valuesAreInconsistentWithNetChange: 'Los valores no concuerdan con el cambio neto del área de bosque',
    valuesAreInconsistent1aOr1b: 'Los valores no concuerda con los valores de área indicados en los cuadros 1a o 1b.',
    mustBeEqualToPrivateOwnership: 'La suma de las subcategorías debe ser igual a Propiedad privada',
    mustBeEqualToForestExpansion: 'La suma de las subcategorías debe ser igual a Expansión forestal',
    mustBeEqualToPlantedForest: 'La suma de las subcategorías debe ser igual a Bosque plantado',
    mustBeEqualToForestArea:
      'La suma de Bosque con Procesos de Regeneración Natural y Bosque Plantado debe ser igual al total de Existencias Forestales en Formación',
    mustBeLessThanPrivateOwnership: 'La suma de las subcategorías debe ser inferior a Propiedad privada',
    forestSumAreaExceedsExtentOfForest:
      'La suma de las cifras introducidas supera el valor de área de bosque introducido en el cuadro 1a',
    valueEqualToSum: 'El valor total debe ser igual a la suma de las subcategorías',
  },

  emoji: {
    picker: {
      search: 'Buscar',
      categories: {
        search: 'Buscar resultados',
        recent: 'Usados frecuentemente',
        people: 'Emoticonos y personas',
        nature: 'Animales y naturaleza',
        foods: 'Comida y bebida',
        activity: 'Actividad',
        places: 'Viajes y lugares',
        objects: 'Objetos',
        symbols: 'Símbolos',
        flags: 'Banderas',
      },
    },
  },

  country: {
    region: {
      asia: 'Asia',
      europe: 'Europa',
      oceania: 'Oceanía',
      north_and_central_america: 'América del Norte y Central',
      south_america: 'América del Sur',
      africa: 'África',
      atlantis: 'Atlántida',
      forest_europe: 'Forest Europe',
    },
  },

  admin: {
    admin: 'Administración',
    filter: 'Filtrar por',
    language: 'Idioma',
    country: 'País',
    invitationPending: 'Invitación pendiente',
  },

  countryMessageBoard: {
    messageBoard: 'Tablero de mensajes',
    messageBoardDesc: 'Los mensajes publicados aquí son visibles para todos los miembros del país.',
    oneToOneMessages: 'Mensajes individuales',
  },

  tutorial: {
    watch: 'Ver',
    passwordLogin: 'Manual de usuario de la plataforma FRA - Cómo iniciar sesión con una contraseña autodefinida',
    googleLogin: 'Manual de usuario de la plataforma FRA - Cómo iniciar sesión utilizando la autenticación de Google',
    collaboratorAdd: 'Manual de usuario de la plataforma FRA - Cómo añadir un colaborador',
    platformNavigation: 'Manual de usuario de la plataforma FRA - Navegación por la plataforma',
    documentUpload: 'Manual de usuario de la plataforma FRA - Cómo subir un documento',
    ndpAdd: 'Manual de usuario de la plataforma FRA - Cómo añadir un punto de dato nacional',
    passwordLoginShort: 'Cómo iniciar sesión con una contraseña autodefinida',
    googleLoginShort: 'Cómo iniciar sesión utilizando la autenticación de Google',
  },
}
