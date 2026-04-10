import Header from './components/Header'
import Footer from './components/Footer'
import Style from './style'

const LayoutCategoryIndex = ({ posts, category, categories, siteInfo, ...props }) => {
  return (
    <div className="portal-theme min-h-screen flex flex-col">
      <Style />
      <Header siteInfo={siteInfo} />
      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories?.map(cat => (
              <a key={cat} href={`/category/${cat}`}
                className="px-4 py-2 rounded-lg text-sm no-underline transition-all"
                style={{
                  background: cat === category ? 'var(--p-text)' : 'var(--p-surface)',
                  color: cat === category ? 'var(--p-bg)' : ' '#'} target="_blank" rel="noopener noreferrer">
               var(--p-text2)',
                  border: `1px solid ${cat === category ? 'var(--p-text)' : 'var(--p-border)'}`
                }}>
                {cat}
              </a>
            ))}
          </div>
          <div className="portal-card-grid">
            {posts?.map((p, i) => (
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

export default LayoutCategoryIndex
