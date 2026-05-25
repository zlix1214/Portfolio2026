import { profile } from '../../config/profile'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page site-footer__inner">
        <span>© 2026 Xiang-You. All rights reserved.</span>
        <span>
          {profile.englishName} / {profile.role}
        </span>
      </div>
    </footer>
  )
}
