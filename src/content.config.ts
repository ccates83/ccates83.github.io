import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Posts live on Medium (canonical). Each file here is a stub: frontmatter only.
// status 'published' links out to `url`; status 'next' is listed as upcoming.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z
    .object({
      number: z.number(),
      title: z.string(),
      summary: z.string(),
      status: z.enum(['published', 'next']),
      date: z.coerce.date().optional(),
      url: z.string().url().optional(),
      tag: z.string().optional(),
    })
    .refine((d) => d.status !== 'published' || (!!d.url && !!d.date), {
      message: 'A published post needs `url` and `date`.',
      path: ['url'],
    }),
});

// Projects: frontmatter drives the home-page card; the body is the case study at /work/<slug>.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    kind: z.string(),
    status: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    role: z.string().default('Solo — design, build, ship'),
    theme: z.enum(['night', 'ember', 'paper', 'moss']),
    visual: z.enum(['phone', 'grid', 'terminal', 'spring']),
    links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
  }),
});

export const collections = { posts, projects };
