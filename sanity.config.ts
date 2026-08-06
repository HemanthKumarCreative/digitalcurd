import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes/index'
import { structure } from './src/sanity/structure'
import { projectId, dataset, apiVersion } from './src/sanity/env'

const pid = projectId || 'placeholder'
const ds = dataset || 'production'

if (!Array.isArray(schemaTypes) || schemaTypes.length === 0) {
  throw new Error(
    '[sanity.config] schemaTypes failed to load (empty). Check src/sanity/schemaTypes exports.'
  )
}

export default defineConfig({
  name: 'digitalcurd',
  title: 'Digital Curd',
  projectId: pid,
  dataset: ds,
  basePath: '/studio',
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
  },
})
