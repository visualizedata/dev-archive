import { defineCollection, z } from 'astro:content'

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
})

export const collections = {
  projects: projectsCollection,
}
