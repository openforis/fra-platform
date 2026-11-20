import { Objects } from 'utils/objects'

export const getLinkHref = (anchor: Element): string => {
  const href = anchor.getAttribute('href')

  return Objects.isEmpty(href) ? '' : href
}
