import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import process from 'node:process'
import { printOperationFailed } from '../logger.js'

const ROOT = path.parse(os.homedir()).root

export const goUp = async () => {
  try {
    const parent = path.dirname(process.cwd())
    if (path.resolve(parent).startsWith(ROOT)) {
      process.chdir(parent)
    }
  } catch {
    printOperationFailed()
  }
}

export const goTo = async (targetPath) => {
  try {
    const newPath = path.isAbsolute(targetPath)
      ? targetPath
      : path.resolve(process.cwd(), targetPath)

    const stat = await fs.stat(newPath)
    if (stat.isDirectory()) {
      process.chdir(newPath)
    } else {
      printOperationFailed()
    }
  } catch {
    printOperationFailed()
  }
}

export const listDirectory = async () => {
  try {
    const cwd = process.cwd()
    const items = await fs.readdir(cwd, { withFileTypes: true })

    const folders = []
    const files = []

    for (const item of items) {
      if (item.isDirectory()) {
        folders.push({ name: item.name, type: 'directory' })
      } else {
        files.push({ name: item.name, type: 'file' })
      }
    }

    const sorted = [...folders.sort(sortByName), ...files.sort(sortByName)]

    console.table(sorted)
  } catch {
    printOperationFailed()
  }
}

function sortByName(a, b) {
  return a.name.localeCompare(b.name)
}