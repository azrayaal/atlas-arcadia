import { Link } from 'react-router-dom'
import { AMENITIES } from '@/data/siteLayout'
import { PAGE_ASSETS } from '@/data/roomAssets'

export function AboutPage() {
  return (
    <>
      <section className="pt-28 pb-16 lg:pt-36">
        <div className="container max-w-4xl">
          <p className="section-label mb-4">01 · Tentang</p>
          <h1 className="font-serif text-4xl lg:text-6xl leading-tight">
            Atlas Arcadia
          </h1>
          <p className="mt-8 text-sm text-brand-muted leading-relaxed max-w-2xl">
            Atlas Arcadia adalah kompleks hunian premium yang terletak di JL. Raya Bojongsari, Depok.
            Dirancang untuk generasi urban yang mengutamakan kualitas hidup, privasi, dan kenyamanan
            dalam satu ekosistem terintegrasi.
          </p>
        </div>
      </section>

      <section className="border-t border-brand/10">
        <div className="container py-16 grid gap-12 lg:grid-cols-2 items-center">
          <img
            src={PAGE_ASSETS.aboutExterior}
            alt="Eksterior kompleks Atlas Arcadia"
            className="aspect-[4/5] object-cover"
          />
          <div>
            <h2 className="font-serif text-3xl">Visi Kami</h2>
            <p className="mt-6 text-sm text-brand-muted leading-relaxed">
              Menghadirkan standar hunian baru di kawasan Bojongsari — di mana setiap penghuni
              mendapatkan ruang pribadi yang nyaman, fasilitas komunal yang lengkap, dan
              teknologi smart living yang mempermudah kehidupan sehari-hari.
            </p>
            <p className="mt-4 text-sm text-brand-muted leading-relaxed">
              Dengan 79 unit tersebar di 6 blok (A–F), Atlas Arcadia menawarkan variasi luas
              mulai dari 72 m² hingga 134 m², cocok untuk mahasiswa, profesional muda,
              hingga keluarga kecil.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-light py-16 lg:py-24">
        <div className="container">
          <h2 className="font-serif text-3xl">Fasilitas</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AMENITIES.map((a) => (
              <div key={a.title} className="border border-brand/10 bg-white p-6">
                <h3 className="font-serif text-xl">{a.title}</h3>
                <p className="mt-2 text-sm text-brand-muted">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="container max-w-xl">
          <h2 className="font-serif text-3xl">Tertarik bergabung?</h2>
          <p className="mt-4 text-sm text-brand-muted">Lihat kamar tersedia dan mulai proses booking Anda</p>
          <Link to="/kosan" className="inline-block mt-8 btn-primary">Lihat Kamar</Link>
        </div>
      </section>
    </>
  )
}
