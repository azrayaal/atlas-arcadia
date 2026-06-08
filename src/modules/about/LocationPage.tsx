import { COMMUNITY_INFO } from '@/data/siteLayout'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export function LocationPage() {
  return (
    <>
      <section className="pt-28 pb-16 lg:pt-36">
        <div className="container max-w-4xl">
          <p className="section-label mb-4">03 · Lokasi</p>
          <h1 className="font-serif text-4xl lg:text-6xl">Lokasi</h1>
          <p className="mt-8 text-sm text-brand-muted leading-relaxed max-w-2xl">
            Atlas Arcadia berlokasi strategis di JL. Raya Bojongsari, dengan akses mudah
            ke berbagai fasilitas umum dan transportasi.
          </p>
        </div>
      </section>

      <section className="border-t border-brand/10">
        <div className="container py-16">
          <div className="aspect-[21/9] bg-brand-light border border-brand/10 flex items-center justify-center">
            <div className="text-center text-brand-muted">
              <MapPin className="h-8 w-8 mx-auto mb-4 opacity-40" />
              <p className="text-sm">Peta interaktif — integrasi Google Maps (POC)</p>
              <p className="text-xs mt-2">{COMMUNITY_INFO.address}</p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <ContactCard
              icon={MapPin}
              title="Alamat"
              content={COMMUNITY_INFO.address}
            />
            <ContactCard
              icon={Phone}
              title="Telepon"
              content={COMMUNITY_INFO.phone}
            />
            <ContactCard
              icon={Mail}
              title="Email"
              content={COMMUNITY_INFO.email}
            />
            <ContactCard
              icon={Clock}
              title="Jam Operasional"
              content={COMMUNITY_INFO.hours}
            />
          </div>
        </div>
      </section>

      <section className="bg-brand-light py-16">
        <div className="container max-w-3xl">
          <h2 className="font-serif text-2xl">Akses & Lingkungan</h2>
          <ul className="mt-6 space-y-3 text-sm text-brand-muted">
            <li>· 5 menit ke JL. Raya Bojongsari (pintu masuk kompleks)</li>
            <li>· Dekat kampus dan area komersial Bojongsari</li>
            <li>· Akses angkutan umum dari pintu masuk utama</li>
            <li>· Area parkir luas di dalam kompleks</li>
            <li>· POS Security 24 jam di gerbang utama</li>
          </ul>
        </div>
      </section>
    </>
  )
}

function ContactCard({
  icon: Icon,
  title,
  content,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  content: string
}) {
  return (
    <div className="border border-brand/10 p-6">
      <Icon className="h-5 w-5 text-brand-muted mb-4" />
      <p className="section-label">{title}</p>
      <p className="mt-2 text-sm text-brand">{content}</p>
    </div>
  )
}
