import { UnitName } from 'meta/measurement/unit'

export const unit = (region: boolean): string => `unit.${region ? UnitName.haMillion : UnitName.haThousand}`
