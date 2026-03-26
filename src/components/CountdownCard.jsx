import { motion } from 'framer-motion'
import FlipNumber from './FlipNumber.jsx'

export default function CountdownCard({ label, value, minDigits }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md px-6 py-5 shadow-[0_0_25px_rgba(139,92,246,0.18)]"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex flex-col items-center">
        <FlipNumber value={value} minDigits={minDigits} className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-sm" />
        <div className="mt-2 text-xs sm:text-sm md:text-base tracking-wide uppercase text-white/70">
          {label}
        </div>
      </div>
    </motion.div>
  )
}

