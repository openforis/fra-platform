import { DiffInfo } from 'client/components/DiffDOM/types'

export const addElement = (info: DiffInfo) => {
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
              class: info.diff.element.attributes?.class ? `${info.diff.element.attributes.class} added` : 'added',
            },
          },
        ]
      : [],
  }
}
