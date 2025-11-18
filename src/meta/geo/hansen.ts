export const hansenPercentages = [10, 20, 30] as const

export type HansenPercentage = (typeof hansenPercentages)[number]
