import { pathToRoot, joinSegments } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

export default (() => {
  const SidebarBanner: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
    const baseDir = fileData?.slug ? pathToRoot(fileData.slug) : "."
    const imgPath = joinSegments(baseDir, "static/main-fun-image.png")

    return (
      <div class={classNames(displayClass, "sidebar-banner")}>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdtH8N5rRo4WN48KLM6QBmyHNLqmEGHPSNyOaoEftzwhjzTHg/viewform?usp=dialog"
          target="_blank"
          rel="noopener noreferrer"
          class="sidebar-banner-card"
          aria-label="Submit a Training Inquiry for Sun's Internal Martial Arts"
        >
          <div class="sidebar-banner-img-wrapper">
            <img
              src={imgPath}
              alt="Sun's Internal Martial Arts in Edmonton, Alberta"
              width="600"
              height="600"
              loading="lazy"
              class="sidebar-banner-img"
            />
          </div>
          <div class="sidebar-banner-content">
            <span class="sidebar-banner-tag">🍁 Edmonton, AB</span>
            <span class="sidebar-banner-title">Sun Style Martial Arts</span>
            <span class="sidebar-banner-action">Join Training &amp; Inquiry →</span>
          </div>
        </a>
      </div>
    )
  }

  SidebarBanner.css = `
.sidebar-banner {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  width: 100%;
}

.sidebar-banner-card {
  display: block;
  text-decoration: none !important;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--lightgray);
  background: var(--light);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  transition: all 0.25s ease-in-out;
}

.sidebar-banner-card:hover {
  transform: translateY(-3px);
  border-color: var(--secondary);
  box-shadow: 0 8px 20px rgba(0, 112, 243, 0.15);
}

.sidebar-banner-img-wrapper {
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background-color: var(--lightgray);
}

.sidebar-banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.sidebar-banner-card:hover .sidebar-banner-img {
  transform: scale(1.04);
}

.sidebar-banner-content {
  padding: 0.6rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  background: var(--light);
  border-top: 1px solid var(--lightgray);
}

.sidebar-banner-tag {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--gray);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.sidebar-banner-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--dark);
  line-height: 1.25;
}

.sidebar-banner-action {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--secondary);
  margin-top: 0.2rem;
  display: inline-flex;
  align-items: center;
}
`

  return SidebarBanner
}) satisfies QuartzComponentConstructor
