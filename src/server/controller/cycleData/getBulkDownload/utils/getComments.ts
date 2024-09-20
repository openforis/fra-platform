import { Parser } from 'htmlparser2'

import { CountryIso } from 'meta/area'
import { Assessment, CommentableDescriptionName, Cycle, SectionName } from 'meta/assessment'

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
const _extractTextAndLinks = (html: string) => {
  let extractedText = ''
  const parser = new Parser(
    {
      onopentag(name, attributes) {
        if (name === 'a') {
          extractedText += ` (${attributes.href})`
        }
      },
      ontext(text) {
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
  const { countryIso, sectionName, name } = props
  const values = await CycleDataController.getDescriptionValues(props)
  const comments = values?.[countryIso]?.[sectionName]?.[name]?.text

  return comments ? _extractTextAndLinks(comments) : ''
}
