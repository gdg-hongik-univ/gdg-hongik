import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import RootLayout from '../layout/RootLayout'
import TypoTestPage from '../pages/TypoTestPage'
import StudyPage from '../pages/StudyPage'
import ProjectTrackPage from '../pages/ProjectTrackPage'
import PartPage from '../pages/PartPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'study', element: <StudyPage /> },
      { path: 'project-track', element: <ProjectTrackPage /> },
      { path: 'part', element: <PartPage /> },
      { path: 'typo-test', element: <TypoTestPage /> },
    ],
  },
])
