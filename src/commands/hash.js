import { createHash } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { printOperationFailed } from '../logger.js'
import { resolvePath } from '../utils/pathUtils.js'

export const calculateHash = async (pathToFile) => {
  const fullPath = resolvePath(pathToFile)

  return new Promise((resolve, reject) => {
    const hash = createHash('sha256')
    const stream = createReadStream(fullPath)

    stream.on('error', () => {
      printOperationFailed()
      reject()
    })

    stream.on('data', (chunk) => {
      hash.update(chunk)
    })

    stream.on('end', () => {
      const digest = hash.digest('hex')
      console.log(digest)
      resolve(digest)
    })
  })
}