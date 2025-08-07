import { pipeline } from 'node:stream'
import { printOperationFailed } from './logger.js'

/**
 * Безопасный pipeline с логированием ошибок
 */
export const safePipeline = (streams) => {
  return new Promise((resolve, reject) => {
    pipeline(...streams, (err) => {
      if (err) {
        printOperationFailed()
        return reject(err)
      }
      resolve()
    })
  })
}