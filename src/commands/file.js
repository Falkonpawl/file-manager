import fs from 'node:fs/promises'
import { createReadStream, createWriteStream } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { pipeline } from 'node:stream/promises'
import { printOperationFailed } from '../logger.js'

// Read and print file content
export const readFile = async (filePath) => {
  try {
    const fullPath = path.resolve(process.cwd(), filePath)
    const stream = createReadStream(fullPath, { encoding: 'utf-8' })
    stream.pipe(process.stdout)
  } catch {
    printOperationFailed()
  }
}

// Create an empty file
export const createFile = async (filename) => {
  try {
    const filePath = path.resolve(process.cwd(), filename)
    await fs.writeFile(filePath, '')
  } catch {
    printOperationFailed()
  }
}

// Rename file
export const renameFile = async (oldPath, newName) => {
  try {
    const fullOldPath = path.resolve(process.cwd(), oldPath)
    const dir = path.dirname(fullOldPath)
    const newPath = path.join(dir, newName)
    await fs.rename(fullOldPath, newPath)
  } catch {
    printOperationFailed()
  }
}

// Copy file
export const copyFile = async (src, destDir) => {
  try {
    const srcPath = path.resolve(process.cwd(), src)
    const destPath = path.resolve(process.cwd(), destDir, path.basename(src))
    await pipeline(
      createReadStream(srcPath),
      createWriteStream(destPath)
    )
  } catch {
    printOperationFailed()
  }
}

// Move file (copy + delete original)
export const moveFile = async (src, destDir) => {
  try {
    await copyFile(src, destDir)
    const srcPath = path.resolve(process.cwd(), src)
    await fs.unlink(srcPath)
  } catch {
    printOperationFailed()
  }
}

// Delete file
export const removeFile = async (filePath) => {
  try {
    const fullPath = path.resolve(process.cwd(), filePath)
    await fs.unlink(fullPath)
  } catch {
    printOperationFailed()
  }
}