import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { UNITS } from '@/data/siteLayout'
import { createBookingLead } from '@/data/bookings'
import { formatCurrency } from '@/lib/utils'
import type { BookingFormData } from '@/types'

export function BookingPage() {
  const { unitId } = useParams<{ unitId?: string }>()
  const navigate = useNavigate()
  const unit = unitId ? UNITS.find((u) => u.id === unitId) : undefined
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<BookingFormData>({
    unitId: unit?.id ?? '',
    name: '',
    email: '',
    phone: '',
    moveInDate: '',
    duration: '6',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createBookingLead({
      ...form,
      unitId: form.unitId || unit?.id || 'general',
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="pt-32 pb-20 min-h-[70vh] flex items-center">
        <div className="container max-w-lg text-center">
          <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto" />
          <h1 className="font-serif text-3xl mt-6">Permintaan Diterima</h1>
          <p className="mt-4 text-sm text-brand-muted leading-relaxed">
            Terima kasih, {form.name}. Tim kami akan menghubungi Anda dalam 1×24 jam
            {unit ? ` mengenai ${unit.label}` : ''}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/kosan" className="btn-primary">Lihat Kamar Lain</Link>
            <button type="button" onClick={() => navigate('/')} className="btn-outline">
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pt-28 pb-20 lg:pt-32">
      <div className="container max-w-2xl">
        <Link
          to={unit ? `/kosan/${unit.id}` : '/kosan'}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-muted hover:text-brand transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>

        <h1 className="font-serif text-4xl mt-8">
          {unit ? `Booking ${unit.label}` : 'Request a Call'}
        </h1>

        {unit && (
          <div className="mt-4 border border-brand/10 p-4 text-sm">
            <p className="text-brand-muted">
              Blok {unit.block} · {unit.bedrooms} Kamar · {unit.area} m²
            </p>
            <p className="mt-1 font-medium">{formatCurrency(unit.price)}/bulan · Deposit {formatCurrency(unit.deposit)}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <Field label="Nama Lengkap" required>
            <input
              type="text"
              required
              className="input-field"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nama lengkap Anda"
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Email" required>
              <input
                type="email"
                required
                className="input-field"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@contoh.com"
              />
            </Field>
            <Field label="No. Telepon" required>
              <input
                type="tel"
                required
                className="input-field"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="08xx xxxx xxxx"
              />
            </Field>
          </div>

          {!unit && (
            <Field label="Unit yang Diminati">
              <select
                className="input-field"
                value={form.unitId}
                onChange={(e) => setForm({ ...form, unitId: e.target.value })}
              >
                <option value="">Pilih unit (opsional)</option>
                {UNITS.filter((u) => u.status === 'available').map((u) => (
                  <option key={u.id} value={u.id}>{u.label} — {formatCurrency(u.price)}/bln</option>
                ))}
              </select>
            </Field>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Rencana Masuk" required>
              <input
                type="date"
                required
                className="input-field"
                value={form.moveInDate}
                onChange={(e) => setForm({ ...form, moveInDate: e.target.value })}
              />
            </Field>
            <Field label="Durasi Sewa" required>
              <select
                className="input-field"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value as BookingFormData['duration'] })}
              >
                <option value="3">3 Bulan</option>
                <option value="6">6 Bulan</option>
                <option value="12">12 Bulan</option>
              </select>
            </Field>
          </div>

          <Field label="Pesan (opsional)">
            <textarea
              className="input-field min-h-[120px] resize-none"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Ada pertanyaan atau permintaan khusus?"
            />
          </Field>

          <button type="submit" className="btn-primary w-full">
            Kirim Permintaan Booking
          </button>

          <p className="text-xs text-brand-muted text-center">
            Dengan mengirim formulir ini, Anda setuju untuk dihubungi oleh tim Atlas Arcadia.
          </p>
        </form>
      </div>
    </section>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="section-label block mb-2">
        {label}{required && ' *'}
      </label>
      {children}
    </div>
  )
}
