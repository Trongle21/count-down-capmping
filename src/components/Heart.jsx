import { useEffect, useState, useRef } from "react";
import "../index.css";
import HeartPicture from "./HeartPiture.tsx";

export function Heart() {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [isPictureOpen, setIsPictureOpen] = useState(false);
  const [selectedHeartId, setSelectedHeartId] = useState(1);

  // Auto-play audio when component mounts
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;
    audio.loop = true;

    const playAudio = () => {
      audio.play().catch((error) => {
        console.log("Auto-play prevented:", error);
      });
    };

    // Attempt to play immediately
    playAudio();

    // Also try on first user interaction
    const handleInteraction = () => {
      playAudio();
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const settings = {
      particles: {
        length: 2000,
        duration: 2,
        velocity: 100,
        effect: -1.3,
        size: 13,
      },
    };
    class Point {
      constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
      }
      clone() {
        return new Point(this.x, this.y);
      }
      length(lengthValue) {
        if (typeof lengthValue === "undefined")
          return Math.sqrt(this.x * this.x + this.y * this.y);
        this.normalize();
        this.x *= lengthValue;
        this.y *= lengthValue;
        return this;
      }
      normalize() {
        const len = this.length() || 1;
        this.x /= len;
        this.y /= len;
        return this;
      }
    }
    class Particle {
      constructor() {
        this.position = new Point();
        this.velocity = new Point();
        this.acceleration = new Point();
        this.age = 0;
      }
      initialize(x, y, dx, dy) {
        this.position.x = x;
        this.position.y = y;
        this.velocity.x = dx;
        this.velocity.y = dy;
        this.acceleration.x = dx * settings.particles.effect;
        this.acceleration.y = dy * settings.particles.effect;
        this.age = 0;
      }
      update(deltaTime) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;
        this.age += deltaTime;
      }
      draw(context, img) {
        const ease = (t) => --t * t * t + 1;
        const size = img.width * ease(this.age / settings.particles.duration);
        context.globalAlpha = 1 - this.age / settings.particles.duration;
        context.drawImage(
          img,
          this.position.x - size / 2,
          this.position.y - size / 2,
          size,
          size,
        );
      }
    }
    class ParticlePool {
      constructor(length) {
        this.particles = new Array(length);
        this.firstActive = 0;
        this.firstFree = 0;
        this.duration = settings.particles.duration;
        for (let i = 0; i < this.particles.length; i += 1)
          this.particles[i] = new Particle();
      }
      add(x, y, dx, dy) {
        this.particles[this.firstFree].initialize(x, y, dx, dy);
        this.firstFree = (this.firstFree + 1) % this.particles.length;
        if (this.firstActive === this.firstFree)
          this.firstActive = (this.firstActive + 1) % this.particles.length;
      }
      update(deltaTime) {
        if (this.firstActive < this.firstFree) {
          for (let i = this.firstActive; i < this.firstFree; i += 1)
            this.particles[i].update(deltaTime);
        } else if (this.firstFree < this.firstActive) {
          for (let i = this.firstActive; i < this.particles.length; i += 1)
            this.particles[i].update(deltaTime);
          for (let i = 0; i < this.firstFree; i += 1)
            this.particles[i].update(deltaTime);
        }
        while (
          this.particles[this.firstActive].age >= this.duration &&
          this.firstActive !== this.firstFree
        ) {
          this.firstActive = (this.firstActive + 1) % this.particles.length;
        }
      }
      draw(context, img) {
        if (this.firstActive < this.firstFree) {
          for (let i = this.firstActive; i < this.firstFree; i += 1)
            this.particles[i].draw(context, img);
        } else if (this.firstFree < this.firstActive) {
          for (let i = this.firstActive; i < this.particles.length; i += 1)
            this.particles[i].draw(context, img);
          for (let i = 0; i < this.firstFree; i += 1)
            this.particles[i].draw(context, img);
        }
      }
    }

    const context = canvas.getContext("2d");
    const particles = new ParticlePool(settings.particles.length);
    const particleRate =
      settings.particles.length / settings.particles.duration;
    let time;
    let animationFrameId;
    let timeoutId;

    function pointOnHeart(t) {
      return new Point(
        160 * Math.pow(Math.sin(t), 3),
        130 * Math.cos(t) -
          50 * Math.cos(2 * t) -
          20 * Math.cos(3 * t) -
          10 * Math.cos(4 * t) +
          25,
      );
    }
    const heartImage = (() => {
      const heartCanvas = document.createElement("canvas");
      const heartContext = heartCanvas.getContext("2d");
      heartCanvas.width = settings.particles.size;
      heartCanvas.height = settings.particles.size;
      function to(t) {
        const point = pointOnHeart(t);
        point.x =
          settings.particles.size / 2 +
          point.x * (settings.particles.size / 350);
        point.y =
          settings.particles.size / 2 -
          point.y * (settings.particles.size / 350);
        return point;
      }
      heartContext.beginPath();
      let t = -Math.PI;
      let point = to(t);
      heartContext.moveTo(point.x, point.y);
      while (t < Math.PI) {
        t += 0.01;
        point = to(t);
        heartContext.lineTo(point.x, point.y);
      }
      heartContext.closePath();
      heartContext.fillStyle = "#FF5CA4";
      heartContext.fill();
      const img = new Image();
      img.src = heartCanvas.toDataURL();
      return img;
    })();

    function render() {
      animationFrameId = window.requestAnimationFrame(render);
      const newTime = Date.now() / 1000;
      const deltaTime = newTime - (time || newTime);
      time = newTime;
      context.clearRect(0, 0, canvas.width, canvas.height);
      const amount = particleRate * deltaTime;
      for (let i = 0; i < amount; i += 1) {
        const pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
        const dir = pos.clone().length(settings.particles.velocity);
        particles.add(
          canvas.width / 2 + pos.x,
          canvas.height / 2 - pos.y,
          dir.x,
          -dir.y,
        );
      }
      particles.update(deltaTime);
      particles.draw(context, heartImage);
    }
    function onResize() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
    window.addEventListener("resize", onResize);
    timeoutId = window.setTimeout(() => {
      onResize();
      render();
    }, 10);
    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("resize", onResize);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="heart-page">
      {/* Background Music */}
      <audio
        ref={audioRef}
        src="/src/assets/audio/Lần Sau Cuối (Lofi Ver.) - DuongG x Freak D.mp3"
        preload="auto"
      />

      <button
        type="button"
        className="heart-page__box relative"
        onClick={() => setIsPictureOpen(true)}
        aria-label="Open heart picture gallery"
      >
        <canvas id="pinkboard" ref={canvasRef} />
        <h1 className="heart-page__title absolute top-10">Yeu mo nhieu lam</h1>

        <div className="heart-page__prompt">Click vào trái tim để mở ảnh</div>
      </button>
      <HeartPicture
        isOpen={isPictureOpen}
        selectedHeartId={selectedHeartId}
        onSelectHeart={setSelectedHeartId}
        onClose={() => setIsPictureOpen(false)}
      />
    </div>
  );
}
