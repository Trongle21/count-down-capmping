import { motion } from 'framer-motion'

export default function ExpiredNotice({ targetLabel = 'ngày đặc biệt' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="mx-auto w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md px-6 py-6 shadow-[0_0_35px_rgba(139,92,246,0.25)]"
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <div className="text-sm uppercase tracking-widest text-white/60">Countdown đã kết thúc</div>
        <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
          Chúc mừng! Hãy tận hưởng {targetLabel} của bạn
        </div>
        <div className="mt-3 text-white/70 text-sm sm:text-base">
          Cảm ơn bạn đã chờ đợi. Bắt đầu ngay khoảnh khắc này nhé.
        </div>
      </div>
    </motion.div>
  )
}

