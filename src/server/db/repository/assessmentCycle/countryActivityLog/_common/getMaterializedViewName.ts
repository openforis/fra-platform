import { AreaCode } from 'meta/area'

export const getMaterializedViewName = (areaCode: AreaCode): string => `"activity_log_${areaCode}"`
