import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/**
 * Two registers for the same page.
 *
 * `plain` is the default, because most people running a label are not
 * engineers and should not have to decode "Row-Level Security" to work out
 * whether their masters are safe. `tech` is the same claim with the mechanism
 * named, for the one reader in ten who wants to check our homework.
 *
 * Neither register may say anything the other does not — see CLAIMS.md.
 */
export type Voice = 'plain' | 'tech'

/** A string that reads differently depending on who is asking. */
export type Dual<T = string> = { plain: T; tech: T }

const STORAGE_KEY = 'labelnest-voice'

const VoiceContext = createContext<{
  voice: Voice
  setVoice: (v: Voice) => void
  toggle: () => void
}>({ voice: 'plain', setVoice: () => {}, toggle: () => {} })

function readStored(): Voice {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'tech' ? 'tech' : 'plain'
  } catch {
    // Private windows and blocked site data throw here. Plain is the default.
    return 'plain'
  }
}

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [voice, setVoice] = useState<Voice>('plain')

  // Read the stored preference after mount so the first paint is deterministic.
  useEffect(() => setVoice(readStored()), [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, voice)
    } catch {
      // Not being able to remember the choice is not worth breaking the page.
    }
  }, [voice])

  const toggle = useCallback(
    () => setVoice((v) => (v === 'plain' ? 'tech' : 'plain')),
    [],
  )

  const value = useMemo(() => ({ voice, setVoice, toggle }), [voice, toggle])
  return <VoiceContext.Provider value={value}>{children}</VoiceContext.Provider>
}

export function useVoice() {
  return useContext(VoiceContext)
}

/** `pick(someDual)` returns the wording for the register currently in use. */
export function usePick() {
  const { voice } = useVoice()
  return useCallback(
    function pick<T>(d: Dual<T>): T {
      return d[voice]
    },
    [voice],
  )
}
