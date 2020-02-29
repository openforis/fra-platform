import { elementOffset } from '../domUtils'

/**
 * @typedef Observable
 * @type {object}
 * @property {HTMLElement} el - a dom node
 * @property {{height: number, width: number}} size - the size of the observed element
 */
// ResizeObserver polyfill
export default class ResizeObserver {
  constructor (callback) {
    /**
     * Array of observed elements
     * @type {Observable[]}
     */
    this.observables = []
    this.checkSize = this.checkSize.bind(this)
    this.callback = callback

    this.checkSize()
  }

  getElementSize (el) {
    const { width, height, x, y } = el.getBBox ? el.getBBox() : elementOffset(el)
    return { width, height, x, y }
  }

  observe (el) {
    if (!this.observables.some(observable => observable.el === el)) {
      this.observables.push({
        el,
        size: this.getElementSize(el),
      })
    }
  }

  unobserve (el) {
    this.observables = this.observables.filter(obj => obj.el !== el)
  }

  disconnect () {
    this.observables = []
    window.cancelAnimationFrame(this.af)
  }

  checkSize () {
    const changedEntries = this.observables
      .filter(obj => {
        const { width, height, x, y } = this.getElementSize(obj.el)
        const size = obj.size

        if (size.height !== height || size.width !== width || size.x !== x || size.y !== y) {
          obj.size = { width, height, x, y }
          return true
        }

        return false
      })
      .map(obj => obj.el)

    if (changedEntries.length > 0) {
      this.callback(changedEntries)
    }

    this.af = window.requestAnimationFrame(this.checkSize)
  }
}
