import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Shield, Wifi, Dumbbell } from 'lucide-react'
import { motion } from 'framer-motion'
import { AVAILABLE_UNITS, AMENITIES } from '@/data/siteLayout'
import { PAGE_ASSETS } from '@/data/roomAssets'
import { UnitCard } from '@/components/units/UnitCard'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

const featuredUnits = AVAILABLE_UNITS.slice(0, 3)

export function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={PAGE_ASSETS.heroMain}
            alt="Atlas Arcadia — kompleks hunian aerial view malam hari"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
        </div>

        <div className="relative container pb-20 pt-32 lg:pb-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl text-white"
          >
            <p className="section-label text-white/50 mb-4">Atlas Arcadia · JL. Raya Bojongsari</p>
            <h1 className="font-serif text-5xl leading-[1.1] lg:text-7xl">
              Temukan ruang
              <br />
              yang menjadi milik Anda
            </h1>
            <p className="mt-6 max-w-md text-sm text-white/65 leading-relaxed lg:text-base">
              Kompleks hunian premium di tepi sawah Bojongsari — {AVAILABLE_UNITS.length} kamar tersedia,
              fasilitas lengkap, keamanan 24 jam.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/kosan">
                <Button size="lg">Jelajahi Kamar</Button>
              </Link>
              <Link to="/kosan/siteplan">
                <Button variant="white" size="lg">Lihat Site Plan</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-brand/10 bg-brand-light py-12">
        <div className="container grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[
            { value: '79', label: 'Total Unit' },
            { value: String(AVAILABLE_UNITS.length), label: 'Tersedia' },
            { value: '6', label: 'Blok (A–F)' },
            { value: formatCurrency(AVAILABLE_UNITS[0]?.price ?? 0), label: 'Mulai dari' },
          ].map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <p className="font-serif text-3xl lg:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-brand-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured units */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label mb-2">Koleksi Eksklusif</p>
              <h2 className="font-serif text-3xl lg:text-5xl">
                Memandu Anda menuju hunian impian
              </h2>
            </div>
            <Link
              to="/kosan"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand hover:gap-3 transition-all"
            >
              Lihat Semua <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredUnits.map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </div>
        </div>
      </section>

      {/* About split */}
      <section className="border-t border-brand/10">
        <div className="container py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <p className="section-label mb-4">01 · Tentang</p>
              <h2 className="font-serif text-3xl lg:text-5xl leading-tight">
                Hunian modern di jantung Bojongsari
              </h2>
              <p className="mt-6 text-sm text-brand-muted leading-relaxed">
                Atlas Arcadia adalah kompleks kos premium yang dirancang dengan standar hunian modern.
                Terletak strategis di JL. Raya Bojongsari, kompleks ini menawarkan privasi, keamanan,
                dan fasilitas lengkap untuk generasi urban yang mengutamakan kualitas hidup.
              </p>
              <p className="mt-4 text-sm text-brand-muted leading-relaxed">
                Dengan 6 blok hunian, Club House, dan sistem smart access, Atlas Arcadia
                menghadirkan pengalaman tinggal yang seamless dari booking hingga move-in.
              </p>
              <Link to="/tentang" className="inline-block mt-8 btn-outline">
                Pelajari Lebih Lanjut
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={PAGE_ASSETS.aboutExterior}
                alt="Eksterior bangunan Atlas Arcadia"
                className="aspect-[3/4] object-cover"
              />
              <img
                src={PAGE_ASSETS.aboutInterior}
                alt="Interior ruang tamu unit"
                className="aspect-[3/2] object-cover mt-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="bg-brand-light py-20 lg:py-28">
        <div className="container">
          <p className="section-label mb-4">02 · Fasilitas</p>
          <h2 className="font-serif text-3xl lg:text-5xl max-w-xl">
            Semua yang Anda butuhkan, dalam satu kompleks
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AMENITIES.map((amenity, i) => {
              const icons = [Dumbbell, Shield, MapPin, Wifi, Shield, Wifi]
              const Icon = icons[i % icons.length]
              return (
                <div key={amenity.title} className="border border-brand/10 bg-white p-8">
                  <Icon className="h-5 w-5 text-brand-accent mb-4" />
                  <h3 className="font-serif text-xl">{amenity.title}</h3>
                  <p className="mt-2 text-sm text-brand-muted leading-relaxed">{amenity.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl lg:text-5xl">
            Siap menemukan kamar Anda?
          </h2>
          <p className="mt-4 text-sm text-brand-muted">
            Booking sekarang atau jadwalkan kunjungan ke site Atlas Arcadia
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/kosan">
              <Button size="lg">Lihat Kamar Tersedia</Button>
            </Link>
            <Link to="/booking">
              <Button variant="outline" size="lg">Request a Call</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
