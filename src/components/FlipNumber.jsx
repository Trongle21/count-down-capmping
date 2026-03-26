import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'

export default function FlipNumber({ value, minDigits = 2, className = '' }) {
  const text = useMemo(() => {
    const n = Number.isFinite(value) ? value : 0
    return Math.floor(Math.max(0, n)).toString().padStart(minDigits, '0')
  }, [value, minDigits])

  return (
    <div
      className={`relative inline-flex font-sans tabular-nums tracking-tight ${className}`}
      aria-label={text}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={text}
          initial={{ y: 14, rotateX: 70, opacity: 0 }}
          animate={{ y: 0, rotateX: 0, opacity: 1 }}
          exit={{ y: -14, rotateX: -70, opacity: 0 }}
          transition={{ duration: 0.38, ease: 'easeOut' }}
          className="inline-block"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

