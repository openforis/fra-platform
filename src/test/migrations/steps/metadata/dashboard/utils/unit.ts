import { UnitName } from 'meta/assessment/unit'

export const unit = (region: boolean): string => `unit.${region ? UnitName.haMillion : UnitName.haThousand}`
