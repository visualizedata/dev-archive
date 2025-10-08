import type { ProjectData } from '@/content.config'
import { motion } from 'motion/react'
import { useState } from 'react'

export function ProjectCard({ project }: { project: ProjectData }) {
  const [isInView, setIsInView] = useState(false)

  return (
    <div className="relative h-full flex flex-col">
      <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden [box-shadow:0_0_0_1px_rgba(0,0,0,0.1)]">
        <motion.div
          onViewportEnter={() => setIsInView(true)}
          viewport={{ once: true }}
          className="w-full h-full"
        >
          {isInView && (
            <img
              src={`/images/${project.image}`}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </motion.div>
      </div>

      <div className="flex justify-between pt-4">
        <div className="text-base flex-auto">
          <h2 className="font-medium text-balance">{project.title}</h2>
          <div className={'text-neutral-500'}>
            {project.author.join(', ')}
          </div>
        </div>
        <div className="text-base shrink-0 text-neutral-500 pl-3">
          {project.year}
        </div>
      </div>

      <div className={'mt-auto flex flex-wrap gap-2 pt-2'}>
        {[...project.tags, ...project.category].map((tag) => (
          <span className="text-xs bg-neutral-200/70 rounded-full px-2 text-neutral-800 h-5 flex items-center justify-center capitalize">
            {tag}
          </span>
        ))}
      </div>

      <a
        href={`/projects/${project.id}`}
        className="block p-4 text-sm absolute inset-0"
      >
        <span className="sr-only">View Project</span>
      </a>
    </div>
  )
}
