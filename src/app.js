import readline from "node:readline"
import os from "node:os"
import { stdin as input, stdout as output } from "node:process"
import { handleInput } from "./inputHandler.js"
import { printCWD, printWelcome, printGoodbye } from "./logger.js"

export const startApp = (username) => {
  process.chdir(os.homedir())
  const rl = readline.createInterface({ input, output })

  printWelcome(username)
  printCWD()

  rl.setPrompt("> ")
  rl.prompt()

  rl.on("line", async (line) => {
    const trimmed = line.trim()

    if (trimmed === ".exit") {
      exitApp(rl, username)
      return
    }

    try {
      await handleInput(trimmed) // мы передадим cwd внутри handleInput
    } catch {
      console.log("Operation failed")
    }

    printCWD()
    rl.prompt()
  })

  rl.on("SIGINT", () => {
    exitApp(rl, username)
  })
}

function exitApp(rl, username) {
  printGoodbye(username)
  rl.close()
  process.exit(0)
}
