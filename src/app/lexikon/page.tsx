import Link from 'next/link'

export default function Lexikon() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 font-karla">Lexikon</h1>
      <p className="mb-4 font-inconsolata">Fedezze fel hasznos információinkat és gyakran ismételt kérdéseinket termékeinkről.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 font-karla">Mosási Programok</h2>
          <p className="font-inconsolata">Ismerje meg a különböző mosási programokat és azok használatát.</p>
          <Link href="/lexikon/mosasi-programok" className="text-[#1CBA8D] hover:underline mt-2 inline-block font-inconsolata">
            Tovább olvasás
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 font-karla">Használati Útmutatók</h2>
          <p className="font-inconsolata">Részletes útmutatók termékeink hatékony használatához.</p>
          <Link href="/lexikon/hasznalati-utmutatok" className="text-[#1CBA8D] hover:underline mt-2 inline-block font-inconsolata">
            Tovább olvasás
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 font-karla">Kérdések és Válaszok</h2>
          <p className="font-inconsolata">Válaszok a leggyakrabban felmerülő kérdésekre.</p>
          <Link href="/lexikon/kerdesek-es-valaszok" className="text-[#1CBA8D] hover:underline mt-2 inline-block font-inconsolata">
            Tovább olvasás
          </Link>
        </div>
      </div>
    </div>
  )
}

