import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 font-karla">Welcome to Washtag</h1>
      <p className="mb-4 font-inconsolata">Discover our innovative washcards and laundry solutions.</p>
      <Link href="/webshop" className="bg-[#1CBA8D] text-white px-4 py-2 rounded hover:bg-[#19A67E] transition-colors">
        Shop Now
      </Link>
    </div>
  )
}

