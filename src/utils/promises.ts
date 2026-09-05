import pLimit from 'p-limit'

/**
 * Given an Array, iterates serially over all the values in it, executing the given callback on each element.
 * If the callback returns a Promise, it is awaited before continuing to the next iteration.
 */
const each = async <Item, Result = unknown>(
  iterable: ArrayLike<Item>,
  callback: (item: Item, index: number) => Result | Promise<Result>
): Promise<Array<Result>> => {
  const results: Array<Result> = []

  for (let i = 0; i < iterable.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    results.push(await callback(iterable[i], i))
  }

  return results
}

/**
 * Maps every item with the given callback, keeping at most `concurrency` callbacks running at once.
 * A new callback starts as soon as any running one finishes. Results keep the input order.
 */
const pool = async <Item, Result>(
  items: Array<Item>,
  callback: (item: Item, index: number) => Promise<Result>,
  concurrency: number
): Promise<Array<Result>> => {
  const limit = pLimit(Math.max(concurrency, 1)) // pLimit throws on concurrency < 1
  return Promise.all(items.map((item, index) => limit(() => callback(item, index))))
}

export const Promises = {
  each,
  pool,
}
