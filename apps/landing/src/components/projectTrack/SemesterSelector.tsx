import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { ChevronIcon, RadioIcon, Typography, cn } from '@gdg/wowds'

interface SemesterSelectorProps {
  semesters: string[]
  value: string
  onChange: (semester: string) => void
}

function SemesterDropdown({ semesters, value, onChange }: SemesterSelectorProps) {
  const id = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const activeOptionRef = useRef<HTMLLIElement>(null)
  const searchRef = useRef({ text: '', updatedAt: 0 })
  const [open, setOpen] = useState(false)
  const [activeSemester, setActiveSemester] = useState(value)
  const activeIndex = semesters.indexOf(activeSemester)

  useEffect(() => {
    if (!open) return

    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [open])

  useEffect(() => {
    if (open) activeOptionRef.current?.scrollIntoView({ block: 'nearest' })
  }, [open, activeSemester])

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (semesters.length === 0) return

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        event.preventDefault()
        const direction = event.key === 'ArrowDown' ? 1 : -1
        const index = open ? activeIndex + direction : semesters.indexOf(value)
        setActiveSemester(semesters[(index + semesters.length) % semesters.length]!)
        setOpen(true)
        break
      }
      case 'Home':
      case 'End':
        event.preventDefault()
        setActiveSemester(semesters[event.key === 'Home' ? 0 : semesters.length - 1]!)
        setOpen(true)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (open) onChange(activeSemester)
        else setActiveSemester(value)
        setOpen(!open)
        break
      case 'Escape':
        if (open) event.preventDefault()
        setOpen(false)
        break
      case 'Tab':
        setOpen(false)
        break
      default: {
        if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return
        const now = Date.now()
        const previous = searchRef.current
        const text = now - previous.updatedAt < 500 ? previous.text + event.key : event.key
        searchRef.current = { text, updatedAt: now }
        const match = semesters.find((semester) => `${semester}학기`.startsWith(text))
        if (match) {
          event.preventDefault()
          setActiveSemester(match)
          setOpen(true)
        }
      }
    }
  }

  return (
    <div
      ref={rootRef}
      className="group relative w-40 s:w-50 min-[768px]:hidden"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
    >
      <button
        type="button"
        role="combobox"
        aria-label="활동 학기"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-options`}
        aria-activedescendant={open && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
        disabled={semesters.length === 0}
        onClick={() => {
          setActiveSemester(value)
          setOpen(!open)
        }}
        onKeyDown={handleKeyDown}
        className="flex h-[45px] w-full cursor-pointer items-center justify-between rounded-lg border border-outline bg-white px-3.5 text-left text-text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-default"
      >
        <Typography variant="body2.3">{value}학기</Typography>
        <ChevronIcon direction="down" size="md" aria-hidden="true" className="text-gray-600" />
      </button>
      {open && (
        <ul
          id={`${id}-options`}
          role="listbox"
          aria-label="활동 학기"
          className="absolute top-full left-0 z-20 mt-2 max-h-100 w-full overflow-y-auto rounded-lg bg-white ring-1 ring-outline ring-inset"
        >
          {semesters.map((semester, index) => (
            <li
              key={semester}
              ref={activeSemester === semester ? activeOptionRef : undefined}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={value === semester}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => {
                onChange(semester)
                setOpen(false)
              }}
              onPointerMove={() => setActiveSemester(semester)}
              className={cn(
                'flex cursor-pointer items-center px-3.5 py-3 text-[#6b6b6b] hover:bg-gray-50',
                activeSemester === semester && 'group-has-[:focus-visible]:bg-gray-50',
              )}
            >
              <Typography variant="body2.3">{semester}학기</Typography>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function SemesterSelector(props: SemesterSelectorProps) {
  const { semesters, value, onChange } = props
  const name = useId()

  return (
    <>
      <SemesterDropdown {...props} />
      <fieldset className="sticky top-24 hidden w-[110px] shrink-0 flex-col gap-4 self-start min-[768px]:flex min-[1024px]:w-[126px]">
        <legend className="sr-only">활동 학기</legend>
        {semesters.map((semester) => (
          <label key={semester} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={semester}
              checked={value === semester}
              onChange={() => onChange(semester)}
              className="peer sr-only"
            />
            <span className="flex items-center gap-2 rounded-sm peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-blue-600">
              <RadioIcon status={value === semester ? 'selected' : 'default'} aria-hidden="true" />
              <Typography
                variant="body2.3"
                className={cn(
                  'whitespace-nowrap text-gray-500',
                  value === semester && 'text-blue-700',
                )}
              >
                {semester}학기
              </Typography>
            </span>
          </label>
        ))}
      </fieldset>
    </>
  )
}
