type DataType = {
  idx: number
  type: string
  migration: {
    linkedNodes?: {
      [key: string]: {
        assessmentName: string
        cycleName: string
        tableName: string
        variableName: string
        colName: string
      }
    }
    validateFns?: {
      [key: string]: string[]
    }
  }
}

export const updatedDataCol = (dataCol: DataType[], colName: string, variableName?: string): DataType[] =>
  dataCol.map((col) => {
    let { migration } = col
    if (migration) {
      if (migration.linkedNodes) {
        migration = {
          ...migration,
          linkedNodes: Object.fromEntries(
            Object.entries(migration.linkedNodes).map(([key, node]) => [
              key,
              { ...node, variableName: variableName ?? node.variableName, colName },
            ])
          ),
        }
      }

      if (migration.validateFns) {
        migration = {
          ...migration,
          validateFns: Object.fromEntries(
            Object.entries(migration.validateFns).map(([key, fns]) => [
              key,
              fns.map((fn) => fn.replace(/yearPlaceholder/g, colName)),
            ])
          ),
        }
      }
    }

    return { ...col, migration }
  })
