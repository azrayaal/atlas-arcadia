import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { PAGE_ASSETS } from '@/data/roomAssets'

const navLinks = [
  { to: '/tentang', label: 'Tentang' },
  { to: '/lokasi', label: 'Lokasi' },
  { to: '/kosan', label: 'Kamar' },
  { to: '/kosan/siteplan', label: 'Site Plan' },
]

export function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        transparent && isHome
          ? 'bg-transparent text-white'
          : 'bg-white/95 backdrop-blur-md text-brand border-b border-brand/5',
      )}
    >
      <div className="container flex h-16 items-center justify-between lg:h-20">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={PAGE_ASSETS.heroMain}
            alt=""
            className="h-9 w-9 rounded-full object-cover ring-1 ring-white/20 lg:h-10 lg:w-10"
          />
          <span className="font-serif text-xl tracking-wide lg:text-2xl">Atlas Arcadia</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'text-xs uppercase tracking-widest transition-colors',
                  isActive
                    ? transparent && isHome
                      ? 'text-white'
                      : 'text-brand'
                    : transparent && isHome
                      ? 'text-white/70 hover:text-white'
                      : 'text-brand-muted hover:text-brand',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/kosan">
            <Button
              variant={transparent && isHome ? 'white' : 'primary'}
              size="sm"
            >
              <Phone className="h-3.5 w-3.5" />
              Booking
            </Button>
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-brand/10 bg-white px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-widest text-brand"
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/kosan" onClick={() => setOpen(false)}>
              <Button className="w-full mt-2">Booking</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
