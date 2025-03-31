import { Unit } from 'meta/assessment/unit'

export const unit = (region: boolean): string => `unit.${region ? Unit.haMillion : Unit.haThousand}`
