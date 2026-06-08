import { Search, X } from 'lucide-react'

interface MasterplanSearchProps {
  value: string
  onChange: (value: string) => void
}

export function MasterplanSearch({ value, onChange }: MasterplanSearchProps) {
  return (
    <div className="sticky top-20 z-30 mb-4">
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Cari blok atau nomor kamar..."
          className="w-full border border-brand/15 bg-white/95 backdrop-blur-sm py-3 pl-11 pr-10 text-sm shadow-card focus:border-brand focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand"
            aria-label="Hapus pencarian"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
