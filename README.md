# Atlas Arcadia — Client Booking Web

Web booking POC untuk kompleks kos Atlas Arcadia. Dibangun dengan React, TypeScript, dan Tailwind CSS.

## Menjalankan

```bash
npm install
npm run dev
```

## Struktur

```
src/
├── components/       # UI reusable (layout, units, siteplan)
├── modules/          # Feature pages (home, units, booking, about)
├── data/             # Dummy data & site layout
├── hooks/            # Custom hooks (filters)
├── types/            # TypeScript interfaces
├── lib/              # Utilities
└── routes/           # React Router config
```

## Halaman

| Route | Deskripsi |
|-------|-----------|
| `/` | Landing page |
| `/kosan` | Daftar kamar + filter |
| `/kosan/siteplan` | Site plan interaktif |
| `/kosan/:id` | Detail unit |
| `/booking/:unitId?` | Form booking |
| `/tentang` | Tentang kompleks |
| `/lokasi` | Lokasi & kontak |
# atlas-arcadia
