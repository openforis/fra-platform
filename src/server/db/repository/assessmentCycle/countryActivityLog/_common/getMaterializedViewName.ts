import { AreaCode } from 'meta/area/areaCode'

export const getMaterializedViewName = (areaCode: AreaCode): string => `"activity_log_${areaCode}"`
