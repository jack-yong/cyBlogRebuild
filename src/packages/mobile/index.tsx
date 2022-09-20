import React from 'react'
import { createRoot } from 'react-dom/client'
import Mobile from '@/containers/mobile'

const root = document.getElementById('root')

if (root) {
    createRoot(root).render(<Mobile />)
}
