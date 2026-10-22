import { useEffect } from 'react'

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Albatross Defense` : 'Albatross Defense — Zephyr Z1'
  }, [title])
}
