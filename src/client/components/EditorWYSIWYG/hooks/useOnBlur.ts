import { useCallback } from 'react'

import rehypeParse from 'rehype-parse'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import { unified } from 'unified'
import { Objects } from 'utils/objects'

import { DOMs } from 'client/utils/dom'

const schema = {
  ...defaultSchema,
  tagNames: [...defaultSchema.tagNames, 'u'],
}

const processor = unified()
  .use(rehypeRaw)
  .use(rehypeSanitize, schema)
  .use(rehypeParse, { fragment: true })
  .use(rehypeStringify)

type OnChange = (value?: string) => void

export const useOnBlur = (props: { onChange: OnChange }): OnChange => {
  const { onChange } = props

  return useCallback<OnChange>(
    async (newValue: string) => {
      // Sanitize user input before saving
      let sanitizedValue = (await processor.process(newValue)).toString()

      // Sanitizes further - remove empty editor element <div><br></div>
      const parsedValue = DOMs.parseDOMValue(sanitizedValue)
      if (Objects.isEmpty(parsedValue)) {
        sanitizedValue = ''
      }

      onChange(sanitizedValue)
    },
    [onChange]
  )
}
