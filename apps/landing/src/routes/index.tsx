import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import RootLayout from '../layout/RootLayout'
import DesignSystemPage from '../pages/DesignSystemPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'design-system', element: <DesignSystemPage /> },
    ],
  },
])
