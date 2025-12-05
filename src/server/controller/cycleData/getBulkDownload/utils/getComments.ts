import { Parser } from 'htmlparser2'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

import { CycleDataController } from 'server/controller/cycleData/index'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  sectionName: SectionName
  name: CommentableDescriptionName
}

/**
 * Extracts text and links from the provided HTML string.
 *
 * @param {string} html - The HTML string to extract text and links from.
 * @returns {string} - The extracted text with links in the format "text (href)".
 *
 * @example
 * input html:
 * <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <a href="https://www.lipsum.com/">Lorem ipsum</a> dolor sit amet.
 *
 * output text:
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum (https://www.lipsum.com/) dolor sit amet.
 */
const _extractTextAndLinks = (html: string): string => {
  let extractedText = ''
  const parser = new Parser(
    {
      onopentag(name, attributes): void {
        if (name === 'a') {
          extractedText += ` (${attributes.href})`
        }
      },
      ontext(text): void {
        extractedText += text
      },
    },
    { decodeEntities: true }
  )

  parser.write(html)
  parser.end()

  return extractedText
}

export const getComments = async (props: Props): Promise<string> => {
  const { assessment, countryIso, cycle, name, sectionName } = props
  const propsValue = { assessment, countryIso, cycle, name, sectionNames: [sectionName] }
  const values = await CycleDataController.Description.getDescriptionValues(propsValue)
  const comments = values?.[countryIso]?.[sectionName]?.[name]?.text

  return comments ? _extractTextAndLinks(comments) : ''
}
