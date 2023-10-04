import { AreaCode } from 'meta/area'

export const getMaterializedViewName = (areaCode: AreaCode) => `"activity_log_${areaCode}"`
