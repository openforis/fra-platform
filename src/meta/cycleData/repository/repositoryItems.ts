import { ApiEndPoint } from 'meta/api/endpoint'
import { RepositoryItem } from 'meta/cycleData/repository/repository'
import { Lang } from 'meta/lang'
import { CountryRouteParams } from 'meta/routes'
import { Translations } from 'meta/translation'

type GetFileURLProps = CountryRouteParams & {
  repositoryItem: RepositoryItem
}

const getURL = (props: GetFileURLProps) => {
  const { repositoryItem: datum, assessmentName, cycleName, countryIso } = props
  const queryParams = new URLSearchParams({ assessmentName, cycleName, countryIso })

  if (datum.link) {
    return datum.link
  }

  return `${ApiEndPoint.CycleData.Repository.file(datum.uuid)}?${queryParams.toString()}`
}

const getName = (props: { repositoryItem: RepositoryItem; language: Lang }): string => {
  const { repositoryItem, language = Lang.en } = props
  return Translations.getLabel({ translation: repositoryItem.props.translation, language })
}

export const RepositoryItems = {
  getName,
  getURL,
}
