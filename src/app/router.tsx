import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { HomePage } from '../components/sections/HomePage'
import { ProjectDetailPage } from '../features/projects/ProjectDetailPage'
import { NotFoundPage } from '../components/sections/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'project/:id', element: <ProjectDetailPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
