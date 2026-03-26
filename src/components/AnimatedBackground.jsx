import { useEffect, useMemo, useRef } from 'react'

function rand(min, max) {
  return Math.random() * (max - min) + min
}

export default function AnimatedBackground() {
  const canvasRef = useRef(null)
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

  const particles = useMemo(() => {
    // Tạo sẵn để tránh re-create mỗi lần render.
    const count = 70
    return Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: rand(-0.00025, 0.00025),
      vy: rand(-0.00018, 0.00018),
      r: rand(0.6, 2.2),
      a: rand(0.08, 0.35),
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0

    const resize = () => {
      w = Math.max(1, window.innerWidth)
      h = Math.max(1, window.innerHeight)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
    }

    resize()
    window.addEventListener('resize', resize)

    let raf = 0

    const draw = () => {
      raf = window.requestAnimationFrame(draw)

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(dpr, dpr)

      // Vẽ particles theo tỉ lệ viewport.
      for (const p of particles) {
        p.x += p.vx * (w / 1000)
        p.y += p.vy * (h / 1000)

        // Wrap nhẹ.
        if (p.x < -0.05) p.x = 1.05
        if (p.x > 1.05) p.x = -0.05
        if (p.y < -0.05) p.y = 1.05
        if (p.y > 1.05) p.y = -0.05

        const px = p.x * w
        const py = p.y * h

        ctx.beginPath()
        ctx.arc(px, py, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(167, 139, 250, ${p.a})` // purple-ish
        ctx.fill()
      }

      ctx.restore()
    }

    draw()

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [dpr, particles])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-90 animate-gradientShift"
        style={{
          backgroundImage:
            'linear-gradient(120deg, rgba(13, 25, 61, 1) 0%, rgba(79, 70, 229, 0.7) 35%, rgba(56, 189, 248, 0.25) 60%, rgba(109, 40, 217, 0.8) 100%)',
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 50%',
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />

      <div className="absolute inset-0 bg-gradient-to-b from-deep-blue-900/30 via-transparent to-purple-900/30" />
    </div>
  )
}

