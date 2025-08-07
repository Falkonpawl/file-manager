import path from 'node:path'
import os from 'node:os'
import process from 'node:process'

/**
 * Возвращает абсолютный путь от относительного или абсолютного пути
 */
export const resolvePath = (inputPath) => {
  if (path.isAbsolute(inputPath)) {
    return inputPath
  }
  return path.resolve(process.cwd(), inputPath)
}

/**
 * Устанавливает рабочую директорию (cwd), если путь валиден и не выше корня
 */
export const changeDirectory = (newPath) => {
  const resolvedPath = resolvePath(newPath)
  const rootPath = path.parse(process.cwd()).root

  if (resolvedPath.startsWith(rootPath)) {
    process.chdir(resolvedPath)
  }
}

/**
 * Переход на уровень выше, если это не выше корня
 */
export const goUp = () => {
  const parentDir = path.resolve(process.cwd(), '..')
  const rootDir = path.parse(process.cwd()).root

  if (process.cwd() !== rootDir) {
    process.chdir(parentDir)
  }
}