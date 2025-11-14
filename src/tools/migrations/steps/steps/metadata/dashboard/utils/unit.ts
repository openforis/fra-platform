import { UnitName } from 'meta/measurement/unitName'

export const unit = (region: boolean): string => `unit.${region ? UnitName.haMillion : UnitName.haThousand}`
