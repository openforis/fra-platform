import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Lang } from 'meta/lang'

interface BiomassCalculatorProps {
  assessmentName: AssessmentName
  cycleName: CycleName
  domain: string
  language: Lang
}

const getBiomassCalculator = ({ assessmentName, cycleName, domain, language }: BiomassCalculatorProps): string =>
  ApiEndPoint.Static.file(`${assessmentName}/${cycleName}/biomassStock/BiomassCalculator_${domain}_${language}.xlsx`)

export const Static = {
  getBiomassCalculator,
}
