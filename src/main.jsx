import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './styles/global.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import Updates from './pages/Updates'
import UpdatePage from './pages/UpdatePage'
import Founders from './pages/Founders'
import Mission from './pages/Mission'
import Careers from './pages/Careers'
import NotFound from './pages/NotFound'

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'products', element: <Products /> },
        { path: 'products/updates', element: <Updates /> },
        { path: 'products/updates/:slug', element: <UpdatePage /> },
        { path: 'founders', element: <Founders /> },
        { path: 'mission', element: <Mission /> },
        { path: 'careers', element: <Careers /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/' },
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
