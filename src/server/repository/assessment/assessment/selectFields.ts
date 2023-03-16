const fields: Array<string> = ['id', 'uuid', 'props']
export const selectFields = fields.map((f) => `a.${f}`).join(',')
