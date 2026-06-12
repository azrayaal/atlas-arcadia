import { useEffect, useState } from 'react'
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
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome) {
      setScrolled(false)
      return
    }

    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isHome
          ? transparent && !scrolled
            ? 'bg-transparent text-white'
            : 'bg-slate-950/95 text-white border-b border-white/10 shadow-[0_15px_60px_-35px_rgba(15,23,42,0.75)]'
          : 'bg-white/95 backdrop-blur-md text-brand border-b border-brand/5',
      )}
    >
      <div className="container flex h-16 items-center justify-between lg:h-20">
        <div className="flex items-center gap-3">
            {/* <Link to="/" className="flex p-1 shadow-sm">
              <img
                src={PAGE_ASSETS.navLogo}
                alt="Atlas Arcadia logo"
                className=""
              />
            </Link> */}
          <Link to="/" className="font-serif text-xl tracking-wide lg:text-2xl">
            Atlas Arcadia
          </Link>
        </div>

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
