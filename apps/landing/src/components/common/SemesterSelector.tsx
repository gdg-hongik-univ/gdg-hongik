import { useId } from 'react'
import { ChevronIcon, RadioIcon, Typography, cn } from '@gdg/wowds'

interface SemesterSelectorProps {
  semesters: string[]
  value: string
  onChange: (semester: string) => void
}

export default function SemesterSelector({ semesters, value, onChange }: SemesterSelectorProps) {
  const name = useId()

  return (
    <>
      <div className="relative w-40 s:w-50 min-[768px]:hidden">
        <select
          aria-label="활동 학기"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-[45px] w-full appearance-none rounded-lg border border-outline bg-white pr-12 pl-3.5 text-body2 font-medium tracking-[-0.015em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {semesters.map((semester) => (
            <option key={semester} value={semester}>
              {semester}학기
            </option>
          ))}
        </select>
        <ChevronIcon
          direction="down"
          size="md"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-gray-600"
        />
      </div>
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
