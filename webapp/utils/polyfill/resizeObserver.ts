import { elementOffset } from '../domUtils'

/**
 * @typedef Observable
 * @type {object}
 * @property {HTMLElement} el - a dom node
 * @property {{height: number, width: number}} size - the size of the observed element
 */
// ResizeObserver polyfill
export default class ResizeObserver {
  animationFrame: any

  callback: any

  observables: any

  constructor(callback: any) {
    /**
     * Array of observed elements
     * @type {Observable[]}
     */
    this.observables = []
    this.checkSize = this.checkSize.bind(this)
    this.callback = callback

    this.checkSize()
  }

  getElementSize(el: any) {
    const { width, height, x, y } = el.getBBox ? el.getBBox() : elementOffset(el)
    return { width, height, x, y }
  }

  observe(el: any) {
    if (!this.observables.some((observable: any) => observable.el === el)) {
      this.observables.push({
        el,
        size: this.getElementSize(el),
      })
    }
  }

  unobserve(el: any) {
    this.observables = this.observables.filter((obj: any) => obj.el !== el)
  }

  disconnect() {
    this.observables = []
    window.cancelAnimationFrame(this.animationFrame)
  }

  checkSize() {
    const changedEntries = this.observables
      .filter((obj: any) => {
        const { width, height, x, y } = this.getElementSize(obj.el)
        const { size } = obj

        if (size.height !== height || size.width !== width || size.x !== x || size.y !== y) {
          obj.size = { width, height, x, y }
          return true
        }

        return false
      })
      .map((obj: any) => obj.el)

    if (changedEntries.length > 0) {
      this.callback(changedEntries)
    }

    this.animationFrame = window.requestAnimationFrame(this.checkSize)
  }
}
