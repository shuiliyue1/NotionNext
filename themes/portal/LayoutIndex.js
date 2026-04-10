import { useState, useEffect, useRef } from 'react'
import { useGlobal } from '@/lib/global'

const LayoutIndex = ({ posts, siteInfo, categories, tags, ...props }) => {
  const { isDarkMode, switchTheme } = useGlobal()
  const [showCP, setShowCP] = useState(false)
  const [query, setQuery] = useState('')
  const [showSug, setShowSug] = useState(false)
  const cpRef = useRef(null)

  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowCP(true)
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  useEffect(() => {
    if (showCP && cpRef.current) cpRef.current.focus()
  }, [showCP])

  // 分组
  const groups = {}
  posts?.forEach(p => {
    const cat = p.category || '未分类'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(p)
  })

  // 排序
  const order = ['AI', '开发', '设计', '效率', '学习', '工具', '社交', '娱乐', '生活']
  const sorted = order.filter(c => groups[c])
  Object.keys(groups).forEach(c => {
    if (!sorted.includes(c)) sorted.push(c)
  })

  // 搜索过滤
  const filtered = query.trim()
    ? posts?.filter(p => {
        const q = query.toLowerCase()
        return (
          (p.title || '').toLowerCase().includes(q) ||
          (p.summary || '').toLowerCase().includes(q) ||
          (p.category || '').toLowerCase().includes(q) ||
          (p.tags || []).some(t => t.toLowerCase().includes(q))
        )
      })
    : null

  // 搜索建议
  const suggestions = query.trim()
    ? posts?.filter(p => {
        const q = query.toLowerCase()
        return (
          (p.title || '').toLowerCase().includes(q) ||
          (p.summary || '').toLowerCase().includes(q) ||
          (p.tags || []).some(t => t.toLowerCase().includes(q))
        )
      }).slice(0, 6)
    : []

  // 命令面板结果
  const cpResults = showCP
    ? query.trim()
      ? posts?.filter(p => {
          const q = query.toLowerCase()
          return (
            (p.title || '').toLowerCase().includes(q) ||
            (p.summary || '').toLowerCase().includes(q) ||
            (p.category || '').toLowerCase().includes(q) ||
            (p.tags || []).some(t => t.toLowerCase().includes(q))
          )
        })
      : posts
    : []

  const cpGrouped = {}
  cpResults?.forEach(p => {
    const cat = p.category || '其他'
    if (!cpGrouped[cat]) cpGrouped[cat] = []
    cpGrouped[cat].push(p)
  })

  const emoji = {
    'AI': '🤖', '开发': '⚡', '设计': '🎨', '效率': '📊',
    '学习': '📚', '工具': '🛠️', '社交': '💬', '阅读': '📖',
    '娱乐': '🎮', '生活': '🌿'
  }

  const doSearch = () => {
    const q = query.trim()
    if (!q) return
    const m = posts?.find(p => (p.title || '').toLowerCase() === q.toLowerCase())
    if (m?.slug) {
      window.open(m.slug, '_blank')
      return
    }
    window.open('https://www.google.com/search?q=' + encodeURIComponent(q), '_blank')
  }

  return (
    <div className="portal-theme min-h-screen flex flex-col">
      {/* Header */}
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
            {[
              { n: '首页', u: '/' },
              { n: '分类', u: '/category' },
              { n: '标签', u: '/tag' },
              { n: '归档', u: '/archive' }
            ].map(i => (
              <a key={i.u} href={i.u}
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
                {i.n}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowCP(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 border rounded-md text-sm cursor-pointer transition-all"
              style={{ borderColor: 'var(--p-border)', background: 'var(--p-surface)', color: 'var(--p-text2)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <span className="hidden sm:inline">搜索</span>
              <kbd className="hidden sm:inline text-[11px] px-1 py-0.5 border rounded"
                style={{ fontFamily: 'monospace', borderColor: 'var(--p-border)', background: 'var(--p-bg)', color: 'var(--p-text3)' }}>
                ⌘K
              </kbd>
            </button>
            <button onClick={switchTheme}
              className="w-8 h-8 flex items-center justify-center border rounded-md cursor-pointer"
              style={{ borderColor: 'var(--p-border)', background: 'var(--p-surface)' }}>
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="max-w-[1200px] mx-auto px-6 pt-16 pb-8 text-center p-anim">
          <p className="text-sm mb-3" style={{ color: 'var(--p-text3)' }}>
            👋 欢迎回来，今天想探索什么？
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--p-text)' }}>
            发现优质{' '}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, var(--p-accent), #9065b0)' }}>
              网站与工具
            </span>
          </h1>
          <p className="text-base max-w-lg mx-auto mb-10 leading-relaxed" style={{ color: 'var(--p-text2)' }}>
            精心策划的导航集合，帮你快速找到最合适的工具和资源
          </p>

          {/* Search */}
          <div className="relative max-w-[680px] mx-auto">
            <div className="portal-search-box">
              <div className="px-2 py-3 pl-4" style={{ color: 'var(--p-text3)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <input
                type="text"
                className="flex-1 border-none outline-none text-[15px] bg-transparent px-2 py-3"
                style={{ color: 'var(--p-text)' }}
                placeholder="搜索网站、工具或资源..."
                value={query}
                onChange={e => { setQuery(e.target.value); setShowSug(true) }}
                onKeyDown={e => {
                  if (e.key === 'Enter') doSearch()
                  if (e.key === 'Escape') { setShowSug(false); e.target.blur() }
                }}
                onFocus={() => setShowSug(true)}
                onBlur={() => setTimeout(() => setShowSug(false), 200)}
              />
              <button onClick={doSearch}
                className="px-5 py-2.5 text-white border-none rounded-lg text-sm font-medium cursor-pointer transition-all whitespace-nowrap"
                style={{ background: 'var(--p-text)' }}>
                搜索
              </button>
            </div>

            {showSug && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-40"
                style={{ background: 'var(--p-surface)', border: '1px solid var(--p-border)', boxShadow: 'var(--p-shadow-l)' }}>
                <div className="px-4 pt-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--p-text3)' }}>
                  导航推荐
                </div>
                {suggestions.map((post, i) => (
                  <a key={i} href={post.slug || '#'} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2.5 no-underline"
                    style={{ color: 'var(--p-text)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--p-bg-warm)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ background: getBg(post.title), fontFamily: 'monospace' }}>
                      {getL(post.slug)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{post.title}</div>
                      <div className="text-xs truncate" style={{ color: 'var(--p-text3)' }}>{post.summary || ''}</div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="max-w-[1200px] mx-auto px-6 pb-20">
          {filtered ? (
            <div>
              <div className="flex items-center justify-between mb-5 pb-3" style={{ borderBottom: '1px solid var(--p-border-l)' }}>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔍</span>
                  <h2 className="text-xl font-semibold" style={{ color: 'var(--p-text)' }}>搜索结果</h2>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--p-bg-warm)', color: 'var(--p-text3)' }}>
                    {filtered.length}
                  </span>
                </div>
                <button onClick={() => setQuery('')}
                  className="text-sm cursor-pointer bg-none border-none" style={{ color: 'var(--p-accent)' }}>
                  清除搜索
                </button>
              </div>
              {filtered.length > 0 ? (
                <div className="portal-card-grid">
                  {filtered.map((p, i) => <Card key={i} post={p} delay={i * 0.05} />)}
                </div>
              ) : (
                <div className="text-center py-20" style={{ color: 'var(--p-text3)' }}>
                  <div className="text-4xl mb-4">🔍</div>
                  <p>没有找到匹配「{query}」的网站</p>
                </div>
              )}
            </div>
          ) : (
            sorted.map((cat, ci) => {
              const items = groups[cat]
              if (!items?.length) return null
              return (
                <div key={cat} className="mb-12 p-anim" style={{ animationDelay: `${ci * 0.1}s` }}>
                  <div className="flex items-center justify-between mb-5 pb-3" style={{ borderBottom: '1px solid var(--p-border-l)' }}>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{emoji[cat] || '📂'}</span>
                      <h2 className="text-xl font-semibold" style={{ color: 'var(--p-text)' }}>{cat}</h2>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--p-bg-warm)', color: 'var(--p-text3)' }}>
                        {items.length}
                      </span>
                    </div>
                  </div>
                  <div className="portal-card-grid">
                    {items.map((p, i) => <Card key={i} post={p} delay={i * 0.05} />)}
                  </div>
                </div>
              )
            })
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-[1200px] mx-auto px-6 py-10 flex items-center justify-between flex-wrap gap-4"
        style={{ borderTop: '1px solid var(--p-border-l)' }}>
        <div className="text-sm" style={{ color: 'var(--p-text3)' }}>
          &copy; {new Date().getFullYear()} {siteInfo?.title || 'Portal'} · Powered by NotionNext
        </div>
        <div className="flex gap-5">
          {[
            { n: '分类', u: '/category' },
            { n: '标签', u: '/tag' },
            { n: '归档', u: '/archive' }
          ].map(l => (
            <a key={l.u} href={l.u} className="text-sm no-underline transition-colors"
              style={{ color: 'var(--p-text3)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--p-text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--p-text3)'}>
              {l.n}
            </a>
          ))}
        </div>
      </footer>

      {/* Command Palette */}
      {showCP && (
        <>
          <div className="fixed inset-0 z-[200]"
            style={{ background: 'rgba(0,0,0,.3)', backdropFilter: 'blur(4px)' }}
            onClick={() => { setShowCP(false); setQuery('') }} />
          <div className="fixed z-[201] left-1/2 w-[90%] max-w-[600px] overflow-hidden"
            style={{
              top: '18%', transform: 'translateX(-50%)',
              background: 'var(--p-surface)', border: '1px solid var(--p-border)',
              borderRadius: 'var(--p-rl)', boxShadow: 'var(--p-shadow-l)'
            }}>
            <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid var(--p-border-l)' }}>
              <svg width="0 24 24" fill="none" stroke="var(--p-text3)" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input ref={cpRef} type="text"
                className="flex-1 border-none outline-none text-base bg-transparent"
                style={{ color: 'var(--p-text)' }}
                placeholder="搜索导航中的网站..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Escape') { setShowCP(false); setQuery('') }
                  if (e.key === 'Enter' && cpResults?.[0]) {
                    window.open(cpResults[0].slug || '#', '_blank')
                    setShowCP(false)
                    setQuery('')
                  }
                }} />
            </div>
            <div className="max-h-[400px] overflow-y-auto p-2">
              {(!cpResults || cpResults.length === 0) ? (
                <div className="text-center py-10" style={{ color: 'var(--p-text3)' }}>
                  没有找到匹配的网站
                </div>
              ) : (
                Object.entries(cpGrouped).map(([cat, items]) => (
                  <div key={cat}>
                    <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide"
                      style={{ color: 'var(--p-text3)' }}>{cat}</div>
                    {items.map((post, i) => (
                      <div key={i}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors"
                        onClick={() => { window.open(post.slug || '#', '_blank'); setShowCP(false); setQuery('') }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--p-bg-warm)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                          style={{ background: getBg(post.title), fontFamily: 'monospace' }}>
                          {getL(post.slug)}
                        </div>
                        <div className="flex-1 min20" height="20" viewBox="0 -w-0">
                          <div className="text-sm font-medium" style={{ color: 'var(--p-text)' }}>{post.title}</div>
                          <div className="text-xs truncate" style={{ color: 'var(--p-text3)' }}>{post.summary || ''}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
            <div className="px-4 py-2.5 flex gap-4 text-xs"
              style={{ borderTop: '1px solid var(--p-border-l)', color: 'var(--p-text3)' }}>
              <span className="flex items-center gap-1">
                <kbd className="text-[11px] px-1 py-0.5 border rounded"
                  style={{ fontFamily: 'monospace', borderColor: 'var(--p-border)', background: 'var(--p-bg)' }}>↑↓</kbd>
                导航
              </span>
              <span className="flex items-center gap-1">
                <kbd className="text-[11px] px-1 py-0.5 border rounded"
                  style={{ fontFamily: 'monospace', borderColor: 'var(--p-border)', background: 'var(--p-bg)' }}>↵</kbd>
                打开
              </span>
              <span className="flex items-center gap-1">
                <kbd className="text-[11px] px-1 py-0.5 border rounded"
                  style={{ fontFamily: 'monospace', borderColor: 'var(--p-border)', background: 'var(--p-bg)' }}>Esc</kbd>
                关闭
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// 卡片组件
function Card({ post, delay = 0 }) {
  return (
    <a className="portal-card p-anim" href={post.slug || '#'}
      target={post.slug?.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      style={{ animationDelay: `${delay}s` }}>
      <div className="w-[42px] h-[42px] rounded-[10px] flex items-center justify-center text-base font-bold flex-shrink-0"
        style={{ background: getBg(post.title), fontFamily: 'monospace', color: 'var(--p-text)' }}>
        {getL(post.slug)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold" style={{ color: 'var(--p-text)', marginBottom: '3px' }}>
          {post.title}
        </div>
        <div className="text-xs leading-relaxed"
          style={{
            color: 'var(--p-text3)', display: '-webkit-box',
            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
          }}>
          {post.summary || ''}
        </div>
        {post.tags?.length > 0 && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[11px] px-2 py-0.5 rounded"
                style={{ background: 'var(--p-bg-warm)', color: 'var(--p-text3)' }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  )
}

// 从 URL 域名取首字母
function getL(url) {
  if (!url) return '?'
  try {
    return new URL(url).hostname.replace('www.', '')[0].toUpperCase()
  } catch (e) {
    return '?'
  }
}

// 从标题生成固定背景色
function getBg(str) {
  const c = [
    '#e8f0fe', '#fce8e6', '#e6f4ea', '#fef7e0', '#f3e8fd',
    '#e0f7fa', '#fff3e0', '#e8eaf6', '#f1f8e9', '#fce4ec',
    '#e0f2f1', '#ede7f6', '#fff8e1', '#e3f2fd', '#fbe9e7'
  ]
  let h = 0
  for (let i = 0; i < (str || '').length; i++) {
    h = str.charCodeAt(i) + ((h << 5) - h)
  }
  return c[Math.abs(h) % c.length]
}

export default LayoutIndex
