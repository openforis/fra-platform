import { DiffInfo } from 'client/components/DiffDOM/types'

export const replaceElement = (info: DiffInfo) => {
  const div = document.createElement('div')
  div.className = 'diff-text'

  const divRemoved = document.createElement('div')
  divRemoved.className = 'removed'
  divRemoved.appendChild(info.node.cloneNode(true))

  div.appendChild(divRemoved)
  info.node.replaceWith(div)
}
