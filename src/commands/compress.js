import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib'
import { resolvePath } from '../utils/pathUtils.js'
import { printOperationFailed } from '../logger.js'

export const compress = async (source, destination) => {
  try {
    const inputPath = resolvePath(source)
    const outputPath = resolvePath(destination)

    await pipeline(
      createReadStream(inputPath),
      createBrotliCompress(),
      createWriteStream(outputPath)
    )
  } catch {
    printOperationFailed()
  }
}

export const decompress = async (source, destination) => {
  try {
    const inputPath = resolvePath(source)
    const outputPath = resolvePath(destination)

    await pipeline(
      createReadStream(inputPath),
      createBrotliDecompress(),
      createWriteStream(outputPath)
    )
  } catch {
    printOperationFailed()
  }
}
