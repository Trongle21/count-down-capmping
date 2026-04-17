import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import CountdownCard from "../components/CountdownCard.jsx";
import ExpiredNotice from "../components/ExpiredNotice.jsx";

function getTargetDate() {
  return new Date(Date.now() + 3_000);
  // return new Date(2026, 3, 18, 0, 0, 0);
}

function getTimeParts(targetDate, nowMs) {
  const diffMs = targetDate.getTime() - nowMs;
  if (diffMs <= 0) {
    return {
      expired: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);

  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return {
    expired: false,
    days,
    hours,
    minutes,
    seconds,
  };
}

export default function CountdownLanding({ onComplete }) {
  const targetDate = useMemo(() => getTargetDate(), []);

  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    let t = 0;

    const scheduleNextTick = () => {
      const now = Date.now();
      // Căn theo giây để giảm jitter (lấy phần dư milliseconds).
      const delay = 1000 - (now % 1000);
      t = window.setTimeout(() => {
        setNowMs(Date.now());
        scheduleNextTick();
      }, delay);
    };

    scheduleNextTick();

    return () => window.clearTimeout(t);
  }, []);

  const parts = useMemo(
    () => getTimeParts(targetDate, nowMs),
    [targetDate, nowMs],
  );

  useEffect(() => {
    if (parts.expired) {
      onComplete?.();
    }
  }, [onComplete, parts.expired]);

  const targetText = "10 giây";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060816]">
      <AnimatedBackground />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.7)]" />
            <span className="text-xs sm:text-sm tracking-widest text-white/70">
              Camping Camping!! Iu Mơ Iu Mơ
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Đếm ngược tới
            <span className="text-purple-400"> ngày {targetText}</span>
          </h1>
          <p className="mt-3 text-white/70 text-sm sm:text-base">
            Chờ đợi là hạnh phúc nha Ny Ny
          </p>
        </motion.div>

        <div className="mt-10 w-full">
          <AnimatePresence mode="wait">
            {parts.expired ? (
              <motion.div
                key="expired"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <ExpiredNotice targetLabel={`ngày ${targetText}`} />
              </motion.div>
            ) : (
              <motion.div
                key="countdown"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 md:grid-cols-4"
              >
                <CountdownCard label="Ngày" value={parts.days} minDigits={3} />
                <CountdownCard label="Giờ" value={parts.hours} minDigits={2} />
                <CountdownCard
                  label="Phút"
                  value={parts.minutes}
                  minDigits={2}
                />
                <CountdownCard
                  label="Giây"
                  value={parts.seconds}
                  minDigits={2}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
