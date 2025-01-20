import Link from 'next/link'

interface Breadcrumb {
  label: string
  href: string
}

interface BlueHeaderProps {
  title: string
  breadcrumbs: Breadcrumb[]
}

export function BlueHeader({ title, breadcrumbs }: BlueHeaderProps) {
  return (
    <div 
      className="relative h-[180px] w-full flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blue-foam-texture.jpg-mOdZcX8W8yfZPnoCglmtDWgJyW203Q.jpeg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-[40px] font-bold text-white mb-4 font-karla">
          {title}
        </h1>
        <nav className="text-white/90 font-karla text-[0.75rem]">
          <ol className="flex justify-center items-center space-x-2">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={breadcrumb.href} className="flex items-center">
                <Link 
                  href={breadcrumb.href}
                  className="hover:text-white transition-colors"
                >
                  {breadcrumb.label}
                </Link>
                {index < breadcrumbs.length - 1 && (
                  <span className="mx-2">/</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
}

