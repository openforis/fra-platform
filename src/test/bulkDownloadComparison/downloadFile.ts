import { createWriteStream, existsSync, mkdir } from 'fs'
import axios from 'axios'

export const downloadFile = async (fileUrl: string, outputLocationPath: string, fileName: string): Promise<string> => {
  if (!existsSync(outputLocationPath)) {
    mkdir(outputLocationPath, { recursive: true }, (err) => {
      if (err) throw err
    })
  }

  const path = `${outputLocationPath}/${fileName}.zip`
  const writer = createWriteStream(path)

  // Workaround for:
  // Jest has detected the following 1 open handle potentially keeping Jest from exiting
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  await process.nextTick(() => {})

  return axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
  }).then((response) => {
    return new Promise((resolve, reject) => {
      response.data.pipe(writer)
      let error: Error = null
      writer.on('error', (err: Error) => {
        error = err
        writer.close()
        reject(err)
      })
      writer.on('close', () => {
        if (!error) {
          resolve(path)
        }
      })
    })
  })
}
