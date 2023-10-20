const handleNext =
  <Result = unknown>(results: Array<Result>) =>
  async (generator: Generator<Result | Promise<Result>, void, unknown>): Promise<Array<Result>> => {
    // result => { done: [Boolean], value: [Object] }
    const { done, value } = generator.next()

    if (done) {
      return results
    }

    results.push((await value) as Result)

    return handleNext(results)(generator)
  }

/**
 * Transforms the generator passed as input parameter to a Promise that gets resolved when the generator finishes.
 * A useful application is when an array of promises must be resolved in order.
 */
export const resolveGenerator = handleNext([])

/**
 * Given an Array, iterates serially over all the values in it, executing the given callback on each element.
 * If the callback returns a Promise, it is awaited before continuing to the next iteration.
 */
const each = async <Item, Result = unknown>(
  iterable: ArrayLike<Item>,
  callback: (item: Item, index: number) => Result | Promise<Result>,
  stopIfFn?: (item: Item) => boolean
): Promise<Array<Result>> => {
  function* generator() {
    for (let i = 0; i < iterable.length; i += 1) {
      const item = iterable[i]
      if (stopIfFn && stopIfFn(item)) {
        return
      }
      yield callback(item, i)
    }
  }

  return resolveGenerator(generator())
}

export const Promises = {
  each,
}
