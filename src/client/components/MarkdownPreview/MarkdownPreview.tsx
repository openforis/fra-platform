import React, { createElement, Fragment, useEffect, useMemo, useState } from 'react'

import rehypeParse from 'rehype-parse'
import rehypeRaw from 'rehype-raw'
import rehypeReact from 'rehype-react'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import { unified } from 'unified'

type Props = {
  value: string
  allowImages?: boolean
}

const MarkdownPreview: React.FC<Props> = (props) => {
  const { value, allowImages = false } = props
  const [Content, setContent] = useState<any>(Fragment)

  const rehypeSanitizeSchema = useMemo(
    () => ({
      ...defaultSchema,
      protocols: {
        ...defaultSchema.protocols,
        src: allowImages ? [...(defaultSchema.protocols?.src ?? []), 'data'] : defaultSchema.protocols?.src,
      },
    }),
    [allowImages]
  )

  useEffect(() => {
    unified()
      .use(rehypeRaw)
      .use(rehypeSanitize, rehypeSanitizeSchema)
      .use(rehypeParse, { fragment: true })
      .use(rehypeReact, { createElement, Fragment })
      .process(value)
      .then((file) => {
        setContent(file.result)
      })
  }, [rehypeSanitizeSchema, value])

  return Content
}

export default MarkdownPreview
