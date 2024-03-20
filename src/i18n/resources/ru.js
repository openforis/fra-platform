const admin = require('./ru/admin')
const area = require('./ru/area')
const assessmentSection = require('./ru/assessmentSection')
const common = require('./ru/common')
const contentCheck = require('./ru/contentCheck')
const dataDownload = require('./ru/dataDownload')
const dataSource = require('./ru/dataSource')
const email = require('./ru/email')
const fra = require('./ru/fra')
const generalValidation = require('./ru/generalValidation')
const landing = require('./ru/landing')
const login = require('./ru/login')
const statisticalFactsheets = require('./ru/statisticalFactsheets')
const uc = require('./ru/uc')

module.exports.translation = {
  admin,
  area,
  common,
  contentCheck,
  dataDownload,
  dataSource,
  email,
  fra,
  generalValidation,
  login,
  landing,
  statisticalFactsheets,
  uc,

  fileDrop: {
    dropFilesHere: 'Загрузить файлы',
    dragAndDropOrClick: 'Переместите некоторые файлы сюда или нажмите для выбора файлов',
  },

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
    keyFindings: `Общая площадь лесов в мире составляет 4,06 млрд гектаров (га), или 31 процент от общей площади суши. Это значит, что на душу населения приходится по 0,52 га, однако леса неравномерно распределены между народами и регионами мира. Наибольшая часть лесов (45 процентов) находится в тропическом поясе, далее следуют бореальный, умеренный и субтропический пояса.`,
  },

  footer: {
    contactUs: 'Связь с нами',
    termsAndConditions: 'Положения и условия',
    scamAlert: 'Опасайтесь мошенников',
    reportMisconduct: 'Сообщить о нарушении',
    tutorials: 'Видео',
    sendFeedback: 'Направить отзыв',
    licenses: 'Лицензирование',
    platformVersion: 'Версия платформы',
  },

  disclaimer: {
    statisticalFactsheets: 'Оговорка: может содержать оценки ФАО, может содержать отсутствующие значения',
    part1: 'Этот веб-сайт был создан при содействии ',
    europeanUnion: 'Европейского союза',
    part2: ', ',
    govFinland: 'правительства Финляндии',
    part3: ' и ',
    govNorway: 'правительства Норвегии',
    part4: ' и ',
    gef: 'Фонда глобальной окружающей среды',
    part5:
      '. Его содержание является исключительной обязанностью ФАО и никоим образом не может рассматриваться как отражающее мнения Европейского союза, правительства Финляндии, правительства Норвегии и Фонда глобальной окружающей среды.',
    termsOfUse: `Условия использования статистических баз данных`,
  },

  unit: {
    haThousand: '1000 га',
    ha: 'га',
    kmSq: 'кв. км (км²)',
    mileSq: 'кв. миль',
    acre1000: '1000 акров',
    acre: 'акр',
    haMillion: 'млн га',
    haThousandPerYear: '1000 га/год',
    tonnesPerHa: 'тонн/га',
    cubicMeterPerHa: 'м³/га',
    millionTonnes: 'млн метрических тонн',
    millionsCubicMeterOverBark: 'млн м³ с корой',
    thousandCubicMeterOverBark: '1000 м³ с корой',
    billionCubicMeter: 'млрд м³',
    thousandCubicMeter: '1000 м³',
    thousandCubicMeterRWE: '1000 м³ эквивалента круглого леса',
    thousandPersons: '1000 человек',
    gt: 'гт',
    fte1000: '1000 ЭПЗ',
    numberOfStudents: '$t(graduationOfStudents.numberOfStudents)',
    absoluteNumber: 'абсолютное количество',
    annualNumberOfVisitsMillion: 'ежегодное число посещений (млн)',
    millionNationalCurrency: 'млн ед. нац. валюты',
    facilityLengthIn1000Km: 'объект (протяжённость в 1000 км)',
    growingStockPercent: '% от общего запаса древостоя',
  },

  countrySelection: {
    selectCountry: 'Выберите страну',
  },

  definition: {
    definitionLabel: 'См. определения',
    faqLabel: 'Часто задаваемые вопросы',
    seeReportingNotes: 'См. Примечания к отчетам',
  },

  audit: {
    notStarted: 'Не начато',
    edited: 'Отредактировано',
  },

  yesNoTextSelect: {
    yes: 'Да',
    no: 'Нет',
    notSelected: '',
  },

  user: {
    roles: {
      REVIEWER: 'Рецензент',
      NATIONAL_CORRESPONDENT: 'Национальный корреспондент',
      ALTERNATE_NATIONAL_CORRESPONDENT: 'Помощник национального корреспондента',
      COLLABORATOR: 'Сотрудник',
      ADMINISTRATOR: 'Администратор',
      noRole: 'Нет сведений',
      // deprecated
      // reviewer: 'Рецензент',
      // reviewer_0: 'Рецензент',
      // reviewer_1: 'Рецензента',
      // reviewer_2: 'Рецензентов',
      // nationalCorrespondent: 'Национальный корреспондент',
      // nationalCorrespondent_0: 'Национальный корреспондент',
      // nationalCorrespondent_1: 'Национальных корреспондента',
      // nationalCorrespondent_2: 'Национальных корреспондентов',
      // alternateNationalCorrespondent: 'Помощник национального корреспондента',
      // alternateNationalCorrespondent_0: 'Помощник национального корреспондента',
      // alternateNationalCorrespondent_1: 'Помощника национального корреспондента',
      // alternateNationalCorrespondent_2: 'Помощников национального корреспондента',
      // collaborator: 'Сотрудник',
      // collaborator_0: 'Сотрудник',
      // collaborator_1: 'Сотрудника',
      // collaborator_2: 'Сотрудников',
      // administrator: 'Администратор',
      VIEWER: 'Наблюдатель',
      reviewer_plural: 'Рецензенты',
      nationalCorrespondent_plural: 'Национальные корреспонденты',
      alternateNationalCorrespondent_plural: 'Заместители национального корреспондента',
      collaborator_plural: 'Сотрудники',
    },
    resetPasswordEmail: {
      subject: 'Платформа ОЛР - сменить пароль',
    },
  },

  fraClass: {
    forest: 'Леса',
    otherWoodedLand: 'Прочие лесопокрытые земли',
    otherLand: 'Другие земельные площади',
  },

  fraForestCharacteristicsClass: {
    naturallyRegeneratingForest: 'Естественно возобновляемые леса',
    plantationForest: 'Плантационные лесные культуры',
    ofWhichIntroduced: '…в том числе интродуцированные породы',
    otherPlantedForest: 'Другие лесные культуры',
    totalForest: 'Всего лесов',
  },

  fraOtherLandClass: {
    palms: '…в том числе пальмы (масличные, кокосовые, финиковые и т.д.)',
    treeOrchards: '…в том числе древесные сады (включает фруктовые, ореховые,оливковые деревья и т.д)',
    agroforestry: '…в том числе агролесоводство',
    treesUrbanSettings: '…в том числе деревья в городской среде',
  },

  userChat: {
    chatHeader: 'Сообщения от {{user}}',
    noMessages: 'Нет сообщений',
    writeMessage: 'Написать сообщение…',
    send: 'Отправить',
    cancel: 'Отмена',
    notificationEmail: {
      subject: '{{sender}} отправил Вам сообщение',
      textMessage: `Уважаемый(ая) {{recipient}},

{{sender}} отправил Вам сообщение.

Зайдите на платформу по следующему адресу, чтобы просмотреть сообщение и ответить:
{{- link}}

Группа по ОЛР
{{- url}}
    `,
      htmlMessage: `Уважаемый(ая) {{recipient}},
<br/><br/>
{{sender}} отправил Вам сообщение.
<br/><br/>
<b><a href="{{- link}}">Зайдите на платформу, чтобы просмотреть сообщение и ответить.</a></b>
<br/><br/>
Группа по ОЛР
<br/>
{{- url}}
    `,
    },
  },

  // error messages
  error: {
    access: {
      countryRoleNotSpecified:
        'Ошибка: Пользователь {{user}} попытался получить доступ к {{countryIso}} но не была указана роль',
      countryUserNotReviewer:
        'Ошибка: Пользователь {{user}} попытался получить доступ к {{countryIso}} не являясь рецензентом этой страны',
      roleChangeNotAllowed:
        'Ошибка: Пользователь {{user}} попытался назначить роль другого пользователя {{role}}, что не разрешается вошедшему пользователю',
      invitationAlreadyUsed:
        'Ошибка: приглащение {{invitationUuid}} уже было использовано, захват {{loginEmail}} не разрешается!',
      countryDoesNotMatch: 'Ошибка: страна{{countyryIso}}не совпадает',
      assessmentEditingNotAllowed:
        'Ошибка: Пользователь {{user}} в роли {{role}} не может редактировать оценку в состоянии {{assessmentStatus}} для страны {{countryIso}}',
      assessmentCommentingNotAllowed:
        'Ошибка: Пользователь {{user}} в роли {{role}} не может комментировать оценку в состоянии {{assessmentStatus}} для страны {{countryIso}}',
      userNotAdministrator:
        'Ошибка: пользователь {{user}} попытался получить доступ к ресурсу, доступному только для администраторов',
      userAlreadyAddedToCountry: 'Ошибка: пользователь {{user}} уже добавлен к стране {{sturniso}}',
    },
    assessment: {
      transitionNotAllowed: 'Ошибка: Переход от {{currentStatus}} к {{status}} не разрешается для роли {{role}}',
      deskStudyNotAllowed: 'Ошибка: Только администратор может изменять статус кабинетного исследования',
    },
    review: {
      commentDeleteNotOwner: 'Ошибка: Пользователь {{user}} попытался удалить чужой комментарий',
      commentEnterResolvedIssue: 'Ошибка: Пользователь {{user}} попытался добавить комментарий к разрешенной проблеме',
    },
    ndp: {
      previousNdpNotFound: 'Невозможно найти Национальные отчетные годы до до {{year}}',
    },
  },
  // components

  countryListing: {
    annuallyUpdated: 'Ежегодно обновляется',
    fra2020: 'ОЛР-2020',
  },

  navigation: {
    hideAll: 'Скрыть все',
    showAll: 'Показать все',
    support: {
      dontDelete: 'Системная информация, просьба не удалять',
      feedbackEmailSubject: 'Обратная связь с платформой ОЛР',
      platformVersion: 'Версия платформы',
      userAgent: 'Агент пользователя',
      user: 'Пользователь',
      manageCollaborators: 'Координировать сотрудников',
    },
    sectionHeaders: {
      introduction: 'Введение',
      forestExtentCharacteristicsAndChanges: 'Площадь лесов, характеристики и изменения',
      forestGrowingStockBiomassAndCarbon: 'Запас древостоя, биомасса и углерод',
      forestDesignationAndManagement: 'Назначение лесов и управление лесами',
      forestOwnershipAndManagementRights: 'Права собственности на леса и права управления лесами',
      forestDisturbances: 'Нарушения лесов',
      forestPolicyAndLegislation: 'Лесохозяйственная политика и законодательство',
      employmentEducationAndNwfp: 'Занятость, образование и НДЛП',
      sustainableDevelopment: 'Цель устойчивого развития 15',
      panEuropeanIndicators: 'Общеевропейские индикаторы',
    },
    cancel: 'Отмена',
    changeStatusTextPlaceholder: 'Добавить комментарий по выбору',
    doNotNotifyUsers: 'Не уведомлять пользователей',
    notifySelf: 'Отправить копию самому себе',
  },

  header: {
    editProfile: 'Редактировать профиль',
    logout: 'Выход',
    hideSidebar: 'Скрыть боковую панель',
    showSidebar: 'Показать боковую панель',
    autoSave: {
      saving: 'Сохранение…',
      complete: 'Все изменения сохранены',
      lastSaveTimestampReceived: 'Последний раз отредактировано ',
    },
  },

  time: {
    hour: '{{count}} час назад',
    hour_0: '{{count}} час назад',
    hour_1: '{{count}} часа назад',
    hour_2: '{{count}} часов назад',
    day: '{{count}} день назад',
    day_0: '{{count}} день назад',
    day_1: '{{count}} дня назад',
    day_2: '{{count}} дней назад',
    week: '{{count}} неделю назад',
    week_0: '{{count}} неделю назад',
    week_1: '{{count}} недели назад',
    week_2: '{{count}} недель назад',
    aMomentAgo: 'минуту назад',
    hour_plural: '{{count}} несколько часов назад',
    day_plural: '{{count}} несколько дней назад',
    week_plural: '{{count}} Несколько недель назад',
  },

  review: {
    comments: 'Комментарии',
    noComments: 'Нет комментариев',
    resolve: 'Разрешить',
    confirmDelete: 'Удалить этот комментарий? Его невозможно будет восстановить.',
    commentDeleted: 'Комментарий удален',
    commentMarkedAsResolved: 'Помечен как разрешенный',
    delete: 'Удалить',
    writeComment: 'Написать комментарий…',
    commentingClosed: 'Комментирование закрыто',
    cancel: 'Отмена',
    loading: 'Загрузка',
  },

  description: {
    edit: 'Редактировать',
    done: 'Готово',
    loading: 'Загрузка содержимого…',
    description: 'Описание',
    dataSourcesTitle: 'Источники данных, исходные данные и национальная классификация и определения',
    generalCommentsTitle: 'Комментарии',
    dataSources: 'Источники данных',
    dataSourcesPlus: 'Источники данных + вид источника данных, например, НИЛ и т.д.',
    originalData: 'Исходные данные',
    nationalClassificationAndDefinitions: 'Национальная классификация и определения',
    nationalData: 'Национальные данные',
    analysisAndProcessing: 'Анализ и обработка национальных данных',
    estimationAndForecasting: 'Оценка и прогнозирование',
    reclassification: 'Реклассификация в категории ОЛР-{{cycleName}}',
  },

  nationalDataPoint: {
    clickOnNDP: 'Нажмите на год, чтобы получить доступ к исходным данным',
    nationalDataPoint: 'Национальная точка данных',
    addNationalDataPoint: 'Добавить национальный отчетный год',
    noNationalDataAdded: 'Национальные данные не добавлены',
    nationalData: 'Национальные данные',
    reclassificationLabel: 'Исходные данные и реклассификация',
    forestCategoriesLabel: 'Леса, прочие лесопокрытые земли и другие земельные площади',
    referenceYearData: 'Отчетный год для данных',
    referenceYear: 'Отчетный год',
    references: 'Справочные материалы',
    selectYear: 'Выбрать…',
    methods: 'Методы',
    methodsUsed: 'Используемые методы',
    dataSource: 'Источник данных',
    dataSources: 'Источники данных',
    additionalComments: 'Дополнительные комментарии',
    edit: 'Редактировать',
    copyPreviousValues: 'Копировать предыдущие ссылки',
    nationalClass: 'Национальный класс',
    nationalClasses: 'Классификации и определения',
    definition: 'Определение',
    class: 'Класс',
    fraClasses: 'Классы ОЛР',
    area: 'Площадь (1000 га)',
    total: 'Итого',
    modifiedExplanation: 'Национальный отчетный год с изменениями',
    confirmDelete: 'Удалить этот отчетный год? Его невозможно будет восстановить.',
    discardChanges: 'Отменить изменения',
    doneEditing: 'Завершить редактирование',
    enterOrCopyPasteNationalClasses: 'Введите или скопируйте и вставьте национальные классы',
    forestCharacteristics: 'Характеристики лесов',
    otherLandCharacteristics: 'Другие лесистые земли',
    plantationForest: 'Плантационные лесные культуры',
    remindDirtyOdp: 'Национальный отчетный год был обновлен, не забудьте регенерировать значения',
    disabled: 'Заблокировано, разблокируйте в разделе 1b',
    dataSourceMethodsOptions: {
      nationalForestInventory: 'Национальная инвентаризация лесов',
      sampleBasedRemoteSensingAssessment: 'Выборочная оценка с помощью дистанционного зондирования',
      fullCoverMaps: 'Полные карты лесов/растительности',
      registersQuestionnaires: 'Реестры/опросники',
      other: '$t(common.otherSpecifyInComments)',
    },
    appliesToVariablesOptions: {
      forest: 'Леса',
      otherWoodedLand: 'Прочие лесопокрытые земли',
      otherLand: 'Другие земельные площади',
    },
    forestCategoriesLabel2025: 'Леса, прочие лесистые земли и остальные земельные площади',
    nationalClassifications: 'Национальные классификации',
    categories: 'Категории',
    prefill: 'Предварительно заполнить',
    prefillWith: 'Предварительно заполнить с',
    dataSource2025ExplanatoryText:
      'Перечисленные источники данных были представлены в ОЛР-2020. Просьба скопировать и вставить соответствующие источники данных в таблицу выше.',
    confirmCopyPreviousValues: 'Вы хотите изменить предыдущие значения? Эту операцию нельзя отменить.',
    fileAddedWillBecomePublic: 'Файл, добавленный в качестве справочного документа, станет общедоступным',
  },

  userManagement: {
    manageCollaborators: 'Координировать сотрудников',
    loginEmail: 'Логин',
    noUsers: 'Сотрудники не добавлены',
    placeholder: 'Выбрать…',
    remove: 'Удалить',
    done: 'Готово',
    edit: 'Редактировать',
    addUser: 'Добавить сотрудника',
    formErrors: 'Просьба исправить ошибки в формуляре.',
    insufficientPrivileges: 'Недостаточно полномочий',
    confirmDelete: 'Удалить {{user}}?',
    allUsers: 'Все сотрудники',
    info: 'Информация',
    tableAccess: 'Доступ к таблице',
    invitationLink: 'Ссылка на приглашение',
    inviteAgain: 'Пригласить заново',
    sendInvitation: 'Направить приглашение по электронной почте',
    invitationEmail: {
      subject: 'Приглашение на платформу ОЛР',
      textMessage: `Уважаемый(ая) {{invitedUser}},

Вас пригласили на платформу ОЛР в качестве {{role}} для {{country}}.

Примите это приглашение и зайдите на платформу по следующему адресу:
{{- link}}

Успехов в работе!

Группа по ОЛР fra@fao.org
{{- url}}
    `,
      htmlMessage: `Уважаемый(ая) {{invitedUser}},
<br/><br/>
Вас пригласили на платформу ОЛР в качестве {{role}} для {{country}}.
<br/><br/>
<b><a href="{{- link}}">Примите это приглашение и зайдите на платформу</a></b>
<br/><br/>
Успехов в работе!
<br/><br/>
Группа по ОЛР fra@fao.org
<br/>
{{- url}}
    `,
    },
    editPermissions: 'Изменить разрешения',
    invitationDeleted: 'Приглашение было удалено',
    invitationEmailSent: 'Письмо с приглашением было отправлено',
    permissions: 'Разрешения',
    personalInfoRequired: 'Пожалуйста, заполните вашу личную информацию, прежде чем продолжить',
    userAdded: '{{email}} был добавлен',
    userModified: '{{user}} был изменен',
    permissionNames: {
      tableData: 'Данные таблицы',
      descriptions: 'Описания',
    },
    invitationLinkCopied: 'Ссылка на приглашение была скопирована',
  },

  // FRA 2020 questionare
  // Object name and title should have always the same name

  contactPersons: {
    reportPreparationAndContactPersons: 'Подготавливающие доклад и контактные лица',
    contactPersons: 'Введение',
    contactPersonsSupport: 'Настоящий доклад был подготовлен следующим(и) лицом(-ами)',
    introductoryText: 'Вступительный текст',
    introductoryTextSupport: 'Вставьте вступительный текст о содержании данного доклада',
    firstName: 'Имя',
    lastName: 'Фамилия',
    institution: 'Учреждение/адрес',
    email: 'Электронная почта',
    tables: 'Таблицы',
    none: 'Ни одна',
  },

  extentOfForest: {
    extentOfForest: 'Площадь лесов и прочих лесопокрытых земель',
    estimationAndForecasting: 'Оценка и прогнозирование',
    categoryHeader: 'Категории ОЛР',
    forestArea: 'Леса',
    chart: {
      placeholderLine1: 'Чтобы начать, добавьте новые национальные отчетные годы и используйте',
      placeholderLine2: 'их для получения значений ОЛР автоматически.',
    },
    otherLandCategories: 'Категории других земельных площадей',
    ofWhichPalms: '…в том числе пальмы (масличные, кокосовые, финиковые и т.д.)',
    ofWhichTreeOrchards: '…в том числе древесные сады (вкл. фруктовые, ореховые, оливковые и т.д.)',
    ofWhichAgroforestry: '…в том числе агролесоводство',
    ofWhichTreesUrbanSettings: '…в том числе деревья в городской среде',
    totalLandArea: 'Общая площадь земель',
    fedAreasExceedTotalLandArea: 'Площадь лесов и прочих лесопокрытых земель превышает общую площадь земель',
    forestAreaDoesNotMatchPreviouslyReported: 'Площадь лесов не совпадает с площадью ОЛР-{{year}}: {{previous}}',
    useOriginalDataPoints: 'Использовать национальные отчетные годы',
    dontUseOriginalDataPoints: 'Не использовать национальные отчетные годы',
    whatIsThis: 'Что это такое?',
    tableNoticeMessage: 'Данные ФАОСТАТ о площади земель за 2015 год используются для всех отчетных лет',
    ndpMissingValues: 'Национальный отчетный год имеет отсутствующие значения',
    showNDPs: 'Показать национальные отчетные годы',
    hideNDPs: 'Скрыть национальные отчетные годы',
    forestAreaNetChangeDoesNotMatch: 'Изменение сети лесов не соответствует ожидаемому значению: {{value}}',
  },

  climaticDomain: {
    climaticDomain: 'Климатическая зона',
    percentOfForestArea2015: '% площади лесов 2015',
    percentOfForestArea2015Override: 'Переопределить значение',
    selectDefault: 'По умолчанию',
    boreal: 'Бореальная',
    temperate: 'Умеренная',
    subtropical: 'Субтропическая',
    sub_tropical: '$t(climaticDomain.subtropical)',
    tropical: 'Тропическая',
  },

  forestCharacteristics: {
    forestCharacteristics: 'Характеристики лесов',
    estimationAndForecasting: 'Оценка и прогнозирование',
    categoryHeader: 'Категории ОЛР',
    naturalForestArea: 'Естественно возобновляемые леса',
    plantationForestArea: 'Плантационные лесные культуры',
    plantationForestIntroducedArea: '…в том числе интродуцированные породы',
    otherPlantedForestArea: 'Другие лесные культуры',
    plantedForest: 'Лесные культуры',
    totalForestArea: 'Общая площадь лесов',
    total: 'Итого',
    useOriginalDataPoints: 'Использовать национальные отчетные годы',
    dontUseOriginalDataPoints: 'Не использовать национальные отчетные годы',
  },

  tableWithOdp: {
    confirmGenerateFraValues: 'Переопределить существующие значения?',
    generateFraValues: 'Получить значения',
    linearExtrapolation: 'Линейная экстраполяция',
    repeatLastExtrapolation: 'Повторять последнее значение',
    annualChangeExtrapolation: 'Годовое изменение',
    placeholderFuture: 'Будущее',
    placeholderPast: 'Прошлое',
    copyToClipboard: 'Скопировать значения',
    placeholderSelect: 'Оценка и прогнозирование',
    _1000haYear: '1000 га/год',
    generatingFraValues: 'Генерируется ...',
  },

  forestAreaChange: {
    forestAreaChange: 'Годовое расширение лесов, обезлесение и чистое изменение',
    categoryHeader: 'Категории ОЛР',
    areaUnitLabel: 'Площадь лесов (1000 га/год)',
    forestExpansion: 'Расширение лесов',
    ofWhichAfforestation: '…в том числе лесоразведение',
    ofWhichNaturalExpansion: '…в том числе естественное расширение лесов',
    deforestation: 'Обезлесение',
    forestAreaNetChange: 'Чистое изменение площади лесов',
    netChangeDoesNotMatch: 'Не совпадает с Чистым изменением лесной площади',
    forestAreaNetChangeFrom1a: 'Чистое изменение площади лесов рассчитано на основе таблицы 1а',
  },

  annualReforestation: {
    annualReforestation: 'Ежегодное лесовосстановление',
    categoryHeader: 'Категории ОЛР',
    areaUnitLabel: 'Площадь лесов (1000 га/год)',
    reforestation: 'Лесовосстановление',
  },

  specificForestCategories: {
    specificForestCategories: 'Девственные леса и специальные категории лесов',
    categoryHeader: 'Категории ОЛР',
    areaUnitLabel: 'Площадь (1000 га)',
    bamboo: 'Бамбуковые леса',
    mangroves: 'Мангровые леса',
    temporarilyUnstocked: 'Временно обезлесенные и/или недавно возобновленные',
    primaryForest: 'Девственные леса',
    exceedsNaturallyRegeneratingForest: 'Превышает естественно возобновляемые леса (1b)',
    rubberWood: 'Каучуковые деревья',
  },

  otherLandWithTreeCover: {
    otherLandWithTreeCover: 'Другие лесистые земли',
    areaUnitLabel: 'Площадь (1000 га)',
    categoryHeader: 'Категории ОЛР',
    palms: 'Пальмы',
    treeorchards: 'Древесные сады',
    agroforestry: 'Агролесоводство',
    treesinurbansettings: 'Деревья в городской среде',
    total: 'Итого',
    otherLandArea: 'Другие земельные площади',
    other: '$t(common.otherSpecifyInComments)',
  },

  growingStock: {
    growingStock: 'Запас древостоя',
    supportText: 'Просьба убедиться, что Вы ввели данные в таблицах 1a и 1b перед редактированием данной таблицы',
    categoryHeader: 'Категории ОЛР',
    avgTableHeader: 'Запас древостоя м³/га (с корой)',
    totalTableHeader: 'Общий запас древостоя (млн. м³ с корой)',
    naturallyRegeneratingForest: 'Естественно возобновляемые леса',
    plantedForest: 'Лесные культуры',
    plantationForest: '…в том числе плантационные лесные культуры',
    otherPlantedForest: '…в том числе другие лесные культуры',
    forest: 'Леса',
    otherWoodedLand: 'Прочие лесопокрытые земли',
    copyToClipboard: 'Скопировать значения',
  },

  growingStockComposition: {
    native: 'Местные',
    introduced: 'Интродуцированные',
    growingStockComposition: 'Состав древостоя',
    categoryHeader: 'Категории ОЛР',
    nativeTreeSpecies: 'Местные древесные породы',
    introducedTreeSpecies: 'Интродуцированные древесные породы',
    areaUnitLabel: 'Запас древостоя (млн. м³ с корой)',
    scientificName: 'Научное название',
    commonName: 'Общее название',
    rank: '#{{idx}} Классифицированы по объему',
    remainingNative: 'Остальные местные древесные породы ',
    remainingIntroduced: 'Остальные интродуцированные древесные породы ',
    totalNative: 'Общий объем местных древесных пород',
    totalIntroduced: 'Общий объем интродуцированных древесных пород',
    totalGrowingStock: 'Общий запас древостоя',
    rankingYear: 'Год классификации 2015',
  },

  biomassStock: {
    biomassStock: 'Запас биомассы',
    categoryHeader: 'Категории ОЛР',
    tableHeader: 'Лесная биомасса (тонн/га)',
    aboveGround: 'Надземная биомасса',
    belowGround: 'Подземная биомасса',
    deadWood: 'Мертвая древесина',
    downloadExcel: 'Скачать калькулятор excel',
  },

  carbonStock: {
    carbonStock: 'Запас углерода',
    categoryHeader: 'Категории ОЛР',
    tableHeader: 'Лесной запас углерода (тонн/га)',
    carbonAboveGroundBiomass: 'Углерод в надземной биомассе',
    carbonBelowGroundBiomass: 'Углерод в подземной биомассе',
    carbonDeadwood: 'Углерод в мертвой древесине',
    carbonLitter: 'Углерод в лесном опаде',
    carbonSoil: 'Почвенный углерод',
    soilDepthHeading: 'Глубина почвы (см), использованная для оценки почвенного углерода',
  },

  designatedManagementObjective: {
    designatedManagementObjective: 'Назначенная цель управления лесами',
    primaryDesignatedManagementObjective: 'Главная назначенная цель управления ',
    primaryDesignatedManagementObjectiveSupport:
      'Главная назначенная цель управления значительно важнее других целей управления. Различные главные цели управления являются *исключительными* и площади, представленные под одной главной целью управления лесами, не должны быть представлены для каких-либо других главных целей управления лесами.  Сумма различных целей управления должна суммироваться в площадь лесов.',
    totalAreaWithDesignatedManagementObjective: 'Общая площадь с назначенной целью управления',
    totalAreaWithDesignatedManagementObjectiveSupport:
      'Назначенная цель управления, вне зависимости от того, является ли она главной или нет. Различные категории назначения *не исключительны*. Поэтому данные о площадях могут представляться более одного раза, например, данные о площади лесов с главной целью управления «Многоцелевое использование» должны представляться по каждой цели управления. Следовательно, сумма различных целей управления может быть больше общей площади лесов.',
    categoryHeader: 'Категории ОЛР-2020',
    areaUnitLabel: 'Площадь лесов (1000 га)',
    production: 'Производство',
    soilWaterProtection: 'Охрана почв и водных ресурсов',
    biodiversityConservation: 'Сохранение биоразнообразия',
    socialServices: 'Социальные услуги',
    multipleUse: 'Многоцелевое использование',
    other: 'Другие виды (указать в комментариях)',
    unknown: 'Отсутствует/неизвестна',
    totalForestArea: 'Общая площадь лесов',
    total: 'Итого',
  },

  forestAreaWithinProtectedAreas: {
    forestAreaWithinProtectedAreas:
      'Лесные площади на охраняемых территориях и лесные площади с долгосрочным планами управления лесами',
    categoryHeader: 'Категории ОЛР',
    areaUnitLabel: 'Площадь (1000 га)',
    header: 'Лесная площадь на охраняемых территориях',
    forestAreaWithLongTermManagementPlan: 'Лесная площадь с долгосрочным планом управления лесами',
    ofWhichInProtectedAreas: '…в том числе на охраняемых территориях',
  },

  forestOwnership: {
    forestOwnership: 'Права собственности на леса',
    categoryHeader: 'Категории ОЛР',
    areaUnitLabel: 'Площадь лесов (1000 га)',
    privateOwnership: 'Частная собственность',
    ofWhichIndividuals: '…в том числе находящиеся в собственности отдельных лиц',
    ofWhichPrivateBusinesses: '…в том числе находящиеся в собственности частных предприятий и учреждений',
    ofWhichCommunities: '…в том числе находящиеся в собственности местных, племенных и коренных общин',
    publicOwnership: 'Государственная собственность',
    otherOrUnknown: 'Неизвестны/другие формы собственности (указать в комментариях)',
    totalForestArea: 'Общая площадь лесов',
    total: 'Итого',
  },

  holderOfManagementRights: {
    holderOfManagementRights: 'Права управления государственными лесами',
    categoryHeader: 'Категории ОЛР',
    areaUnitLabel: 'Площадь лесов (1000 га)',
    publicAdministration: 'Государственная администрация',
    individuals: 'Отдельные лица',
    privateBusinesses: 'Частные предприятия и учреждения',
    communities: 'Местные, племенные и коренные общины',
    other: 'Неизвестны/другие формы прав управления лесами (указать в комментариях)',
    totalPublicOwnership: 'Общая площадь в государственной собственности',
    total: 'Итого',
    publicOwnershipDoesNotMatch: 'Не совпадает с "Общая площадь в государственной собственности"',
  },

  disturbances: {
    disturbances: 'Нарушения ',
    categoryHeader: 'Категории ОЛР',
    areaUnitLabel: 'Площадь (1000 га)',
    insects: 'Насекомые',
    diseases: 'Болезни',
    severeWeatherEvents: 'Суровые погодные явления',
    other: '$t(common.otherSpecifyInComments)',
    totalForestArea: 'Общая площадь лесов',
    total: 'Итого',
  },

  areaAffectedByFire: {
    areaAffectedByFire: 'Площадь, пораженная пожарами',
    categoryHeader: 'Категории ОЛР',
    areaUnitLabel: 'Площадь (1000 га)',
    totalLandAreaAffectedByFire: 'Общая земельная площадь, пораженная пожарами',
    ofWhichForest: '…в том числе леса',
  },

  degradedForest: {
    degradedForest: 'Деградировавшие леса',
    doesYourCountryMonitor: 'Осуществляет ли ваша страна мониторинг площади деградировавших лесов?',
    ifYes: 'Если "Да"',
    whatIsDefinition: 'Каким является национальное определение "Деградировавшие леса"?',
    howMonitored: 'Опишите процесс мониторинга и результаты',
  },

  forestPolicy: {
    forestPolicy:
      'Политика, законодательство и национальная платформа для участия заинтересованных сторон в лесохозяйственной политике',
    categoryHeader: 'Указать наличие',
    areaUnitLabel: 'Логические значения (Да/Нет)',
    national: 'Национальные',
    subnational: 'Субнациональные',
    policiesSFM: 'Политика, содействующая устойчивому управлению лесами',
    legislationsSFM: 'Законодательные и/или нормативные акты, содействующие устойчивому управлению лесами',
    stakeholderParticipation:
      'Платформа, содействующая участию заинтересованных сторон в развитии лесохозяйственной политики',
    existenceOfTraceabilitySystem: 'Система(-ы) отслеживания происхождения древесной продукции',
  },

  areaOfPermanentForestEstate: {
    areaOfPermanentForestEstate: 'Площадь постоянного лесного фонда',
    categoryHeader: 'Категории ОЛР-2020',
    areaUnitLabel: 'Площадь лесов (1000 га)',
    applicable: 'Применимо?',
  },

  employment: {
    employment: 'Занятость в лесном хозяйстве и лесозаготовке',
    average: 'Среднее значение за трехлетний период',
    categoryHeader: 'Категории ОЛР-2020',
    unitHeader: 'Эквиваленты полной занятости (1000 ЭПЗ)',
    inForestry: 'Занятость в лесном хозяйстве и лесозаготовке',
    ofWhichSilviculture: '…в том числе лесоводство и другая лесохозяйственная деятельность',
    ofWhichLogging: '…в том числе лесозаготовка',
    ofWhichGathering: '…в том числе сбор недревесной лесной продукции',
    ofWhichSupport: '…в том числе занятость во вспомогательных услугах в лесном хозяйстве',
    total: 'Всего',
    female: 'Женщины',
    male: 'Мужчины',
  },

  graduationOfStudents: {
    graduationOfStudents: 'Получение образования в сфере лесного хозяйства',
    average: 'Среднее значение за трехлетний период',
    numberOfStudents: 'Количество выпускников',
    fra2020Categories: 'Категории ОЛР-2020',
    doctoralDegree: 'Докторская степень',
    mastersDegree: 'Степень магистра',
    bachelorsDegree: 'Степень бакалавра',
    technicianCertificate: 'Свидетельство/ диплом о профессионально-техническом образовании',
    total: 'Всего',
    female: 'Женщины',
    male: 'Мужчины',
  },

  nonWoodForestProductsRemovals: {
    nonWoodForestProductsRemovals: 'Вывозка и стоимость недревесной лесной продукции 2015',
    nameOfProduct: 'Название продукта НДЛП',
    keySpecies: 'Ключевые виды',
    quantity: 'Количество',
    unit: 'Единица',
    value: 'Стоимость (1000 единиц валюты)',
    category: 'Категория НДЛП',
    plantProductsSelectHeading: 'Продукты/сырье растительного происхождения',
    food: '1 Продовольствие',
    fodder: '2 Корм',
    rawMaterialForMedicine: '3 Лекарственное сырье и сырье для ароматических продуктов',
    rawMaterialForColorants: '4 Сырье для красителей и красок',
    rawMaterialForUtensils: '5 Сырье для утвари, ремесленных изделий и строительства',
    ornamentalPlants: '6 Декоративные растения',
    exudates: '7 Вытяжки',
    otherPlantProducts: '8 Другие продукты растительного происхождения',
    animalProductsSelectHeading: 'Продукты/сырье животного происхождения',
    livingAnimals: '9 Живые животные',
    hidesSkins: '10 Кожевенное сырье и трофеи',
    wildHoney: '11 Дикий мед и пчелиный воск',
    wildMeat: '12 Мясо дичи',
    animalRawMaterialForMedicine: '13 Лекарственное сырье',
    animalRawMaterialForColorants: '14 Сырье для красителей',
    otherEdibleAnimalProducts: '15 Другие съедобные продукты животного происхождения',
    otherNonEdibleAnimalProducts: '16 Другие несъедобные продукты животного происхождения',
    allOtherPlantProducts: 'Все остальные продукты растительного происхождения',
    allOtherAnimalProducts: 'Все остальные продукты животного происхождения',
    total: 'Итого',
    currency: 'Название валюты',
    notSelected: '',
  },

  sustainableDevelopment: {
    sustainableDevelopment: 'Цель устойчивого развития 15',
    indicator: 'Индикатор',
    percent: 'Процент',
    nameOfAgencyResponsible: 'Название ответственного ведомства',
    sdgIndicator1: 'Индикатор ЦУР 15.1.1 Площадь лесов в процентном отношении к общей площади земель 2015',
    sdgIndicator2: 'Индикатор ЦУР 15.2.1 Прогресс на пути к устойчивому управлению лесами',
    forestAreaProportionLandArea2015: 'Площадь лесов в процентном отношении к общей площади земель 2015',
    subIndicator: 'Субиндикатор {{no}}',
    forestAreaAnnualNetChangeRate: 'Темп чистого изменения лесной площади',
    aboveGroundBiomassStockForests: 'Запас надземной биомассы в лесах',
    percent2015ForestAreaBaseline: 'Процент (Площадь лесов 2015 - исходная отметка)',
    proportionForestAreaLegallyEstablishedProtectedAreas:
      'Доля площади лесов, находящихся на законно установленных охраняемых территориях',
    proportionForestAreaLongTermForestManagement: 'Доля площади лесов под долгосрочным планом управления лесами',
    forestArea1000Ha: 'Площадь лесов (1000 га)',
    forestAreaVerifiedForestManagement:
      'Площадь лесов под независимо проверяемыми системами сертификации управления лесами',
  },

  panEuropeanIndicators: {
    panEuropeanIndicators: 'Общеевропейские количественные индикаторы устойчивого управления лесами',
    uploadQuestionnaire: 'Загрузить вопросник',
    chooseFile: 'Выбрать файл',
    downloadQuestionnaire: 'Скачать вопросник',
    download: 'Скачать',
    remove: 'Удалить',
    noQuestionnaire: 'Вопросник не выбран',
    panEuropeanQualitativeIndicators: 'Общеевропейские качественные индикаторы устойчивого управления лесами',
    accessReportingPage: 'Зайти на страницу отчетности',
  },

  assessment: {
    fra: 'ОЛР',
    panEuropean: 'Общеевропейский',
    deskStudy: 'Кабинетное исследование',
    statusChangeNotification: {
      subject: '{{country}} статус изменен на {{status}} на платформе ОЛР',
      textMessage: `Уважаемый(ая){{recipientName}},

{{changer}} изменил статус с {{assessment}} на "{{status}}" для {{country}} на платформе ОЛР.

{{message}}

Зайдите на платформу по адресу: {{- serverUrl}}

Группа по ОЛР
{{- serverUrl}}`,
      htmlMessage: `Уважаемый(ая) {{recipientName}},
<br/><br/>
{{changer}} изменил статус с {{assessment}} на "{{status}}" для {{country}} на платформе ОЛР.
<br/><br/>
{{message}}
<br/><br/>
<a href="{{- serverUrl}}"><b>Зайдите на платформу</b></a>
<br/><br/>
Группа по ОЛР
<br/>
{{- serverUrl}}`,
    },
    status: {
      changing: {
        label: 'Изменяется…',
      },
      editing: {
        label: 'Редактируется',
        previous: 'Вернуться к редактированию',
      },
      review: {
        label: 'На рассмотрении',
        next: 'Отправить на рассмотрение',
        previous: 'Вернуться к рассмотрению',
      },
      approval: {
        label: 'Ожидает утверждения',
        next: 'Отправить на утверждение',
        previous: 'Вернуться к утверждению',
      },
      accepted: {
        label: 'Принят',
        next: 'Принять',
        previous: '',
      },
      status: {
        notStarted: {
          label: 'Не начат',
        },
      },
    },
  },

  multiSelect: {
    placeholder: 'Выбрать…',
  },

  emoji: {
    picker: {
      search: 'Поиск',
      categories: {
        search: 'Результаты поиска',
        recent: 'Часто используемые',
        people: 'Смайлики и люди',
        nature: 'Животные и природа',
        foods: 'Еда и напитки',
        activity: 'Деятельность',
        places: 'Путешествия и места',
        objects: 'Предметы',
        symbols: 'Символы',
        flags: 'Флаги',
      },
    },
  },

  editUser: {
    activate: 'Активировать',
    activated: 'Активирован',
    chooseProfilePicture: 'Выбрать картинку',
    city: 'Город',
    contactPreference: 'Предпочтительный способ контакта',
    contactPreferenceMethod: 'Метод контакта',
    contributions: 'Вклад',
    countryIso: 'Страна',
    deactivate: 'Деактивировать',
    demoteToUser: 'Вы уверены, что хотите удалить привилегии администратора?',
    done: 'Сохранить',
    email: 'Электронная почта',
    institution: 'Учреждение',
    loginEmail: 'Логин',
    mandatoryFields: '* Обязательные поля',
    mr: 'Г-н',
    mrs: 'Г-жа',
    ms: 'Г-жа',
    name: 'Имя',
    organization: 'Организация',
    organizationalUnit: 'Организационное подразделение',
    other: 'Другое',
    picture1MbMax: 'Картинка в профиле не может превышать 1MB',
    platformChat: 'Чат на платформе',
    poBox: 'Абонентский ящик',
    position: 'Должность',
    primaryEmail: 'Основной адрес электронной почты',
    primaryPhoneNumber: 'Основной телефон',
    professionalTitle: 'Должность',
    promoteToAdmin: 'Вы уверены, что хотите предоставить административные привилегии?',
    role: 'Роль',
    secondaryEmail: 'Дополнительный адрес электронной почты',
    secondaryPhoneNumber: 'Второй номер телефона',
    signal: 'Signal',
    skype: 'Имя пользователя Skype',
    status: 'Статус',
    street: 'Адрес ',
    surname: 'Фамилия',
    title: 'Апелляция',
    whatsapp: 'WhatsApp',
    zipCode: 'Почтовый индекс',
  },

  country: {
    region: {
      asia: 'Азия',
      europe: 'Европа',
      oceania: 'Океания',
      north_and_central_america: 'Северная и Центральная Америка',
      south_america: 'Южная Америка',
      africa: 'Африка',
      atlantis: 'Атлантида',
      forest_europe: 'Forest Europe',
    },
  },

  countryMessageBoard: {
    messageBoard: 'Доска сообщений',
    messageBoardDesc: 'Оставленные здесь сообщения видны всем участникам от страны',
    oneToOneMessages: 'Личные сообщения',
  },

  tutorial: {
    watch: 'Смотреть',
    passwordLogin: 'Руководство пользователя платформы ОЛР - Как войти в систему с помощью собственного пароля',
    googleLogin: 'Руководство пользователя платформы ОЛР - Как войти в систему, используя аутентификацию Google',
    collaboratorAdd: 'Руководство пользователя платформы ОЛР — Как добавить сотрудника',
    platformNavigation: 'Руководство пользователя платформы ОЛР — Навигация по платформе',
    documentUpload: 'Руководство пользователя платформы ОЛР - Как загрузить документ',
    ndpAdd: 'Руководство пользователя платформы ОЛР — Как добавить национальный отчетный год',
    passwordLoginShort: 'Как войти в систему с помощью собственного пароля',
    googleLoginShort: 'Как войти в систему, используя аутентификацию Google',
    guidelinesAndSpecifications: 'Руководство и спецификации',
    ndpAddReferenceLink: 'Руководство пользователя платформы ОЛР - Как добавить ссылку для национальной точки данных',
    nationalDataAddReferenceLink: 'Руководство пользователя платформы ОЛР - Как добавить ссылку на национальные данные',
  },

  panEuropean: {
    panEuropeanAssessment: 'Общеевропейская оценка',
    variable: 'Переменная',
    landing: {
      link: 'Объединенный отчёт ЛЕСА ЕВРОПЫ / ЕЭК ООН / ФАО по общеевропейским индикаторам для устойчивого управления лесами: ЛЕСА ЕВРОПЫ',
    },
    home: {
      description1:
        'Этот набор данных состоит из информации, предоставленной национальными корреспондентами, отвечавшими на объединенный вопросник ЛЕСА ЕВРОПЫ / ЕЭК ООН / ФАО по общеевропейским количественным индикаторам для устойчивого управления лесами.',
      description2:
        'Примечание: Общеевропейский отчёт 2020 был выполнен параллельно с ОЛР 2020, тем не менее, так как они содержат отдельные процессы, некоторые переменные присутствуют в обоих отчётах. В ходе разработки отчётности о состоянии европейских лесов (СЕЛ) 2020 по части некоторой информации были проведены дальнейшие консультации с национальными корреспондентами, которая может отличаться от представленной в платформе ОЛР.',
    },
    disclaimer: {
      govSwitzerland: 'Правительство Швейцарии',
      part1: 'The website has been produced with the assistance [support] of the',
    },

    // navigation
    navigation: {
      forestResourcesAndCarbon: 'Лесные ресурсы и углерод',
      maintenanceOfForestEcosystemHealthAndVitality: 'Сохранение здоровья экосистемы и жизнеспособности леса',
      productiveFunctionsOfForestsWoodAndNonWood: 'Производственные функции лесов (древесина и недревесные продукты)',
      biologicalDiversityInForestEcosystems: 'Биологическое разнообразие в лесных экосистемах',
      protectiveFunctionsInForestManagement: 'Защитные функции в лесоуправлении',
      socioEconomicFunctionsAndConditions: 'Социально-экономические функции и условия',
    },

    // table 1.1a
    forestArea: {
      forestArea: 'Площадь лесов',
      categoryYear: 'Категория - Год',
      area: 'Площадь',
      area1000Ha: 'Площадь (1000 га)',
      forest: 'Лес - {{year}}',
      _of_which_available_for_wood_supply: '… в т. ч. доступный для поставки древесины - {{year}}',
      other_wooded_land: 'Прочая лесопокрытая земля - {{year}}',
      total_forest_and_other_wooded_land: 'Всего лес и прочая лесопокрытая земля - {{year}}',
      other_land: 'Другая земля - {{year}}',
      _of_which_with_tree_cover: '…в т. ч. с деревьями - {{year}}',
    },

    // table 1.1b
    forestAreaByForestTypes: {
      forestAreaByForestTypes: 'Площадь лесов по типам леса',
      category: 'Категория',
      forestArea1000Ha: 'Площадь леса (1000 га)',
      predominantly_coniferous_forest: 'Преимущественно хвойный лес',
      predominantly_broadleaved_forest: 'Преимущественно лиственный лес',
      mixed_forest: 'Смешанный лес',
      forest_area_1990: 'Площадь леса - 1990',
      forest_area_2000: 'Площадь леса - 2000',
      forest_area_2005: 'Площадь леса - 2005',
      forest_area_2010: 'Площадь леса - 2010',
      forest_area_2015: 'Площадь леса - 2015',
      forest_area_2020: 'Площадь леса - 2020',
    },

    // table 1.2a
    growingStock: {
      growingStock: 'Общий запас древесины',
      categoryYear: 'Категория - Год',
      growingStockMillionM3OB: 'Общий запас древесины (млн м³ с корой)',
      total: 'Всего',
      _ofWhich: '… в т. ч.:',
      coniferous: 'Хвойные',
      broadleaved: 'Лиственные',
      forest: 'Лес - {{year}}',
      _of_which_available_for_wood_supply: '… в т. ч. доступный для поставки древесины - {{year}}',
      other_wooded_land: 'Прочая лесопокрытая земля - {{year}}',
      total_forest_and_other_wooded_land: 'Всего лес и прочая лесопокрытая земля - {{year}}',
    },

    // table 1.2b
    growingStockByForestType: {
      growingStockByForestType: 'Общий запас древесины по типам леса',
      category: 'Категория',
      growingStockMillionM3OB: 'Общий запас древесины (млн м³ с корой)',
      predominantly_coniferous_forest: 'Преимущественно хвойный лес',
      predominantly_broadleaved_forest: 'Преимущественно лиственный лес',
      mixed_forest: 'Смешанный лес',
      growing_stock_1990: 'Общий запас древесины - 1990',
      growing_stock_2000: 'Общий запас древесины - 2000',
      growing_stock_2005: 'Общий запас древесины - 2005',
      growing_stock_2010: 'Общий запас древесины - 2010',
      growing_stock_2015: 'Общий запас древесины - 2015',
      growing_stock_2020: 'Общий запас древесины - 2020',
    },

    // table 1.2c
    growingStockComposition: {
      growingStockComposition: 'Состав общего запаса древесины',
      speciesName: 'Название вида',
      growingStockInForestMillionM3OB: 'Общий запас древесины (млн м³ с корой)',
      rank: 'Разряд',
      scientificName: 'Научное название',
      commonName: 'Общеупотребляемое название',
      no1_ranked_in_terms_of_volume: '№1 Судя по объему',
      no2_ranked_in_terms_of_volume: '№2 Судя по объему',
      no3_ranked_in_terms_of_volume: '№3 Судя по объему',
      no4_ranked_in_terms_of_volume: '№4 Судя по объему',
      no5_ranked_in_terms_of_volume: '№5 Судя по объему',
      no6_ranked_in_terms_of_volume: '№6 Судя по объему',
      no7_ranked_in_terms_of_volume: '№7 Судя по объему',
      no8_ranked_in_terms_of_volume: '№8 Судя по объему',
      no9_ranked_in_terms_of_volume: '№9 Судя по объему',
      no10_ranked_in_terms_of_volume: '№10 Судя по объему',
      remaining: 'Остальное',
      total: 'ИТОГО',
      scientific_name: 'Научное название',
      common_name: 'Общеупотребляемое название',
      growing_stock_in_forest_1990: 'Общий запас древесины (млн м³ с корой) - 1990',
      growing_stock_in_forest_2000: 'Общий запас древесины (млн м³ с корой) - 2000',
      growing_stock_in_forest_2005: 'Общий запас древесины (млн м³ с корой) - 2005',
      growing_stock_in_forest_2010: 'Общий запас древесины (млн м³ с корой) - 2010',
      growing_stock_in_forest_2015: 'Общий запас древесины (млн м³ с корой) - 2015',
      growing_stock_in_forest_2020: 'Общий запас древесины (млн м³ с корой) - 2020',
    },

    // table 1.3a1
    ageClassDistributionAreaOfEvenAgedStands: {
      ageClassDistributionAreaOfEvenAgedStands:
        'Распределение по возрастным классам (площадь одновозрастных насаждений)',
      categoryYear: 'Категория - Год',
      developmentPhases: 'Фазы развития',
      total_area: 'Общая площадь',
      regeneration_phase: 'Фаза восстановления',
      intermediate_phase: 'Промежуточная фаза',
      mature_phase: 'Фаза зрелости',
      unspecified: 'Неопределено',
      _1000Ha: '1000 га',
      forest_even_aged_stands_of_which: 'Лес: (одновозрастные насаждения), в т. ч: - {{year}}',
      available_for_wood_supply_of_which: 'Лес доступный для поставки древесины, в т. ч: - {{year}}',
      predominantly_coniferous_forest: 'Преимущественно хвойный лес - {{year}}',
      predominantly_broadleaved_forest: 'Преимущественно лиственный лес - {{year}}',
      mixed_forest: 'Смешанный лес - {{year}}',
    },

    // table 1.3a2
    ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply: {
      ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply:
        'Распределение по возрастным классам (запас одновозрастных насаждений) леса доступного для поставки древесины',
      categoryYear: 'Категория - Год',
      developmentPhases: 'Фазы развития',
      total_volume: 'Общий объем',
      regeneration_phase: 'Фаза восстановления',
      intermediate_phase: 'Промежуточная фаза',
      mature_phase: 'Фаза зрелости',
      unspecified: 'Неопределено',
      _1000M3: '1000 м³',
      forest_available_for_wood_supply_even_aged_stands_of_which:
        'Лес доступный для поставки древесины (одновозрастные насаждения), в т. ч: - {{year}}',
      predominantly_coniferous_forest: 'Преимущественно хвойный лес - {{year}}',
      predominantly_broadleaved_forest: 'Преимущественно лиственный лес - {{year}}',
      mixed_forest: 'Смешанный лес - {{year}}',
    },

    // table 1.3b
    diameterDistributionAndTotalAreaUnevenAgedStands: {
      diameterDistributionAndTotalAreaUnevenAgedStands:
        'Распределение по диаметрам и общая площадь (разновозрастные насаждения)',
      categoryYear: 'Категория - Год',
      volumeByDiameterClasses1000mob: 'Объем по классам диаметра',
      area: 'Площадь (1000 га)',
      total_volume: 'Общий объем (1000 м³ с корой)',
      less_or_equal_20_cm: '<20 см (1000 м³ с корой)',
      _21_40_cm: '21-40 см (1000 м³ с корой)',
      _41_60_cm: '41-60 см (1000 м³ с корой)',
      greater_60_cm: '>60 см (1000 м³ с корой)',
      unspecified: 'Не определено (1000 м³ с корой)',
      forest_uneven_aged_stands: 'Лес: разновозрастные насаждения - {{year}}',
      _of_which_forest_available_for_wood_supply: '... в т. ч. лес доступный для поставки древесины - {{year}}',
    },

    // table 1.4a
    carbonStock: {
      carbonStock: 'Запас углерода',
      categoryYear: 'Категория - Год',
      carbonInAboveGroundAndBelowGroundLivingBiomass: 'Углерод в живой фитомассе',
      carbonInDeadwoodAndLitter: 'Углерод в мертвой фитомассе',
      above_ground: 'Углерод в живой надземной фитомассе',
      aboveGround: 'Надземная',
      below_ground: 'Углерод в живой подземной фитомассе',
      belowGround: 'Подземная',
      deadwood: 'Углерод в мёртвой древесине',
      deadwoodCarbon: 'Мертвая древесина',
      litter: 'Углерод в лесном опаде',
      litterCarbon: 'Лесной опад',
      soil_carbon: 'Углерод в почве',
      millionMetricTonnes: 'Миллион метрических тонн',
      forest: 'Лес - {{year}}',
      other_wooded_land: 'Прочая лесопокрытая земля - {{year}}',
      total_forest_and_other_wooded_land: 'Всего лес и прочая лесопокрытая земля - {{year}}',
    },

    // table 1.4b
    carbonStockInHarvestedWoodProductsHWP: {
      carbonStockInHarvestedWoodProductsHWP: 'Запас углерода в товарах из заготовленной древесины',
      categoryYear: 'Категория - Год',
      totalCarbonStockInHWPMillionMetricTonnes:
        'Всего запас углерода в товарах из заготовленной древесины (млн. метрических тонн)',
      total_carbon_stock_in_hwp: 'Всего запас углерода в товарах из заготовленной древесины',
      harvested_wood_products: 'Товары из заготовленной древесины - {{year}}',
    },

    // table 2.4
    forestAreaWithDamage: {
      forestAreaWithDamage: 'Площадь леса с повреждением',
      categoryYear: 'Категория - Год',
      areaWithDamageByDifferentAgents: 'Площадь с повреждениями, вызванными разными факторами',
      primarilyDamagedByBioticAgents: 'Поврежденные преимущественно биотическими факторами',
      damagePrimarilyHumanInduced: 'Преимущественно антропогенные повреждения',
      primarilyDamagedByFire: 'Поврежденные преимущественно пожарами',
      thousandHa: '1000 гa',
      total_area_with_damage: 'Общая площадь с повреждениями',
      insects_and_disease: 'Биотические факторы: насекомые и болезни',
      insectsAndDisease: 'Насекомые и болезни',
      wildlife_and_grazing: 'Биотические факторы: дикие животные и скот',
      wildlifeAndGrazing: 'Дикие животные и скот',
      forest_operations: 'Антропогенные повреждения: лесные операции',
      forestOperations: 'Лесные операции',
      other: 'Антропогенные повреждения: другое',
      otherHumanInduced: 'Другое',
      primarily_damaged_by_abiotic_agents: 'Абиотические факторы (ураган, ветер, снег и т. д.)',
      primarilyDamagedByAbioticAgents:
        'Поврежденные преимущественно абиотическими факторами (ураган, ветер, снег и т. д.)',
      primarily_damaged_by_fire_total: 'Пожары: всего',
      primarilyDamagedByFireTotal: 'Всего',
      of_which_human_induced: 'Пожары: в т. ч. вызванные человеком',
      ofWhichHumanInduced: 'в т. ч. вызванные человеком',
      unspecified_mixed_damage: 'Неопределенные / смешанные повреждения',
      forest: 'Лес - {{year}}',
      other_wooded_land: 'Прочая лесопокрытая земля - {{year}}',
      total_forest_and_other_wooded_land: 'Всего лес и прочая лесопокрытая земля - {{year}}',
    },

    // table 2.5
    areaWithForestLandDegradation: {
      areaWithForestLandDegradation: 'Площадь с деградацией лесных земель',
      categoryYear: 'Категория - Год',
      totalAreaOfDegradedLand: 'Всего площадь деградировавшей земли',
      areaPrimarilyDegradedBy: 'Площадь, в основном деградировавшая из-за',
      formerDegradedLandRestored: 'Деградировавшая земля восстановлена',
      grazing: 'Выпасов животных',
      repeatedFires: 'Пожаров',
      airPollution: 'Загрязнения воздуха',
      desertification: 'Опустынивания',
      other1: 'Другое 1',
      other2: 'Другое 2',
      other3: 'Другое 3',
      unknown: 'Неизвестно',
      nA: '',
      thousandHa: '1000 га',
      forest: 'Лес - {{year}}',
      other_wooded_land: 'Прочая лесопокрытая земля - {{year}}',
      total_forest_and_other_wooded_land: 'Всего лес и прочая лесопокрытая земля - {{year}}',
      otherNames: 'Названия других факторов, из-за которых площадь в основном деградировавшая',
      total_area_of_degraded_land: 'Всего площадь деградировавшей земли',
      repeated_fires: 'Пожары',
      air_pollution: 'Загрязнение воздуха',
      other_1: 'Другое 1',
      other_2: 'Другое 2',
      other_3: 'Другое 3',
      former_degraded_land_restored: 'Деградировавшая земля восстановлена',
    },

    // table 3.1
    incrementAndFellings: {
      incrementAndFellings: 'Прирост и рубка',
      categoryYear: 'Категория - Год',
      fellings: 'Рубки',
      volume1000mob: 'Объем (1000 м³ с корой)',
      gross_annual_increment: 'Валовой ежегодный прирост',
      natural_losses: 'Естественные потери',
      net_annual_increment: 'Чистый ежегодный прирост',
      fellings_total: 'Рубки: всего',
      fellingsTotal: 'Всего',
      _of_which_of_natural_losses: 'Рубки: естественные потери',
      ofWhichOfNaturalLosses: '… в т. ч: естественные потери',
      forest: 'Лес - {{year}}',
      _of_which_forest_available_for_wood_supply: '... в т. ч: лес доступный для поставки древесины - {{year}}',
    },

    // table 3.2
    removals: {
      removals: 'Вывозка',
      categoryYear: 'Категория - Год',
      woodRemovals: 'Вывозка древесины',
      total: 'Всего',
      industrialRoundwood: 'Деловой круглый лес',
      woodfuel: 'Древесное топливо',
      volume1000M3UB: 'Объем (1000 м³ без коры)',
      marketValue1000NationalCurrency: 'Рыночная стоимость (1000 ед. нац. валюты)',
      roundwood: 'Круглый лес - {{year}}',
      total_volume: 'Всего: объем (1000 м³ без коры)',
      industrial_roundwood_volume: 'Деловой круглый лес: объем (1000 м³ без коры)',
      industrial_roundwood_market_value: 'Деловой круглый лес: рыночная стоимость (1000 ед. нац. валюты)',
      woodfuel_volume: 'Древесное топливо: объем (1000 м³ без коры)',
      woodfuel_market_value: 'Древесное топливо: рыночная стоимость (1000 ед. нац. валюты)',
    },

    // table 3.3
    nonWoodGoods2015: {
      nonWoodGoods2015: 'Недревесные лесные продукты (2015)',
      rankValue: 'Ранг (стоимость)',
      nameOfGroupsOfProduct: 'Название продукта (группы продуктов)',
      keySpecies: 'Ключевые виды',
      totalHarvestedNonWoodGoods: 'Всего заготовлено недревесных продуктов',
      unit: 'Единица измерения',
      quantity: 'Количество',
      marketValue1000NationalCurrency: 'Рыночная стоимость (1000 ед. нац. валюты)',
      nwfpCategory: 'Категория недревесных лесных продуктов',
      _01st: '1-й ранг (стоимость)',
      _02nd: '2-й ранг (стоимость)',
      _03rd: '3-й ранг (стоимость)',
      _04th: '4-й ранг (стоимость)',
      _05th: '5-й ранг (стоимость)',
      _06th: '6-й ранг (стоимость)',
      _07th: '7-й ранг (стоимость)',
      _08th: '8-й ранг (стоимость)',
      _09th: '9-й ранг (стоимость)',
      _10th: '10-й ранг (стоимость)',
      all_other_plant_products: 'Все прочие растительные продукты',
      all_other_animal_products: 'Все прочие животные продукты',
      total: 'ВСЕГО',
      name_of_groups_of_product: 'Название продукта (группы продуктов)',
      key_species: 'Ключевые виды',
      total_harvested_non_wood_goods_unit: 'Всего заготовлено недревесных продуктов: единица измерения',
      total_harvested_non_wood_goods_quantity: 'Всего заготовлено недревесных продуктов: количество',
      market_value_1000_national_currency: 'Рыночная стоимость (1000 ед. нац. валюты)',
      nwfp_category: 'Категория недревесных лесных продуктов',
    },

    // table 3.4
    marketedServices2015: {
      marketedServices2015: 'Рыночные услуги (2015)',
      rankValue: 'Ранг (стоимость)',
      nameOfServiceProduct: 'Название услуги/продукта',
      unit: 'Единица измерения',
      serviceProvision: 'Предоставление услуг',
      forestServiceCategory: 'Категория лесных услуг',
      amountOfServiceProduct: 'Объем услуги / продукта',
      value1000NationalCurrency: 'Стоимость (1000 ед. нац. валюты)',
      _01st: '1-й ранг (стоимость)',
      _02nd: '2-й ранг (стоимость)',
      _03rd: '3-й ранг (стоимость)',
      _04th: '4-й ранг (стоимость)',
      _05th: '5-й ранг (стоимость)',
      _06th: '6-й ранг (стоимость)',
      _07th: '7-й ранг (стоимость)',
      _08th: '8-й ранг (стоимость)',
      _09th: '9-й ранг (стоимость)',
      _10th: '10-й ранг (стоимость)',
      remaining_total: 'Итого остальное',
      total: 'Всего',
      name_of_service_product: 'Название услуги/продукта',
      service_provision_amount_of_service_product: 'Предоставление услуг: объем услуги / продукта',
      service_provision_value_1000_national_currency: 'Предоставление услуг: стоимость (1000 ед. нац. валюты)',
      forest_service_category: 'Категория лесных услуг',
    },

    // table 4.1
    treeSpeciesComposition: {
      treeSpeciesComposition: 'Породный состав',
      categoryYear: 'Категория - Год',
      areaWithNumberOfTreeSpeciesOccurring1000ha: 'Площадь с количеством встречающихся пород деревьев (1000 га)',
      area_with_number_of_tree_species_occurring_1: 'Площадь с количеством встречающихся пород деревьев: 1',
      areaWithNumberOfTreeSpeciesOccurring1: '1',
      area_with_number_of_tree_species_occurring_2_3: 'Площадь с количеством встречающихся пород деревьев: 2-3',
      areaWithNumberOfTreeSpeciesOccurring2_3: '2-3',
      area_with_number_of_tree_species_occurring_4_5: 'Площадь с количеством встречающихся пород деревьев: 4-5',
      areaWithNumberOfTreeSpeciesOccurring4_5: '4-5',
      area_with_number_of_tree_species_occurring_6_pl: 'Площадь с количеством встречающихся пород деревьев: 6+',
      areaWithNumberOfTreeSpeciesOccurring6_pl: '6+',
      forest: 'Лес - {{year}}',
      other_wooded_land: 'Прочая лесопокрытая земля - {{year}}',
      total_forest_and_other_wooded_land: 'Всего лес и прочая лесопокрытая земля - {{year}}',
    },

    // table 4.2a
    totalForestAreaByExpansionAndRegenerationType: {
      totalForestAreaByExpansionAndRegenerationType: 'Всего площадь леса по расширению и восстановлению',
      categoryYear: 'Категория - Год',
      totalAreaOfForestByExpansionRegenerationType1000ha:
        'Всего площадь леса по типу расширения / восстановления (1000 га)',
      natural_expansion_and_natural_regeneration: 'Естественная экспансия и естественное восстановление',
      afforestation_and_regeneration_by_planting_and_or_seeding:
        'Лесоразведение и восстановление посадкой и/или посевом',
      coppice: 'Порослевое возобновление',
      forest: 'Лес - {{year}}',
    },

    // table 4.2b
    annualForestExpansionAndRegeneration: {
      annualForestExpansionAndRegeneration: 'Ежегодное расширение и восстановление леса',
      categoryYear: 'Категория - Год',
      annualForestExpansionAndRegeneration1000ha: 'Ежегодное расширение и восстановление леса (1000 га)',
      expansionOfForestArea: 'Расширение площади леса',
      regenerationOfForestArea: 'Восстановление площади леса',
      afforestation: 'Расширение: лесоразведение',
      afforestationExpansion: 'Лесоразведение',
      natural_expansion: 'Расширение: естественное расширение',
      naturalExpansion: 'Естественное расширение',
      natural_regeneration: 'Восстановление: естественное восстановление',
      naturalRegeneration: 'Естественное восстановление',
      planting_and_seeding: 'Восстановление: посадка насаждений и посев семян',
      plantingAndSeeding: 'Посадка насаждений и посев семян',
      coppice: 'Восстановление: порослевое возобновление',
      coppiceRegeneration: 'Порослевое возобновление',
      forest: 'Лес - {{year}}',
    },

    // table 4.3a
    naturalness: {
      naturalness: 'Естественность',
      categoryYear: 'Категория - Год',
      area1000ha: 'Площадь (1000 га)',
      undisturbed_by_man: 'Незатронутая человеком',
      semi_natural: 'Полуестественная',
      plantations: 'Плантации',
      forest: 'Лес - {{year}}',
      other_wooded_land: 'Прочая лесопокрытая земля - {{year}}',
      total_forest_and_other_wooded_land: 'Всего лес и прочая лесопокрытая земля - {{year}}',
    },

    // table 4.3b
    naturalnessBySubclasses: {
      naturalnessBySubclasses: 'Естественность по подклассам',
      categoryYear: 'Категория - Год',
      area1000ha: 'Площадь (1000 га)',
      semiNatural: 'Полуестественная площадь',
      plantations: 'Плантации',
      naturally_established: 'Полуестественные: естественно образовавшаяся',
      naturallyEstablished: 'Естественно образовавшаяся',
      naturalised_introduced_species: 'Полуестественные: натурализованные интродуцированные виды',
      naturalisedIntroducedSpecies: 'Натурализованные интродуцированные виды',
      established_by_planting_and_or_seeding: 'Полуестественные: образовавшаяся путем посадки саженцев и/или посева',
      establishedByPlantingAndOrSeeding: 'Образовавшаяся путем посадки саженцев и/или посева',
      coppice: 'Полуестественные: роща',
      coppiceSemiNatural: 'Роща',
      unknown_origin: 'Полуестественные: неизвестного происхождения',
      unknownOrigin: 'Неизвестного происхождения',
      native_species: 'Плантации: местные виды',
      nativeSpecies: 'Местные виды',
      introduced_species: 'Плантации: интродуцированные виды',
      introducedSpecies: 'Интродуцированные виды',
      forest: 'Лес - {{year}}',
    },

    // table 4.4a
    introducedTreeSpecies: {
      introducedTreeSpecies: 'Площадь насаждений с доминирующими интродуцированными видами деревьев',
      categoryYear: 'Категория - Год',
      areaOfStandsDominatedByIntroducedTreeSpecies1000ha:
        'Площадь насаждений с доминирующими интродуцированными видами деревьев (1000 га)',
      total: 'Всего',
      _of_which_invasive: '… в т. ч: инвазивные',
      forest: 'Лес - {{year}}',
      other_wooded_land: 'Прочая лесопокрытая земля - {{year}}',
      total_forest_and_other_wooded_land: 'Всего лес и прочая лесопокрытая земля - {{year}}',
    },

    // table 4.4b
    introducedTreeSpecies4_4b: {
      introducedTreeSpecies4_4b: 'Интродуцированные виды деревьев',
      category: 'Категория',
      scientificNameOfIntroducedTreeSpecies: 'Научное название интродуцированного вида деревьев',
      forestAreaOccupied1000Ha: 'Занятая площадь леса (1000 га)',
      _01: 'Интродуцированный вид деревьев 1',
      _02: 'Интродуцированный вид деревьев 2',
      _03: 'Интродуцированный вид деревьев 3',
      _04: 'Интродуцированный вид деревьев 4',
      _05: 'Интродуцированный вид деревьев 5',
      _06: 'Интродуцированный вид деревьев 6',
      _07: 'Интродуцированный вид деревьев 7',
      _08: 'Интродуцированный вид деревьев 8',
      _09: 'Интродуцированный вид деревьев 9',
      _10: 'Интродуцированный вид деревьев 10',
      _11: 'Интродуцированный вид деревьев 11',
      _12: 'Интродуцированный вид деревьев 12',
      _13: 'Интродуцированный вид деревьев 13',
      _14: 'Интродуцированный вид деревьев 14',
      _15: 'Интродуцированный вид деревьев 15',
      _16: 'Интродуцированный вид деревьев 16',
      _17: 'Интродуцированный вид деревьев 17',
      _18: 'Интродуцированный вид деревьев 18',
      _19: 'Интродуцированный вид деревьев 19',
      _20: 'Интродуцированный вид деревьев 20',
      scientific_name_of_introduced_tree_species: 'Научное название интродуцированного вида деревьев',
      forest_area_occupied_2005: 'Занятая площадь леса (1000 га) - 2005',
      forest_area_occupied_2010: 'Занятая площадь леса (1000 га) - 2010',
      forest_area_occupied_2015: 'Занятая площадь леса (1000 га) - 2015',
    },

    // table 4.4c
    invasiveTreeSpecies: {
      invasiveTreeSpecies: 'Инвазивные виды деревьев',
      category: 'Категория',
      scientificNameOfInvasiveTreeSpecies: 'Научное название инвазивного вида деревьев',
      forestAreaAffected1000Ha: 'Пораженная площадь леса (1000 га)',
      _01: 'Инвазивный вид деревьев 1',
      _02: 'Инвазивный вид деревьев 2',
      _03: 'Инвазивный вид деревьев 3',
      _04: 'Инвазивный вид деревьев 4',
      _05: 'Инвазивный вид деревьев 5',
      _06: 'Инвазивный вид деревьев 6',
      _07: 'Инвазивный вид деревьев 7',
      _08: 'Инвазивный вид деревьев 8',
      _09: 'Инвазивный вид деревьев 9',
      _10: 'Инвазивный вид деревьев 10',
      _11: 'Инвазивный вид деревьев 11',
      _12: 'Инвазивный вид деревьев 12',
      _13: 'Инвазивный вид деревьев 13',
      _14: 'Инвазивный вид деревьев 14',
      _15: 'Инвазивный вид деревьев 15',
      _16: 'Инвазивный вид деревьев 16',
      _17: 'Инвазивный вид деревьев 17',
      _18: 'Инвазивный вид деревьев 18',
      _19: 'Инвазивный вид деревьев 19',
      _20: 'Инвазивный вид деревьев 20',
      scientific_name_of_invasive_tree_species: 'Научное название инвазивного вида деревьев',
      forest_area_affected_2005: 'Пораженная площадь леса (1000 га) - 2005',
      forest_area_affected_2010: 'Пораженная площадь леса (1000 га) - 2010',
      forest_area_affected_2015: 'Пораженная площадь леса (1000 га) - 2015',
    },

    // table 4.5
    deadwood: {
      deadwood: 'Мертвая древесина',
      categoryYear: 'Категория - Год',
      volumeOfDeadwoodM3Ha: 'Запас мертвой древесины (м³/га)',
      total: 'Всего',
      standing: 'Сухостой',
      lying: 'Валеж',
      forest: 'Лес - {{year}}',
      other_wooded_land: 'Прочая лесопокрытая земля - {{year}}',
      total_forest_and_other_wooded_land: 'Всего лес и прочая лесопокрытая земля - {{year}}',
      volumeOfDeadwoodInFOWLBySpeciesGroups:
        'Запас мертвой древесины в лесе и прочей лесопокрытой земле по группам пород',
      coniferous: 'Хвойные - {{year}}',
      broadleaved: 'Лиственные - {{year}}',
    },

    // table 4.8
    threatenedForestSpecies: {
      threatenedForestSpecies: 'Лесные виды под угрозой исчезновения',
      categoryYear: 'Категория - Год',
      threatenedForestSpeciesCol: 'Лесные виды под угрозой исчезновения',
      absoluteNumber: 'Абсолютное количество',
      total_of_taxa: 'Всего таксоны',
      vulnerable: 'Уязвимые',
      endangered: 'Находящиеся в опасности',
      critically_endangered: 'Находящиеся в критической опасности',
      extinct_in_the_wild: 'Вымершие в естественной среде',
      trees: 'Деревья - {{year}}',
      birds: 'Птицы - {{year}}',
      mammals: 'Млекопитающие - {{year}}',
      other_vertebrates: 'Другие позвоночные - {{year}}',
      invertebrates: 'Беспозвоночные - {{year}}',
      vascular_plants: 'Сосудистые растения - {{year}}',
      cryptogams_and_fungi: 'Споровые растения и грибки - {{year}}',
    },

    // table 4.9
    protectedForests: {
      protectedForests: 'Охраняемые леса',
      categoryYear: 'Категория - Год',
      ha1000: '1000 га',
      mcpfe_class_1_1: 'MCPFE Класс 1.1',
      mcpfe_class_1_2: 'MCPFE Класс 1.2',
      mcpfe_class_1_3: 'MCPFE Класс 1.3',
      mcpfe_class_2: 'MCPFE Класс 2',
      forest: 'Лес - {{year}}',
      other_wooded_land: 'Прочая лесопокрытая земля - {{year}}',
      total_forest_and_other_wooded_land: 'Всего лес и прочая лесопокрытая земля - {{year}}',
    },

    // table 5.1
    protectiveForestsSoilWaterAndOtherEcosystemFunctions: {
      protectiveForestsSoilWaterAndOtherEcosystemFunctions:
        'Защитные леса – почва, вода и другие экосистемные функции; инфраструктура и управляемые природные ресурсы',
      categoryYear: 'Категория - Год',
      protectiveForestsMCPFEClass31000ha: 'Защитные леса – класс 3 MCPFE (1000 гa)',
      soil_water_and_other_forest_ecosystem_functions: 'Почва, вода и другие лесные экосистемные функции',
      infrastructure_and_managed_natural_resources: 'Инфраструктура и управляемые природные ресурсы',
      total: 'Всего',
      forest: 'Лес - {{year}}',
      other_wooded_land: 'Прочая лесопокрытая земля - {{year}}',
      total_forest_and_other_wooded_land: 'Всего лес и прочая лесопокрытая земля - {{year}}',
    },

    // table 6.1
    forestHoldings: {
      forestHoldings: 'Лесовладения',
      categoryYear: 'Категория - Год',
      areaAndNumberOfForestHoldingsInSizeClasses: 'Площадь и кол-во лесовладений, классифицированные по размеру',
      less10ha: '≤ 10 га',
      _11_500ha: '11 - 500 га',
      more500ha: '≥ 500 га',
      total_forest_area: 'Всего площадь леса (1000 га)',
      total_number_of_holdings: 'Всего кол-во лесовладений',
      less_10_ha_area: '≤ 10 га: площадь (1000 га)',
      less_10_ha_number: '≤ 10 га: кол-во лесовладений',
      _11_500_ha_area: '11 - 500 га: площадь (1000 га)',
      _11_500_ha_number: '11 - 500 га: кол-во лесовладений',
      more_500_ha_area: '≥ 500 га: площадь (1000 га)',
      more_500_ha_number: '≥ 500 га: кол-во лесовладений',
      area1000Ha: 'Площадь (1000 га)',
      numberOfHoldings: 'Кол-во лесовладений',
      in_public_ownership: 'В общественной собственности - {{year}}',
      in_private_ownership: 'В частной собственности - {{year}}',
      other_types_of_ownership_unknown: 'Другие типы собственности / Неизвестно - {{year}}',
    },

    // table 6.2
    grossValueAdded: {
      grossValueAdded: 'Валовая добавленная стоимость',
      categoryYear: 'Категория - Год',
      grossValueAddedCol: 'Валовая добавленная стоимость',
      million_national_currency: 'Миллион единиц национальной валюты',
      percent_of_total_gva: '% всей ВДС',
      forestry: 'Лесное хозяйство (ISIC/NACE 02) - {{year}}',
      manufacture_of_wood_and_articles_in_wood:
        'Производство древесины и изделий из древесины (ISIC/NACE 16) - {{year}}',
      manufacture_of_paper_and_paper_products: 'Производство бумаги и бумажной продукции (ISIC/NACE 17) - {{year}}',
    },

    // table 6.3
    factorIncomeAndEntrepreneurialIncome: {
      factorIncomeAndEntrepreneurialIncome: 'Доход от факторов производства и предпринимательский доход',
      categoryYear: 'Категория - Год',
      millionNationalCurrency: 'Миллион единиц национальной валюты',
      factor_income: 'Доход от факторов производства',
      net_operating_surplus: 'Чистый предпринимательский доход',
      forestry: 'Лесное хозяйство (ISIC/NACE 02) - {{year}}',
    },

    // table 6.4a
    totalGrossFixedCapitalFormationInForestsAndForestry: {
      totalGrossFixedCapitalFormationInForestsAndForestry:
        'Валовое накопление основного капитала в лесах и лесном хозяйстве',
      categoryYear: 'Категория - Год',
      grossFixedCapitalFormationMillionNationalCurrency: 'Валовое накопление основного капитала (млн ед. нац. валюты)',
      plantingOfTreesToProvideRegularIncome: 'Посадка деревьев для обеспечения регулярного дохода',
      equipmentAndBuildings: 'Оборудование и здания',
      otherGrossFixedCapitalFormation: 'Прочее валовое накопление основного капитала',
      total: 'Всего',
      forestry_isic_nace_02: 'Лесное хозяйство (ISIC/NACE 02) - {{year}}',
      planting_of_trees_to_provide_regular_income: 'Посадка деревьев для обеспечения регулярного дохода',
      equipment_and_buildings: 'Оборудование и здания',
      other_gross_fixed_capital_formation: 'Прочее валовое накопление основного капитала',
    },

    // table 6.4b
    totalFixedCapitalConsumptionInForestsAndForestry: {
      totalFixedCapitalConsumptionInForestsAndForestry:
        'Общее потребление основного капитала в лесах и лесном хозяйстве',
      categoryYear: 'Категория - Год',
      fixedCapitalConsumptionMillionNationalCurrency: 'Потребление основного капитала (млн ед. нац. валюты)',
      fixed_capital_consumption: 'Потребление основного капитала',
      forestry_isic_nace_02: 'Лесное хозяйство (ISIC/NACE 02) - {{year}}',
    },

    // table 6.4c
    totalCapitalTransfersInForestsAndForestry: {
      totalCapitalTransfersInForestsAndForestry: 'Общие капитальные трансферты в лесах и лесном хозяйстве',
      categoryYear: 'Категория - Год',
      capitalTransfersMillionNationalCurrency: 'Капитальные трансферты (млн ед. нац. валюты)',
      capital_transfers: 'Капитальные трансферты',
      forestry_isic_nace_02: 'Лесное хозяйство (ISIC/NACE 02) - {{year}}',
    },

    // table 6.5a
    employmentByGenderAndAge: {
      employmentByGenderAndAge: 'Занятость по полу и возрасту',
      categoryYear: 'Категория - Год',
      total: 'Всего',
      gender: 'Пол',
      ageGroup: 'Возрастная группа',
      male: 'Мужской',
      female: 'Женский',
      _15_49: '15-49',
      _50_: '50+',
      _1000Persons: '1000 человек',
      forestry: 'Лесное хозяйство (ISIC/NACE 02) - {{year}}',
      manufacture_of_wood_and_articles_in_wood:
        'Производство древесины и изделий из древесины (ISIC/NACE 16) - {{year}}',
      manufacture_of_paper_and_paper_products: 'Производство бумаги и бумажной продукции (ISIC/NACE 17) - {{year}}',
      gender_male: 'Пол: мужской',
      gender_female: 'Пол: женский',
      age_group_15_49: 'Возрастная группа: 15-49',
      age_group_50_plus: 'Возрастная группа: 50+',
    },

    // table 6.5b
    employmentByEducationAndJobCharacteristics: {
      employmentByEducationAndJobCharacteristics: 'Занятость по образованию и характеристикам работы',
      categoryYear: 'Категория - Год',
      education: 'Образование (Категории МСКО 1997)',
      jobCharacteristics: 'Характеристики работы',
      _0_2: '0-2',
      _3_4: '3-4',
      _5_6: '5-6',
      _1000Persons: '1000 человек',
      education_0_2: 'Образование (Категории МСКО 1997): 0-2',
      education_3_4: 'Образование (Категории МСКО 1997): 3-4',
      education_5_6: 'Образование (Категории МСКО 1997): 5-6',
      employees: 'Характеристики работы: работники',
      employeesJobCharacteristics: 'Работники',
      self_employed: 'Характеристики работы: самозанятые',
      selfEmployed: 'Cамозанятые',
      forestry: 'Лесное хозяйство (ISIC/NACE 02) - {{year}}',
      manufacture_of_wood_and_articles_in_wood:
        'Производство древесины и изделий из древесины (ISIC/NACE 16) - {{year}}',
      manufacture_of_paper_and_paper_products: 'Производство бумаги и бумажной продукции (ISIC/NACE 17) - {{year}}',
    },

    // table 6.6
    occupationalAccidents: {
      occupationalAccidents: 'Несчастные случаи на производстве',
      categoryYear: 'Категория - Год',
      fatalOccupationalAccidents: 'Несчастные случаи с летальным исходом',
      nonFatalOccupationalAccidents: 'Несчастные случаи без летального исхода',
      number: 'Число',
      annualRatePer1000Workers: 'Среднее число на 1000 рабочих',
      fatal_occupational_accidents_number: 'Несчастные случаи с летальным исходом: число',
      fatal_occupational_accidents_per_1000_workers:
        'Несчастные случаи с летальным исходом: среднее число на 1000 рабочих',
      non_fatal_occupational_accidents_number: 'Несчастные случаи без летального исхода: число',
      non_fatal_occupational_accidents_per_1000_workers:
        'Несчастные случаи без летального исхода: среднее число на 1000 рабочих',
      forestry_isic_nace_02: 'Лесное хозяйство (ISIC/NACE 02) - {{year}}',
    },

    // table 6.7
    woodConsumption: {
      woodConsumption: 'Потребление древесины',
      category: 'Категория',
      woodConsumption1000M3RWE: 'Потребление древесины (1000 м³ эквивалента круглого леса)',
      _1992: '1992',
      _1993: '1993',
      _1994: '1994',
      _1995: '1995',
      _1996: '1996',
      _1997: '1997',
      _1998: '1998',
      _1999: '1999',
      _2000: '2000',
      _2001: '2001',
      _2002: '2002',
      _2003: '2003',
      _2004: '2004',
      _2005: '2005',
      _2006: '2006',
      _2007: '2007',
      _2008: '2008',
      _2009: '2009',
      _2010: '2010',
      _2011: '2011',
      _2012: '2012',
      _2013: '2013',
      _2014: '2014',
      _2015: '2015',
      _2016: '2016',
      _2017: '2017',
      wood_consumption: 'Потребление древесных продуктов',
    },

    // table 6.8
    tradeInWood: {
      tradeInWood: 'Торговля древесиной',
      category: 'Категория',
      _1992: '1992',
      _1993: '1993',
      _1994: '1994',
      _1995: '1995',
      _1996: '1996',
      _1997: '1997',
      _1998: '1998',
      _1999: '1999',
      _2000: '2000',
      _2001: '2001',
      _2002: '2002',
      _2003: '2003',
      _2004: '2004',
      _2005: '2005',
      _2006: '2006',
      _2007: '2007',
      _2008: '2008',
      _2009: '2009',
      _2010: '2010',
      _2011: '2011',
      _2012: '2012',
      _2013: '2013',
      _2014: '2014',
      _2015: '2015',
      _2016: '2016',
      _2017: '2017',
      exports_of_forest_products_quantity: 'Экспорт древесных продуктов (млн м³ эквивалента круглого леса)',
      exports_of_forest_products_value: 'Экспорт древесных продуктов (млн евро/ЭКЮ)',
      imports_of_forest_products_quantity: 'Импорт древесных продуктов (млн м³ эквивалента круглого леса)',
      imports_of_forest_products_value: 'Импорт древесных продуктов (млн евро/ЭКЮ)',
    },

    // table 6.9
    totalEnergySupplyFromWood: {
      totalEnergySupplyFromWood: 'Всего энергии из древесины',
      category: 'Категория',
      tj: 'ТДж',
      _1000_metric_tonnes_dry_matter: '1000 метрических тонн сухого вещества',
      total_primary_energy_supply: 'Всего первичной энергии',
      total_renewable_energy_supply: 'Всего возобновляемой энергии',
      total_energy_supply_from_wood: 'Всего энергии из древесины:',
      energy_from_direct_wood_fibre_sources: '- Энергия из источников прямого древесного волокна:',
      of_which_from_forests: 'в т.ч. с лесов:',
      of_which_from_other_wooded_land: 'в т. ч. с  прочих лесопокрытых  земель и других земель (деревья вне лесов):',
      energy_from_co_products:
        '- Энергия из побочных продуктов и древесных отходов деревообрабатывающей промышленности:',
      of_which_solid_residues:
        'в т. ч. твердые отходы (щепа, стружка, древесные отходы, кора, исключая топливо из переработанной древесины):',
      energy_from_processed_wood_based_fuels:
        '- Энергия от топлива из переработанной древесины (древесные гранулы, брикеты, древесный уголь):',
      of_which_imported: 'в т. ч. импортируемая',
      energy_from_post_consumer_recovered_wood: '- Энергия от бывшей в употреблении рекуперированной древесины',
      energy_from_unknown_unspecified_sources: '- Энергия из неизвестных/неуказанных источников',
      tj_2007: '2007: ТДж',
      tj_2009: '2009: ТДж',
      tj_2011: '2011: ТДж',
      tj_2013: '2013: ТДж',
      tj_2015: '2015: ТДж',
      _1000_metric_tonnes_dry_matter_2007: '2007: 1000 метрических тонн сухого вещества',
      _1000_metric_tonnes_dry_matter_2009: '2009: 1000 метрических тонн сухого вещества',
      _1000_metric_tonnes_dry_matter_2011: '2011: 1000 метрических тонн сухого вещества',
      _1000_metric_tonnes_dry_matter_2013: '2013: 1000 метрических тонн сухого вещества',
      _1000_metric_tonnes_dry_matter_2015: '2015: 1000 метрических тонн сухого вещества',
    },

    // table 6.10a
    accessibilityForRecreation: {
      accessibilityForRecreation: 'Доступность для рекреации',
      categoryYear: 'Категория - Год',
      areaAvailableForPublicRecreation: 'Площадь с общественным доступом в рекреационных целях',
      total1000Ha: 'Всего (1000 га)',
      _oftotal: '% от общей площади',
      areaPrimarilyDesignatedOrManagedForPublicRecreation:
        'Площадь, предназначенная или управляемая, в первую очередь, для общественной рекреации',
      area_available_for_public_recreation_total:
        'Площадь с общественным доступом в рекреационных целях: всего (1000 га)',
      area_available_for_public_recreation_percent:
        'Площадь с общественным доступом в рекреационных целях: % от общей площади',
      area_designated_or_managed_for_public_recreation_total:
        'Площадь, предназначенная или управляемая, в первую очередь, для общественной рекреации: всего (1000 га)',
      area_designated_or_managed_for_public_recreation_percent:
        'Площадь, предназначенная или управляемая, в первую очередь, для общественной рекреации: % от общей площади',
      total_forest_and_other_wooded_land: 'Всего лес и прочая лесопокрытая земля - {{year}}',
    },

    // table 6.10b
    intensityOfUse: {
      intensityOfUse: 'Интенсивность использования',
      categoryYear: 'Категория - Год',
      annualNumberOfVisitsMillion: 'Ежегодное число посещений (млн)',
      areaAvailableForPublicRecreation: 'Площадь с общественным доступом в рекреационных целях',
      areaPrimarilyDesignatedAndOrManagedForPublicRecreation:
        'Площадь, предназначенная или управляемая, в первую очередь, для общественной рекреации',
      total_forest_and_other_wooded_land: 'Всего лес и прочая лесопокрытая земля - {{year}}',
      area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях',
      area_designated_and_or_managed_for_public_recreation:
        'Площадь, предназначенная или управляемая, в первую очередь, для общественной рекреации',
    },

    // table 6.10c
    recreationFacilities: {
      recreationFacilities: 'Рекреационные объекты',
      categoryYear: 'Категория - Год',
      forestRoadsAndPathsAvailableForPublicRecreation:
        'Лесные дороги и тропы, доступные для общественных рекреационных целей',
      _ofWhichDesignatedForHikingBikingCrossCountrySkiingEtc:
        '… в т. ч. предназначенные для походов, езды на велосипеде, беговых лыжах, и т.д.',
      facilityLengthIn1000Km: 'Объект (протяжённость в 1000 км)',
      area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях - {{year}}',
      forest_roads_and_paths_available_for_public_recreation:
        'Лесные дороги и тропы, доступные для общественных рекреационных целей',
      _of_which_designated_for_hiking_biking_cross_country_skiing_etc:
        '… в т. ч. предназначенные для походов, езды на велосипеде, беговых лыжах, и т.д.',
    },

    // table 6.10d
    otherRecreationFacilitiesPilotReporting2015: {
      otherRecreationFacilitiesPilotReporting2015:
        'Другие объекты для рекреации - экспериментальная отчетность (2015 год)',
      category: 'Категория',
      facility: 'Объект',
      measurement_unit: 'Единица измерения',
      extent_multiplicity: 'Протяженность / многочисленность',
      facility_category: 'Категория объекта',
      no1_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 1',
      no2_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 2',
      no3_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 3',
      no4_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 4',
      no5_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 5',
      no6_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 6',
      no7_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 7',
      no8_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 8',
      no9_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 9',
      no10_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 10',
      no11_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 11',
      no12_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 12',
      no13_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 13',
      no14_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 14',
      no15_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 15',
      no16_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 16',
      no17_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 17',
      no18_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 18',
      no19_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 19',
      no20_area_available_for_public_recreation: 'Площадь с общественным доступом в рекреационных целях 20',
    },
  },
}
