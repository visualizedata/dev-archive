import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'
import fs from 'fs/promises'

// zod schema of project
export const projectSchema = z
  .object({
    author: z.array(z.string()),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    student_url: z.string(),
    project_url: z.string(),
    project_repo: z.string(),
    category: z.array(
      z.string().transform((c) => {
        if (c === 'ms1') {
          return 'Major Studio'
        }
        if (c === 'ms2') {
          return 'Major Studio'
        }
        if (c === 'thesis') {
          return 'Thesis'
        }
        return c
      })
    ),
    tags: z.array(z.string()).transform((arr) => {
      // transform art to arts
      return arr.map((t) => {
        if (t === 'art') {
          return 'arts'
        }
        return t
      })
    }),
    year: z.number(),
    image: z.array(z.string()),
    video: z.array(z.string()),
  })
  .transform((item) => {
    // add an `id` field to the item as a slugified title
    return {
      ...item,
      id: createProjectId({
        title: item.title,
        year: item.year,
        author: item.author,
      }),
    }
  })

export type ProjectData = z.infer<typeof projectSchema>

export function createProjectId(project: {
  title: string
  year: number
  author: string[]
}) {
  const title = project.title.toLowerCase().replace(/[^A-Za-z0-9]/g, '-')
  const year = project.year.toString().replace(/[^A-Za-z0-9]/g, '-')
  const author = project.author
    .join('-')
    .toLowerCase()
    .replace(/[^A-Za-z0-9]/g, '-')

  // replace any duplicate dashes with a single dash
  return `${year}-${author}-${title}`.replace(/-+/g, '-')
}

// Define a single projects collection that combines all JSON files
const projects = defineCollection({
  loader: async () => {
    // read all the json files in the data/projects folder
    const files = await fs.readdir('src/data/projects')

    const projects = []

    // for each file, read the file and parse the json
    for (const file of files) {
      try {
        const content = await fs.readFile(
          `src/data/projects/${file}`,
          'utf-8'
        )
        const json = z.array(projectSchema).parse(JSON.parse(content))

        projects.push(...json)
      } catch {
        // skip
      }
    }

    return projects
  },
  schema: projectSchema,
})

export const keynotesSchema = z.object({
  year: z.number(),
  title: z.string(),
  department: z.string(),
  description: z.string(),
  location: z.string(),
  date: z.string(),
  time: z.string(),
  url: z.string(),
  students: z.array(z.string()),
  video_embed_html: z.string(),
})

export type KeynoteData = z.infer<typeof keynotesSchema>

const keynotes = defineCollection({
  loader: glob({
    pattern: 'src/data/keynotes/*.json',
  }),
  schema: keynotesSchema,
})

export const collections = {
  projects,
  keynotes,
}
