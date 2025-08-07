import { goUp, goTo, listDirectory } from './commands/navigation.js'
import {
  readFile,
  createFile,
  renameFile,
  copyFile,
  moveFile,
  removeFile
} from './commands/file.js'
import {
  getEOL,
  getCPUs,
  getHomeDir,
  getUsername,
  getArchitecture
} from './commands/os.js'
import { calculateHash } from './commands/hash.js'
import {
  compress,
  decompress
} from './commands/compress.js'
import { printInvalidInput, printCWD } from './logger.js'

export const handleInput = async (line) => {
  const [command, ...args] = line.trim().split(' ')

  try {
    switch (command) {
      // Navigation
      case 'up':
        await goUp()
        break
      case 'cd':
        await goTo(args[0])
        break
      case 'ls':
        await listDirectory()
        break

      // File operations
      case 'cat':
        await readFile(args[0])
        break
      case 'add':
        await createFile(args[0])
        break
      case 'rn':
        await renameFile(args[0], args[1])
        break
      case 'cp':
        await copyFile(args[0], args[1])
        break
      case 'mv':
        await moveFile(args[0], args[1])
        break
      case 'rm':
        await removeFile(args[0])
        break

      // OS info
      case 'os':
        await handleOSCommand(args[0])
        break

      // Hash
      case 'hash':
        await calculateHash(args[0])
        break

      // Compression
      case 'compress':
        await compress(args[0], args[1])
        break
      case 'decompress':
        await decompress(args[0], args[1])
        break

      default:
        printInvalidInput()
        break
    }
  } catch {
    printInvalidInput()
  }

  printCWD()
}

const handleOSCommand = async (flag) => {
  switch (flag) {
    case '--EOL':
      console.log(JSON.stringify(getEOL()))
      break
    case '--cpus':
      console.log(getCPUs())
      break
    case '--homedir':
      console.log(getHomeDir())
      break
    case '--username':
      console.log(getUsername())
      break
    case '--architecture':
      console.log(getArchitecture())
      break
    default:
      printInvalidInput()
  }
}