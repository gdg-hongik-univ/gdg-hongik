import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  end: number
  duration?: number
}

export function CountUp({ end, duration = 1100 }: CountUpProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    let animationFrameId: number

    // 후반부로 갈수록 천천히 멈추는 이징 함수
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -7 * t))

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(easeOutExpo(progress) * end))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }

    animationFrameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isVisible, end, duration])

  return <span ref={ref}>{count}</span>
}
