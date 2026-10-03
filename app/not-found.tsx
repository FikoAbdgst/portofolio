import Link from "next/link"

export default function NotFound() {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <p className="readout">
        <span className="lbl">err</span>
        {"// SIGNAL.LOST — 404"}
      </p>
      <h1 className="mt-4">Halaman tidak ditemukan</h1>
      <p className="mt-3">
        Koordinat yang kamu tuju tidak terdaftar di peta misi ini.
      </p>
      <Link href="/" className="btn btn-primary mt-6 px-6 py-3">
        Kembali ke Beranda
      </Link>
    </section>
  )
}