import rehypeParse from 'rehype-parse'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema, Options } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import { unified } from 'unified'

export const tableTags = ['table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr']

const linkTagsAttributes = ((): typeof defaultSchema.attributes.a => {
  const defaultAttributes = defaultSchema.attributes?.a ?? []
  return [...defaultAttributes, 'rel', 'target']
})()

const tableTagsAttributes = tableTags.reduce<Partial<Options['attributes']>>((acc, tag) => {
  const defaultAttributes = defaultSchema.attributes[tag] || []
  acc[tag] = [...defaultAttributes, 'style']
  return acc
}, {})

const schema = {
  ...defaultSchema,
  tagNames: [...defaultSchema.tagNames, 'u', ...tableTags],
  attributes: {
    ...defaultSchema.attributes,
    a: linkTagsAttributes,
    ...tableTagsAttributes,
  },
}

export const processor = unified()
  .use(rehypeRaw)
  .use(rehypeSanitize, schema)
  .use(rehypeParse, { fragment: true })
  .use(rehypeStringify)
