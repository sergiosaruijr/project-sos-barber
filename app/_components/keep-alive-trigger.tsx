"use client"

import { useEffect } from "react"

export function KeepAliveTrigger() {
  useEffect(() => {
    console.log("KeepAliveTrigger montado!")
    const interval = setInterval(
      () => {
        fetch("/api/keep-alive", {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_KEEP_ALIVE_SECRET}`,
          },
        })
          .then((res) => res.json())
          .then((data) => console.log("Keep-alive response:", data))
          .catch(console.error)
      },
      4 * 60 * 1000,
    )

    return () => clearInterval(interval)
  }, [])

  return null
}
