const area = require('./ru/area')

module.exports.translation = {
  area,

  language: {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    ru: 'Русский',
  },

  common: {
    fraPlatform: 'Платформой ОЛР',
    globalFRA: 'Глобальная оценка лесных ресурсов',
    login: 'Логин',
    statisticalFactsheets: 'Статистические бюллетени',
    dataExport: 'Экспорт данных',
    selectAll: 'Выделить все',
    unselectAll: 'Снять выделение',
    variable: 'ОЛР Переменная',
    column: 'Столбец',
    other: 'Другое',
    select: 'Select',
    selectArea: 'Select geographical area',
    unknown: 'Отсутствует/неизвестна',
  },

  unit: {
    haThousand: '1000 га',
    ha: 'га',
    kmSq: 'кв. км (км²)',
    mileSq: 'кв. миль',
    acre1000: '1000 акров',
    acre: 'акр',
    haMillion: 'млн. га',
    haThousandPerYear: '1000 га/год',
    tonnesPerHa: 'тонн/га',
    millionsCubicMeterOverBark: 'млн. м³ с корой',
  },

  countrySelection: {
    selectCountry: 'Выберите страну',
  },

  definition: {
    definitionLabel: 'См. определения',
    faqLabel: 'Часто задаваемые вопросы',
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
      reviewer: 'Рецензент',
      reviewer_0: 'Рецензент',
      reviewer_1: 'Рецензента',
      reviewer_2: 'Рецензентов',
      nationalCorrespondent: 'Национальный корреспондент',
      nationalCorrespondent_0: 'Национальный корреспондент',
      nationalCorrespondent_1: 'Национальных корреспондента',
      nationalCorrespondent_2: 'Национальных корреспондентов',
      alternateNationalCorrespondent: 'Помощник национального корреспондента',
      alternateNationalCorrespondent_0: 'Помощник национального корреспондента',
      alternateNationalCorrespondent_1: 'Помощника национального корреспондента',
      alternateNationalCorrespondent_2: 'Помощников национального корреспондента',
      collaborator: 'Сотрудник',
      collaborator_0: 'Сотрудник',
      collaborator_1: 'Сотрудника',
      collaborator_2: 'Сотрудников',
      administrator: 'Администратор',
      noRole: 'Нет сведений',
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

  landing: {
    home: 'Главная',
    sections: {
      overview: 'Обзор',
      messageBoard: 'Доска сообщений',
      about: 'Информация об ОЛР',
      recentActivity: 'Недавняя активность',
      userManagement: 'Координировать сотрудников',
      externalData: 'Внешние данные',
      links: 'Ссылки и хранилище данных',
    },
    overview: {
      loadingMap: 'Загрузка карты…',
      withFinancialSupportOf: 'При финансовой поддержке ',
    },
    milestones: {
      milestones: 'Этапы работ',
      milestone1: 'Глобальное совещание национальных корреспондентов',
      milestone2: 'Региональные и субрегиональные семинары',
      milestone3: 'Крайний срок представления страновых докладов',
      milestone4: 'Утверждение заключительных страновых докладов',
      milestone5: 'Предварительные результаты ОЛР–2020',
      milestone6: 'Основной доклад ОЛР–2020',
      milestone7: 'Анализ данных и подготовка доклада',
      milestone8: 'Запуск платформы для анализа и распространения данных',
      date1: 'Март',
      date2: 'Апрель – Сентябрь',
      date3: 'Октябрь',
      date4: 'Январь – Февраль',
      date5: 'Март',
      date6: 'Июль',
      date7: 'Март - Декабрь',
      date8: 'Август',
    },
    users: {
      users: 'Контакты',
      message: 'Сообщение',
    },
    about: {
      contact: 'Контакт',
      seniorForestryOfficer: 'Старший специалист по лесному хозяйству',
      faoForestryDepartment: 'Департамент лесного хозяйства ФАО',
      email: 'Электронная почта',
      fraProcess:
        'С 1946 года ФАО осуществляет мониторинг мировых лесов с периодичностью 5-10 лет. Современные Глобальные оценки лесных ресурсов (ОЛР) подготавливаются каждые пять лет с целью обеспечения последовательного подхода к описанию мировых лесов и их изменений.Оценка основывается на двух главных источниках данных: страновые доклады, подготовленные национальными корреспондентами и дистанционное зондирование, проводимое ФАО совместно с национальными координаторами и региональными партнерами.   Масштаб ОЛР регулярно изменяется со времени проведения первой оценки, опубликованной в 1948 году. Данные оценки создают историю глобальных лесных интересов, как с точки зрения основного содержания, так и их меняющегося масштаба.',
      linkFraProcess: 'Более подробная информация о процессе ОЛР',
      or: 'Или',
    },
    recentActivity: {
      noRecentActivityTitle: 'Нет недавней активности',
      noRecentActivityBody:
        'Здесь отразятся изменения, сделанные на платформе, чтобы Вы могли быстрее разобраться, что происходило во время Вашего отсутствия.',
      getStarted: 'Начать',
      actions: {
        added: 'добавил',
        addedFile: 'добавил {{file}}',
        commented: 'оставил комментарий к',
        deleted: 'удалил',
        deletedFile: 'удалил {{file}}',
        edited: 'отредактировал',
        resolved: 'разрешил проблему в',
        status: 'изменил статус на',
        addUser: 'добавил {{user}} как {{role}}', // Legacy, no longer created
        updateUser: 'отредактировал {{user}}',
        removeUser: 'удалил {{user}}',
        acceptInvitation: 'присоединился как {{role}}',
        addInvitation: 'пригласил {{user}} как {{role}}',
        removeInvitation: 'удалил приглашение от {{user}} как {{role}}',
        updateInvitation: 'приглашение обновлено для {{user}} как {{role}}',
        updateAssessmentStatus: 'изменил статус с {{assessment}} на {{status}}',
      },
      fraProcess:
        'С 1946 года ФАО осуществляет мониторинг мировых лесов с периодичностью 5-10 лет. Современные Глобальные оценки лесных ресурсов (ОЛР) подготавливаются каждые пять лет с целью обеспечения последовательного подхода к описанию мировых лесов и их изменений.Оценка основывается на двух главных источниках данных: страновые доклады, подготовленные национальными корреспондентами и дистанционное зондирование, проводимое ФАО совместно с национальными координаторами и региональными партнерами.   Масштаб ОЛР регулярно изменяется со времени проведения первой оценки, опубликованной в 1948 году. Данные оценки создают историю глобальных лесных интересов, как с точки зрения основного содержания, так и их меняющегося масштаба.',
      linkFraProcess: 'Более подробная информация о процессе ОЛР',
    },
    links: {
      links: 'Ссылки',
      unfcccFocalPoints: 'Список координаторов РКИКООН',
      sdgFocalPoints: 'Список национальных координаторов ЦУР',
      reddPortal: 'Спутниковые системы мониторинга земель (SLMS), предоставленные программой UN-REDD/ФАО',
      fraGeoSpatialTools: 'Геопространственные инструменты ОЛР',
      repository: 'Хранилище данных',
      uploadFile: 'Загрузить файл',
      confirmDelete: 'Удалить {{file}}? Его невозможно будет восстановить.',
    },
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
      sendFeedback: 'Направить отзыв',
      feedbackEmailSubject: 'Обратная связь с платформой ОЛР',
      platformVersion: 'Версия платформы',
      userAgent: 'Агент пользователя',
      user: 'Пользователь',
      manageCollaborators: 'Координировать сотрудников',
      userGuide: 'Руководство пользователя',
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
    submit: 'Представить на рассмотрение',
    cancel: 'Отмена',
    changeStatusTextPlaceholder: 'Добавить комментарий по выбору',
    doNotNotifyUsers: 'Не уведомлять пользователей',
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
    add: 'Добавить',
    cancel: 'Отмена',
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
    reclassification: 'Реклассификация в категории ОЛР-2020',
  },

  nationalDataPoint: {
    clickOnNDP: 'Нажмите на год, чтобы получить доступ к исходным данным',
    nationalDataPoint: 'Национальный отчетный год',
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
    copyPreviousValues: 'Копировать предыдущие значения',
    nationalClass: 'Национальный класс',
    nationalClasses: 'Классификации и определения',
    definition: 'Определение',
    fraClasses: 'Классы ОЛР',
    class: 'Класс',
    area: 'Площадь (1000 га)',
    total: 'Итого',
    delete: 'Удалить',
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
      other: 'Другое (указать в комментариях)',
    },
    appliesToVariablesOptions: {
      forest: 'Леса',
      otherWoodedLand: 'Прочие лесопокрытые земли',
      otherLand: 'Другие земельные площади',
    },
  },

  userManagement: {
    manageCollaborators: 'Координировать сотрудников',
    name: 'Имя',
    role: 'Роль',
    email: 'Электронная почта',
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
    all: 'Все',
    none: 'Ни одна',
  },

  extentOfForest: {
    extentOfForest: 'Площадь лесов и прочих лесопокрытых земель',
    estimationAndForecasting: 'Оценка и прогнозирование',
    categoryHeader: 'Категории ОЛР',
    areaUnitLabel: 'Площадь (1000 га)',
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
    forestAreaDoesNotMatchPreviouslyReported: 'Площадь лесов не совпадает с площадью ОЛР-2015: {{previous}}',
    useOriginalDataPoints: 'Использовать национальные отчетные годы',
    dontUseOriginalDataPoints: 'Не использовать национальные отчетные годы',
    whatIsThis: 'Что это такое?',
    tableNoticeMessage: 'Данные ФАОСТАТ о площади земель за 2015 год используются для всех отчетных лет',
    ndpMissingValues: 'Национальный отчетный год имеет отсутствующие значения',
    showNDPs: 'Показать национальные отчетные годы',
    hideNDPs: 'Скрыть национальные отчетные годы',
  },

  climaticDomain: {
    climaticDomain: 'Климатическая зона',
    percentOfForestArea2015: '% площади лесов 2015',
    percentOfForestArea2015Override: 'Переопределить значение',
    selectDefault: 'По умолчанию',
    boreal: 'Бореальная',
    temperate: 'Умеренная',
    subtropical: 'Субтропическая',
    tropical: 'Тропическая',
  },

  forestCharacteristics: {
    forestCharacteristics: 'Характеристики лесов',
    estimationAndForecasting: 'Оценка и прогнозирование',
    categoryHeader: 'Категории ОЛР',
    areaUnitLabel: 'Площадь лесов (1000 га)',
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
    clearTable: 'Очистить таблицу',
    copyToClipboard: 'Скопировать значения',
    placeholderSelect: 'Оценка и прогнозирование',
    _1000haYear: '1000 га/год',
  },

  forestAreaChange: {
    forestAreaChange: 'Годовое расширение лесов, обезлесение и чистое изменение',
    categoryHeader: 'Категории ОЛР',
    areaUnitLabel: 'Площадь лесов (1000 га/год)',
    forestExpansion: 'Расширение лесов',
    ofWhichAfforestation: '…в том числе лесоразведение',
    ofWhichNaturalExpansion: '…в том числе естественное расширение лесов',
    deforestation: 'Обезлесение',
    forestAreaNetChange: 'Чистое изменение лесной площади',
    netChangeDoesNotMatch: 'Не совпадает с Чистым изменением лесной площади',
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
    other: 'Другое (указать в комментариях)',
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
    other: 'Другое (указать в комментариях)',
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
    fra2020: 'ОЛР-2020',
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
    },
  },

  multiSelect: {
    placeholder: 'Выбрать…',
  },

  generalValidation: {
    subCategoryExceedsParent: 'Подкатегория превышает родительскую категорию',
    forestAreaDoesNotMatchExtentOfForest: 'Не совпадает с "Площадь лесов" (1a)',
    forestAreaExceedsExtentOfForest: 'Превышает "Площадь лесов" (1a)',
    otherLandExceedsExtentOfForest: 'Превышает "Другие земельные площади" (1a)',
    valueMustBePositive: 'Значение должно быть больше нуля',
    emptyField: 'Пустое поле',
    mustBeEqualToTotalGrowingStock: 'Значение должно равняться Общему запасу древостоя (2a)',
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
    chooseProfilePicture: 'Выбрать картинку',
    name: 'Имя',
    role: 'Роль',
    email: 'Электронная почта',
    loginEmail: 'Логин',
    institution: 'Учреждение',
    position: 'Должность',
    done: 'Сохранить',
    cancel: 'Отмена',
    deactivate: 'Деактивировать',
    activate: 'Активировать',
    picture1MbMax: 'Картинка в профиле не может превышать 1MB',
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
    },
  },

  admin: {
    admin: 'Администратор',
    filter: 'Фильтровать по',
    language: 'Язык',
    country: 'Страна',
    invitationPending: 'Приглашение в стадии рассмотрения',
  },

  countryMessageBoard: {
    messageBoard: 'Доска сообщений',
    messageBoardDesc: 'Оставленные здесь сообщения видны всем участникам от страны',
    oneToOneMessages: 'Личные сообщения',
  },

  fraReportPrint: {
    title: 'Доклад ОЛР–2020',
    titleTables: 'Таблицы отчетности для ОЛР–2020',
    tableOfContent: 'Содержание',
    disclaimer: `С 1946 года ФАО осуществляет мониторинг мировых лесов каждые 5-10 лет. Глобальные оценки лесных ресурсов (ОЛР) в настоящее время подготавливаются каждые пять лет в попытке обеспечения последовательного подхода к описанию лесов мира и их изменений. ОЛР представляет собой процесс, осуществляемый по инициативе стран, и оценки основываются на докладах, подготовленных официально назначенными национальными корреспондентами. Если доклад отсутствует, секретариат ОЛР подготавливает кабинетное исследование с использованием предыдущих докладов, имеющейся информации и/или результатов анализа на основе дистанционного зондирования.`,
    disclaimerGenerated: `Настоящий документ был подготовлен автоматически с использованием доклада, представленного в качестве вклада в Глобальную оценку лесных ресурсов ФАО 2020 года, и представлен ФАО в качестве официального правительственного документа. Ответственность за содержание и мнения, выраженные в настоящем докладе, несет орган, представляющий доклад ФАО. ФАО не может нести ответственность за любое использование информации, содержащейся в настоящем документе.`,
    disclaimerGeneratedDeskStudy: `Этот документ был подготовлен автоматически на основе кабинетного исследования. ФАО не может нести ответственность за любое использование информации, содержащейся в настоящем документе.`,
  },
}
