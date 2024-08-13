import { Unit } from 'meta/assessment'

export const unit = (region: boolean): string => `unit.${region ? Unit.haMillion : Unit.haThousand}`
