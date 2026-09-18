import { pathToRoot, joinSegments } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

export default (() => {
  const TrainingBanner: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
    if (fileData?.slug === "404") {
      return null
    }

    const baseDir = fileData?.slug ? pathToRoot(fileData.slug) : "."
    const imgPath = joinSegments(baseDir, "static/main-fun-image.png")

    return (
      <div class={classNames(displayClass, "training-banner-container")}>
        <div class="training-banner-card">
          <div class="training-banner-media">
            <img
              src={imgPath}
              alt="Sun's Internal Martial Arts Edmonton, Alberta"
              width="600"
              height="600"
              loading="lazy"
              class="training-banner-img"
            />
          </div>
          <div class="training-banner-body">
            <div class="training-banner-header">
              <span class="training-banner-location">🍁 Windermere, Edmonton, AB</span>
              <h3 class="training-banner-title">Sun's Internal Martial Arts</h3>
              <p class="training-banner-desc">
                <strong>Rooted in Xingyiquan:</strong> Practical body science based on biomechanics, health, and safe partner progression. Welcoming new training partners &amp; curious beginners!
              </p>
            </div>
            <div class="training-banner-actions">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdtH8N5rRo4WN48KLM6QBmyHNLqmEGHPSNyOaoEftzwhjzTHg/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
                class="training-banner-btn-primary"
              >
                <span>👉 Submit Training Inquiry</span>
              </a>
              <a
                href="mailto:rsun.style@gmail.com"
                class="training-banner-btn-secondary"
                title="Send an email to Ryan Kim"
              >
                <span>✉️ rsun.style@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  TrainingBanner.css = `
.training-banner-container {
  margin-top: 2.5rem;
  margin-bottom: 2rem;
  width: 100%;
}

.training-banner-card {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  background: var(--light);
  border: 1px solid var(--lightgray);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.training-banner-card:hover {
  border-color: var(--secondary);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.09);
}

.training-banner-media {
  flex: 0 0 200px;
  position: relative;
  background: var(--lightgray);
  overflow: hidden;
}

.training-banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.training-banner-card:hover .training-banner-img {
  transform: scale(1.05);
}

.training-banner-body {
  flex: 1;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
}

.training-banner-location {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--secondary);
  margin-bottom: 0.25rem;
}

.training-banner-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--dark);
  margin: 0 0 0.4rem 0 !important;
  line-height: 1.3;
}

.training-banner-desc {
  font-size: 0.88rem;
  color: var(--darkgray);
  line-height: 1.5;
  margin: 0 !important;
}

.training-banner-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.training-banner-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 1.1rem;
  background-color: var(--secondary);
  color: #ffffff !important;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: 8px;
  text-decoration: none !important;
  transition: opacity 0.2s ease, transform 0.15s ease;
  box-shadow: 0 2px 8px rgba(0, 112, 243, 0.25);
}

.training-banner-btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.training-banner-btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 0.55rem 0.85rem;
  background-color: transparent;
  color: var(--darkgray) !important;
  font-size: 0.82rem;
  font-weight: 600;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  text-decoration: none !important;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.training-banner-btn-secondary:hover {
  background-color: var(--lightgray);
  border-color: var(--gray);
}

@media (max-width: 680px) {
  .training-banner-card {
    flex-direction: column;
  }
  .training-banner-media {
    flex: none;
    width: 100%;
    height: 180px;
  }
  .training-banner-body {
    padding: 1.1rem;
  }
  .training-banner-title {
    font-size: 1.15rem;
  }
  .training-banner-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .training-banner-btn-primary,
  .training-banner-btn-secondary {
    width: 100%;
    text-align: center;
  }
}
`

  return TrainingBanner
}) satisfies QuartzComponentConstructor
