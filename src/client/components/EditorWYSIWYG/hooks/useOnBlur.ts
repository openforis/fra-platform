import { useCallback, useEffect, useRef } from 'react'

import { Jodit } from 'jodit-react'
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

type Props = {
  jodit: Jodit
  onChange: OnChange
  value?: string
}

export const useOnBlur = (props: Props): OnChange => {
  const { onChange, value, jodit } = props

  const valueRef = useRef<string>(value)
  const pastedHtmlRef = useRef<boolean>(false)

  useEffect(() => {
    valueRef.current = value
  }, [value])

  useEffect(() => {
    if (Objects.isEmpty(jodit)) return () => undefined

    const onBeforeOpenPasteDialog = () => {
      pastedHtmlRef.current = true
    }
    jodit.events?.on('beforeOpenPasteDialog', onBeforeOpenPasteDialog)

    return () => {
      jodit.events?.off('beforeOpenPasteDialog', onBeforeOpenPasteDialog)
    }
  }, [jodit])

  return useCallback<OnChange>(
    async (newValue: string) => {
      if (pastedHtmlRef.current) {
        pastedHtmlRef.current = false
        return
      }

      if (newValue === valueRef.current) return

      // Sanitize user input before saving
      let sanitizedValue = (await processor.process(newValue)).toString()

      // Sanitizes further - remove empty editor element <div><br></div>
      const parsedValue = DOMs.parseDOMValue(sanitizedValue)
      if (Objects.isEmpty(parsedValue)) {
        sanitizedValue = ''
      }
      valueRef.current = sanitizedValue
      onChange(sanitizedValue)
    },
    [onChange]
  )
}
