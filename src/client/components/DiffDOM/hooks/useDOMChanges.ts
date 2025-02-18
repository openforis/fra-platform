import { useLayoutEffect } from 'react'

import { DiffDOM, stringToObj } from 'diff-dom'

import { DiffDOMProps } from 'client/components/DiffDOM/types'

import { normalizeDiffDOM } from './utils'

type Props = DiffDOMProps & {
  ref: React.MutableRefObject<HTMLDivElement>
}

export const useDOMChanges = (props: Props) => {
  const { current, prev, ref } = props

  useLayoutEffect(() => {
    if (!ref.current) return
    const diffDOM = new DiffDOM({
      caseSensitive: true,
      preDiffApply(info): boolean {
        if (info.diff.action === 'replaceElement') {
          const div = document.createElement('div')
          div.className = 'diff-text'

          const divRemoved = document.createElement('div')
          divRemoved.className = 'removed'
          divRemoved.appendChild(info.node.cloneNode(true))

          div.appendChild(divRemoved)
          info.node.replaceWith(div)
          return true
        }

        if (info.diff.action === 'addElement') {
          // eslint-disable-next-line no-param-reassign
          info.diff.element = {
            nodeName: 'div',
            attributes: { class: 'diff-text' },
            childNodes: info.diff.element
              ? [
                  {
                    ...info.diff.element,
                    attributes: {
                      ...info.diff.element.attributes,
                      class: info.diff.element.attributes?.class
                        ? `${info.diff.element.attributes.class} added`
                        : 'added',
                    },
                  },
                ]
              : [],
          }
        }
        return false
      },
    })

    const normalizedPrev = normalizeDiffDOM(prev ?? '')
    const normalizedCurrent = normalizeDiffDOM(current ?? '')

    const objDiffPrev = stringToObj(normalizedPrev)
    const objDiffCurrent = stringToObj(normalizedCurrent)
    const diff = diffDOM.diff(objDiffPrev, objDiffCurrent)
    diffDOM.apply(ref.current, diff)
  }, [current, prev, ref])
}
