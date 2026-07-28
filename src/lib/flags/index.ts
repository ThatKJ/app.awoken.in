const flags: Record<string, boolean> = {
  worker_v2: false,
  reports_v2: false,
  voice_agent: false,
}

export function isEnabled(flag: string): boolean {
  return flags[flag] ?? false
}

export function setFlag(flag: string, value: boolean) {
  flags[flag] = value
}
