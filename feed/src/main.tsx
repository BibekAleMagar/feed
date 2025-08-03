import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { queryClient } from './lib/react-query.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const redirectUrl = localStorage.getItem('ghpages-redirect');
if (redirectUrl) {
  localStorage.removeItem('ghpages-redirect');
  const newUrl = '/feed' + (redirectUrl.startsWith('/') ? redirectUrl : '/' + redirectUrl);
  window.history.replaceState(null, '', newUrl);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename='/feed'>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)