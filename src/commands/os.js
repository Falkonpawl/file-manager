import os from 'node:os'

export const getEOL = () => {
  return os.EOL
}

export const getCPUs = () => {
  const cpus = os.cpus()
  return cpus.map((cpu, index) => ({
    core: index + 1,
    model: cpu.model,
    speedGHz: (cpu.speed / 1000).toFixed(2),
  }))
}

export const getHomeDir = () => {
  return os.homedir()
}

export const getUsername = () => {
  return os.userInfo().username
}

export const getArchitecture = () => {
  return process.arch
}