import { useState } from 'react'
import { useGlobal } from '@/lib/global'

const Header = ({ siteInfo, customNav, ...props }) => {
  const { isDarkMode, switchTheme } = useGlobal()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = customNav || [
    { name: '首页', url: '/' },
    { name: '分类', url: '/category' },
    { name: '标签', url: '/tag' },
    { name: '归档', url: '/archive' }
  ]

  return (
    <header className="portal-header">
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 no-underline" style={{ color: 'var(--p-text)' }}>
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'var(--p-text)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 2a4 4 0 108 0 4 4 0 00-8 0z" />
            </svg>
          </div>
          <span className="font-bold text-[17px] tracking-tight">{siteInfo?.title || 'Portal'}</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <a key={item.url} href={item.url}
              className="px-3 py-1.5 text-sm rounded-md no-underline transition-colors"
              style={{ color: 'var(--p-text2)' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--p-bg-warm)'
                e.currentTarget.style.color = 'var(--p-text)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--p-text2)'
              }}>
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={switchTheme}
            className="w-8 h-8 flex items-center justify-center border rounded-md cursor-pointer"
            style={{ borderColor: 'var(--p-border)', background: 'var(--p-surface)' }}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center border rounded-md"
            style={{ borderColor: 'var(--p-border)', background: 'var(--p-surface)' }}>
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-6 py-3" style={{ borderTop: '1px solid var(--p-border-l)' }}>
          {navItems.map(item => (
            <a key={item.url} href={item.url}
              className="block py-2 text-sm no-underline"
              style={{ color: 'var(--p-text2)' }}>
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

export default Header
