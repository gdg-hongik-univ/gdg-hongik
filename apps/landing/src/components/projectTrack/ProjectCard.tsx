import { useState } from 'react'
import { GithubIcon, Typography } from '@gdg/wowds'
import placeholder from '../../assets/project-track/project-placeholder.svg'
import type { ProjectTrackProject } from '../../types/projectTrack'

interface ProjectCardProps {
  project: ProjectTrackProject
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null)
  const imageUrl = project.imageUrl === failedImageUrl ? null : project.imageUrl

  return (
    <li className="flex min-w-0 items-center gap-4 overflow-hidden rounded-xl border border-gray-100 bg-white min-[600px]:gap-6 min-[600px]:p-6">
      <div className="relative flex w-[114px] shrink-0 self-stretch items-center justify-center overflow-hidden bg-gray-50 min-[600px]:size-30 min-[600px]:self-auto min-[600px]:rounded-lg">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 size-full object-cover"
            onError={() => setFailedImageUrl(imageUrl)}
          />
        ) : (
          <img src={placeholder} alt="" className="block h-auto w-11 opacity-60 min-[600px]:w-16" />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 py-5 pr-4 min-[600px]:p-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Typography
            as="h3"
            variant="subtitle4.2"
            className="text-gray-950 max-[599px]:text-[14px]!"
          >
            {project.name}
          </Typography>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            {project.repositories.map(({ type, url }) => {
              const key = `${type}:${url ?? ''}`
              const label = (
                <>
                  <Typography variant="caption2.3">{type}</Typography>
                  <GithubIcon size="sm" className="min-[600px]:size-6" aria-hidden="true" />
                </>
              )

              return url ? (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} ${type} 저장소`}
                  className="inline-flex items-center gap-0.5 rounded-sm hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  {label}
                </a>
              ) : (
                <span
                  key={key}
                  className="inline-flex items-center gap-0.5"
                  title="저장소 링크 준비 중"
                >
                  {label}
                  <span className="sr-only"> GitHub 저장소 링크 준비 중</span>
                </span>
              )
            })}
          </div>
        </div>
        <Typography as="p" variant="body2.3" className="text-sub max-[599px]:text-[12px]!">
          {project.description}
        </Typography>
        <div className="flex flex-wrap items-center gap-x-1.5 min-[600px]:gap-y-1.5">
          <Typography variant="body2.3" className="inline-flex items-center gap-1 text-sub">
            {project.team}
            <span className="text-gray-400" aria-hidden="true">
              |
            </span>
          </Typography>
          {project.members.map((member, index) => (
            <Typography key={index} variant="caption1.3" className="whitespace-nowrap">
              {member}
            </Typography>
          ))}
        </div>
      </div>
    </li>
  )
}
