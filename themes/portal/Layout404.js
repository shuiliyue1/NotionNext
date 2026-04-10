import Header from './components/Header'
import Footer from './components/Footer'
import Style from './style'

const Layout404 = ({ siteInfo, ...props }) => {
  return (
    <div className="portal-theme min-h-screen flex flex-col">
      <Style />
      <Header siteInfo={siteInfo} />
      <main className="flex-1">
        <div className="text-center py-32">
          <div className="text-6xl mb-6">🧭</div>
          <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--p-text)' }}>页面走丢了</h1>
          <p className="mb-8" style={{ color: 'var(--p-text2)' }}>你访问的页面不存在，不如回到首页重新探索</p>
          <a href="/"
            className="inline-block px-6 py-3 text-white rounded-lg no-underline font-medium transition-transform hover:scale-105"
            style={{ background: 'var(--p-text)' }}>
            回到首页
          </a>
        </div>
      </main>
      <Footer siteInfo={siteInfo} />
    </div>
  )
}

export default Layout404
