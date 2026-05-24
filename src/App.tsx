import { Outlet } from 'react-router-dom'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { SiteHeader } from './components/layout/SiteHeader'
import { SiteFooter } from './components/layout/SiteFooter'

function App() {
  return (
    <div className="site-shell">
      <ScrollToTop />
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
