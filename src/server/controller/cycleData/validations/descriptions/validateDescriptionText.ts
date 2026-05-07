import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { Validation } from 'meta/assessment/validation/validation'
import { LinkValidationStatusCode } from 'meta/cycleData/links/link'
import { Links } from 'meta/cycleData/links/links'
import { Htmls } from 'utils/htmls'
import { Objects } from 'utils/objects'

import { validateLink } from 'server/controller/cycleData/links/validateLink'

type Props = {
  assessment: Assessment
  cycle: Cycle
  descriptionName: CommentableDescriptionName
  sectionName: SectionName
  value: CommentableDescriptionValue
}

export const validateDescriptionText = async (props: Props): Promise<Validation | undefined> => {
  const { value } = props

  const links = Htmls.getLinks(value.text)
  if (Objects.isEmpty(links)) return undefined

  const linkValidations = await Promise.all(
    links.map(async ({ link }) => ({
      code: await validateLink(link),
      link,
    }))
  )
  const messages = linkValidations.reduce<Validation['messages']>((acc, { code, link }) => {
    if (code === LinkValidationStatusCode.success) return acc

    acc.push({
      key: 'generalValidation.invalidLinkWithReason',
      params: {
        link,
        reason: Links.getI18nValidationStatusLabelKey(code),
      },
    })
    return acc
  }, [])

  if (Objects.isEmpty(messages)) return undefined

  return {
    messages,
    valid: false,
  }
}
