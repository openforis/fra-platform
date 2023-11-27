import { ApiEndPoint } from 'meta/api/endpoint'
import { AreaCode } from 'meta/area'
import { AssessmentName, CycleName } from 'meta/assessment'

type GetHrefProps = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: AreaCode
  uuid: string
}

const getHref = (props: GetHrefProps) => {
  const { uuid, ...rest } = props
  const params = new URLSearchParams(rest)
  return `${ApiEndPoint.File.Assessment.one(uuid)}?${params.toString()}`
}

export const AssessmentFiles = {
  getHref,
}
