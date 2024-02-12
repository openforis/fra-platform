import { useCallback } from 'react'

import rehypeParse from 'rehype-parse'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import { unified } from 'unified'

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
      const v = await processor.process(newValue)
      onChange(v.toString())
    },
    [onChange]
  )
}
