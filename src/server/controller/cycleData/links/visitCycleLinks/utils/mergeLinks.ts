import { LinkToVisit } from 'meta/cycleData'

type Props = {
  linksToVisit: Array<LinkToVisit>
}

export const mergeLinks = (props: Props): Array<LinkToVisit> => {
  const { linksToVisit } = props

  const mergedLinksMap = linksToVisit.reduce((acc, curr) => {
    const key = `${curr.countryIso}_${curr.link ?? ''}`

    if (!acc[key]) {
      // eslint-disable-next-line no-param-reassign
      acc[key] = { ...curr, locations: [...curr.locations] }
    } else {
      acc[key].locations.push(...curr.locations)
    }
    return acc
  }, {} as { [key: string]: LinkToVisit })

  return Object.values(mergedLinksMap)
}
