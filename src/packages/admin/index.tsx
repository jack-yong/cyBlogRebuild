import React from 'react';
import { createRoot } from 'react-dom/client';
import Admin from '@/containers/admin';

const root = document.getElementById('root');

if (root) {
    createRoot(root).render(<Admin />);
}
