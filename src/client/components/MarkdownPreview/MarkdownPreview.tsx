import React, { createElement, Fragment, useEffect, useState } from 'react'

import rehypeParse from 'rehype-parse'
import rehypeRaw from 'rehype-raw'
import rehypeReact from 'rehype-react'
import rehypeSanitize from 'rehype-sanitize'
import { unified } from 'unified'

type Props = {
  value: string
}

const MarkdownPreview: React.FC<Props> = (props) => {
  const { value } = props
  const [Content, setContent] = useState<any>(Fragment)

  useEffect(() => {
    unified()
      .use(rehypeRaw)
      .use(rehypeSanitize)
      .use(rehypeParse, { fragment: true })
      .use(rehypeReact, { createElement, Fragment })
      .process(value)
      .then((file) => {
        setContent(file.result)
      })
  }, [value])

  return Content
}

export default MarkdownPreview
