const fields: Array<string> = ['id', 'uuid', 'country_iso', 'file_name', 'props']
export const selectFields = fields.map((f) => `f.${f}`).join(',')
