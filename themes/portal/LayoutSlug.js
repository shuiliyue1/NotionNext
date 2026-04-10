import Header from './components/Header'
import Footer from './components/Footer'
import Style from './style'

const LayoutSlug = ({ post, siteInfo, ...props }) => {
  if (post?.slug?.startsWith('http') && typeof window !== 'undefined') {
    window.location.href = post.slug
  }

  return (
    <div className="portal-theme min-h-screen flex flex-col">
      <Style />
      <Header siteInfo={siteInfo} />
      <main className="flex-1">
        <article className="max-w-[800px] mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--p-text)' }}>{post?.title}</h1>
          {post?.summary && (
            <p className="mb-8 leading-relaxed" style={{ color: 'var(--p-text2)' }}>{post.summary}</p>
          )}
          {post?.slug?.startsWith('http') && (
            <a href={post.slug} target="_blank" rel="noopener noreferrer"
              className="inline-block px-6 py-3 text-white rounded-lg no-underline font-medium"
              style={{ background: 'var(--p-accent)' }}>
              访问网站 →
            </a>
          )}
        </article>
      </main>
      <Footer siteInfo={siteInfo} />
    </div>
  )
}

export default LayoutSlug
