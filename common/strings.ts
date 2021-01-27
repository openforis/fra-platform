export const normalize = (string: any) => string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export default {
  normalize,
}
