import { Link } from 'react-router-dom'
import { COMMUNITY_INFO } from '@/data/siteLayout'

export function Footer() {
  return (
    <footer className="bg-brand text-white">
      <div className="container py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-2xl">Atlas Arcadia</p>
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              Hunian premium di Jl. Senopati No 22, Dukuhwaluh. Kompleks kos modern dengan fasilitas lengkap dan smart living ecosystem.
            </p>
          </div>

          <div>
            <p className="section-label text-white/40 mb-4">Kantor Penjualan</p>
            <address className="not-italic text-sm text-white/70 leading-relaxed">
              {COMMUNITY_INFO.address}
              <br />
              <a href={`tel:${COMMUNITY_INFO.phone}`} className="hover:text-white transition-colors">
                {COMMUNITY_INFO.phone}
              </a>
              <br />
              {COMMUNITY_INFO.hours}
            </address>
          </div>

          <div>
            <p className="section-label text-white/40 mb-4">Ikuti Kami</p>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
              <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
            </div>
          </div>

          <div>
            <p className="section-label text-white/40 mb-4">Navigasi</p>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              <Link to="/kosan" className="hover:text-white transition-colors">Daftar Kamar</Link>
              <Link to="/kosan/siteplan" className="hover:text-white transition-colors">Site Plan</Link>
              <Link to="/tentang" className="hover:text-white transition-colors">Tentang</Link>
              <Link to="/lokasi" className="hover:text-white transition-colors">Lokasi</Link>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-white/40">
          <p>© 2026 Atlas Arcadia. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/70 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white/70 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
