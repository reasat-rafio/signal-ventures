import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || ''

export default defineConfig({
    name: 'default',
    title: 'Signal Ventures',

    projectId: PROJECT_ID,
    dataset: DATASET,

    plugins: [deskTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },
})
