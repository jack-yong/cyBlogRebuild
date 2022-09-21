import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from '@/containers/home';

const root = document.getElementById('root');

if (root) {
    createRoot(root).render(<Home />);
}
