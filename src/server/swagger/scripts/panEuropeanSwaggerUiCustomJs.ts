export const panEuropeanSwaggerUiCustomJs = String.raw`
(function () {
  const PARAMS = {
    table: 'tableNames[]',
    variables: 'variables[]',
    columns: 'columns[]',
  }

  const state = {
    ready: false,
    tableOptions: {},
    allVariables: [],
    allColumns: [],
  }

  const toArray = (list) => Array.prototype.slice.call(list)

  const selectorsForParam = (paramName) => [
    '[name="' + paramName + '"]',
    '[name="' + paramName + '[]"]',
    '[data-param-name="' + paramName + '"] select',
    '[data-param-name="' + paramName + '"] input',
    '[data-param-name="' + paramName + '[]"] select',
    '[data-param-name="' + paramName + '[]"] input',
    'input[aria-label="' + paramName + '"]',
    'select[aria-label="' + paramName + '"]',
    'input[aria-label="' + paramName + '[]"]',
    'select[aria-label="' + paramName + '[]"]',
    '[placeholder="' + paramName + '"]',
    '[placeholder="' + paramName + '[]"]',
  ]

  const findParamInputs = (paramName, root = document) => {
    const seen = new Set()
    const result = []
    selectorsForParam(paramName).forEach((sel) => {
      toArray(root.querySelectorAll(sel)).forEach((node) => {
        if (seen.has(node)) return
        seen.add(node)
        result.push(node)
      })
    })
    return result
  }

  const getSystem = () => (window.ui && window.ui.getSystem ? window.ui.getSystem() : null)

  const loadSpecParts = () => {
    const system = getSystem()
    if (!system || !system.specSelectors || !system.specSelectors.specJson) return false

    const specCandidate = system.specSelectors.specJson()
    const spec = specCandidate && specCandidate.toJS ? specCandidate.toJS() : specCandidate
    if (!spec || !spec.components) return false

    const schemas = spec.components.schemas || {}
    const tableOptions = (schemas.PanEuropeanTableOptions && schemas.PanEuropeanTableOptions.properties) || {}
    const allVariables =
      (schemas.PanEuropeanVariableNames &&
        schemas.PanEuropeanVariableNames.items &&
        schemas.PanEuropeanVariableNames.items.enum) ||
      []
    const allColumns =
      (schemas.PanEuropeanColumnNames &&
        schemas.PanEuropeanColumnNames.items &&
        schemas.PanEuropeanColumnNames.items.enum) ||
      []

    if (!Object.keys(tableOptions).length) return false

    state.tableOptions = tableOptions
    state.allVariables = Array.isArray(allVariables) ? allVariables : []
    state.allColumns = Array.isArray(allColumns) ? allColumns : []
    state.ready = true
    return true
  }

  const getSelectedTables = () =>
    findParamInputs(PARAMS.table)
      .map((node) => node.value)
      .filter(Boolean)

  const collectAllowed = (selectedTables) => {
    const variables = new Set()
    const columns = new Set()

    selectedTables.forEach((tableName) => {
      const entry = state.tableOptions[tableName]
      const variableEnum =
        entry &&
        entry.properties &&
        entry.properties.variables &&
        entry.properties.variables.items &&
        entry.properties.variables.items.enum
      const columnEnum =
        entry &&
        entry.properties &&
        entry.properties.columns &&
        entry.properties.columns.items &&
        entry.properties.columns.items.enum

      if (Array.isArray(variableEnum)) variableEnum.forEach((v) => variables.add(v))
      if (Array.isArray(columnEnum)) columnEnum.forEach((c) => columns.add(c))
    })

    return {
      variables: variables.size ? Array.from(variables) : state.allVariables,
      columns: columns.size ? Array.from(columns) : state.allColumns,
    }
  }

  const ensureDatalist = (id, anchor) => {
    let datalist = document.getElementById(id)
    if (datalist) return datalist

    datalist = document.createElement('datalist')
    datalist.id = id
    if (anchor && anchor.parentElement) {
      anchor.parentElement.appendChild(datalist)
    } else {
      document.body.appendChild(datalist)
    }
    return datalist
  }

  const updateFieldOptions = (paramName, allowed, fallback) => {
    const values = allowed && allowed.length ? allowed : fallback
    const nodes = findParamInputs(paramName)

    nodes.forEach((node) => {
      if (node.tagName === 'SELECT') {
        const previous = node.value
        node.innerHTML = ''

        values.forEach((value) => {
          const option = document.createElement('option')
          option.value = value
          option.textContent = value
          node.appendChild(option)
        })

        if (previous && values.includes(previous)) node.value = previous
      } else if (node.tagName === 'INPUT') {
        const datalist = ensureDatalist(paramName + '-datalist', node)
        datalist.innerHTML = ''
        values.forEach((value) => {
          const option = document.createElement('option')
          option.value = value
          datalist.appendChild(option)
        })
        node.setAttribute('list', datalist.id)
      }
    })
  }

  const refreshSelectors = () => {
    if (!state.ready) return
    const selectedTables = getSelectedTables()
    const allowed = collectAllowed(selectedTables)
    updateFieldOptions(PARAMS.variables, allowed.variables, state.allVariables)
    updateFieldOptions(PARAMS.columns, allowed.columns, state.allColumns)
  }

  const onTableChange = (evt) => {
    const target = evt.target
    if (!target) return
    const name = target.getAttribute('name') || target.getAttribute('aria-label') || ''
    const isTable =
      name === PARAMS.table ||
      name === PARAMS.table.replace('[]', '') ||
      !!target.closest('[data-param-name="' + PARAMS.table + '"]') ||
      !!target.closest('[data-param-name="' + PARAMS.table.replace('[]', '') + '"]')
    if (isTable) refreshSelectors()
  }

  const bindTableListeners = (root = document) => {
    findParamInputs(PARAMS.table, root).forEach((node) => {
      if (node._panEuropeanBound) return
      node._panEuropeanBound = true
      node.addEventListener('change', onTableChange, true)
    })
  }

  const installObserver = () => {
    const host = document.getElementById('swagger-ui')
    if (!host) return

    const observer = new MutationObserver((mutations) => {
      let shouldRefresh = false
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return

          if (node.matches && selectorsForParam(PARAMS.table).some((sel) => node.matches(sel))) {
            bindTableListeners(node.parentElement || node)
            shouldRefresh = true
          }

          if (node.querySelector) {
            const hasTables = selectorsForParam(PARAMS.table).some((sel) => node.querySelector(sel))
            const hasVars = selectorsForParam(PARAMS.variables).some((sel) => node.querySelector(sel))
            const hasCols = selectorsForParam(PARAMS.columns).some((sel) => node.querySelector(sel))
            if (hasTables) bindTableListeners(node)
            if (hasTables || hasVars || hasCols) shouldRefresh = true
          }
        })
      })

      if (shouldRefresh) refreshSelectors()
    })

    observer.observe(host, { childList: true, subtree: true })
  }

  const bootstrap = () => {
    if (!loadSpecParts()) {
      window.setTimeout(bootstrap, 250)
      return
    }

    bindTableListeners()
    installObserver()
    refreshSelectors()
  }

  bootstrap()
})()
`
