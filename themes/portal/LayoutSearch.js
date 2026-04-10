import Header from './components/Header'
import Footer from './components/Footer'
import Style from './style'

const LayoutSearch = ({ posts, searchKeyword, siteInfo, ...props }) => {
  const filtered = searchKeyword
    ? posts?.filter(p => {
        const q = searchKeyword.toLowerCase()
        return (
          (p.title || '').toLowerCase().includes(q) ||
          (p.summary || '').toLowerCase().includes(q) ||
          (p.tags || []).some(t => t.toLowerCase().includes(q))
        )
      })
    : posts

  return (
    <div className="portal-theme min-h-screen flex flex-col">
      <Style />
      <Header siteInfo={siteInfo} />
      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="flex items-center gap-2 mb-6 pb-3" style={{ borderBottom: '1px solid var(--p-border-l)' }}>
            <span className="text-xl">🔍</span>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--p-text)' }}>
              搜索: {searchKeyword || '全部'}
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--p-bg-warm)', color: 'var(--p-text3)' }}>
              {filtered?.length || 0}
            </span>
          </div>
          <div className="portal-card-grid">
            {filtered?.map((p, i) => (
              <a key={i} className="portal-card" href={p.slug || '#'} target="_blank" rel="noopener noreferrer">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold" style={{ color: 'var(--p-text)' }}>{p.title}</div>
                  <div className="text-xs" style={{ color: 'var(--p-text3)' }}>{p.summary || ''}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer siteInfo={siteInfo} />
    </div>
  )
}

export default LayoutSearch
