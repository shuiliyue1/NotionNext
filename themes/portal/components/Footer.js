const Footer = ({ siteInfo }) => {
  return (
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
  )
}

export default Footer
