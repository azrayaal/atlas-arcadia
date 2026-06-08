import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { HomePage } from '@/modules/home/HomePage'
import { UnitsPage } from '@/modules/units/UnitsPage'
import { SitePlanPage } from '@/modules/units/SitePlanPage'
import { UnitDetailPage } from '@/modules/units/UnitDetailPage'
import { BookingPage } from '@/modules/booking/BookingPage'
import { AboutPage } from '@/modules/about/AboutPage'
import { LocationPage } from '@/modules/about/LocationPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'kosan', element: <UnitsPage /> },
      { path: 'kosan/siteplan', element: <SitePlanPage /> },
      { path: 'kosan/:id', element: <UnitDetailPage /> },
      { path: 'booking', element: <BookingPage /> },
      { path: 'booking/:unitId', element: <BookingPage /> },
      { path: 'tentang', element: <AboutPage /> },
      { path: 'lokasi', element: <LocationPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
