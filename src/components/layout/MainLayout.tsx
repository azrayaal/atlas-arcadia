import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function MainLayout() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isUnitDetail = /^\/kosan\/[^/]+$/.test(location.pathname) && !location.pathname.includes('siteplan')

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar transparent={isHome || isUnitDetail} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
