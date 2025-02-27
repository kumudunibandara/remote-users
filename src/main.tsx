import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Button from './components/Button'
import { ErrorBoundary } from "react-error-boundary";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong in remote</div>}>
      <Button text='Click me' />
    </ErrorBoundary>
  </StrictMode>,
)
