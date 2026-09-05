import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

export interface Options {
  provider?: "giscus" | "cusdis"
  options?: {
    repo?: string
    repoId?: string
    category?: string
    categoryId?: string
    mapping?: string
    strict?: boolean
    reactionsEnabled?: boolean
    inputPosition?: "top" | "bottom"
    lightTheme?: string
    darkTheme?: string
    themeUrl?: string
    lang?: string
  }
}

function boolToStringBool(b?: boolean) {
  return b ? "1" : "0"
}

export default ((opts?: Options) => {
  const Comments: QuartzComponent = ({ displayClass, fileData, cfg }: QuartzComponentProps) => {
    const commentsOverride = fileData.frontmatter?.comments
    if (commentsOverride === false || commentsOverride === "false") {
      return null
    }
    const pageUrl = `https://${cfg.baseUrl ?? "mckdh.github.io/sun-style"}/${fileData.slug ?? ""}`
    const pageTitle = fileData.frontmatter?.title ?? fileData.slug ?? "Sun Style Internal Martial Arts"
    const pageId = fileData.slug ?? "root"

    return (
      <div class={classNames(displayClass, "comments-area")}>
        <div class="cusdis-wrapper">
          <h3 style="margin-bottom: 0.25rem; font-size: 1.25rem;">💬 Quick Training Inquiry (No Login Required)</h3>
          <p style="font-size: 0.9rem; color: var(--gray); margin-bottom: 0.35rem;">
            No GitHub account needed! Feel free to ask questions regarding classes, schedule, or trial sessions with just your name.
          </p>
          <p style="font-size: 0.8rem; color: var(--gray); opacity: 0.8; margin-bottom: 1rem; font-style: italic;">
            ⚠️ Please be respectful. Inappropriate, offensive, or spam comments will be deleted without notice.
          </p>
          <div
            id="cusdis_thread"
            data-host="https://cusdis.com"
            data-app-id="1f5906a9-9a8b-4797-b697-92afa2f78d37"
            data-page-id={pageId}
            data-page-url={pageUrl}
            data-page-title={pageTitle}
          ></div>
        </div>

        <div class="giscus-wrapper">
          <h3 style="margin-bottom: 0.25rem; font-size: 1.25rem;">🐙 GitHub Discussions (GitHub Account Required)</h3>
          <p style="font-size: 0.9rem; color: var(--gray); margin-bottom: 0.35rem;">Welcome in-depth discussions.</p>
          <p style="font-size: 0.8rem; color: var(--gray); opacity: 0.8; margin-bottom: 1rem; font-style: italic;">
            ⚠️ Inappropriate or disrespectful comments will be removed immediately.
          </p>
          <div
            class="giscus"
            data-repo={opts?.options?.repo ?? "mckdh/sun-style"}
            data-repo-id={opts?.options?.repoId ?? "R_kgDOT3s2jw"}
            data-category={opts?.options?.category ?? "General"}
            data-category-id={opts?.options?.categoryId ?? "DIC_kwDOT3s2j84DE6Wc"}
            data-mapping={opts?.options?.mapping ?? "pathname"}
            data-strict={boolToStringBool(opts?.options?.strict ?? false)}
            data-reactions-enabled={boolToStringBool(opts?.options?.reactionsEnabled ?? true)}
            data-input-position={opts?.options?.inputPosition ?? "bottom"}
            data-light-theme={opts?.options?.lightTheme ?? "light"}
            data-dark-theme={opts?.options?.darkTheme ?? "dark"}
            data-theme-url={opts?.options?.themeUrl ?? "https://giscus.app/themes"}
            data-lang={opts?.options?.lang ?? "en"}
          ></div>
        </div>
      </div>
    )
  }

  Comments.afterDOMLoaded = `
var getActiveTheme = () => {
  let s = document.documentElement.getAttribute("saved-theme");
  return s === "dark" || s === "light"
    ? s
    : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
};

var syncTheme = (theme) => {
  let gFrame = document.querySelector("iframe.giscus-frame");
  if (gFrame && gFrame.contentWindow) {
    gFrame.contentWindow.postMessage({ giscus: { setConfig: { theme: theme === "dark" ? "dark" : "light" } } }, "https://giscus.app");
  }
  let cusdisEl = document.getElementById("cusdis_thread");
  if (cusdisEl) cusdisEl.setAttribute("data-theme", theme);
  if (window.CUSDIS && typeof window.CUSDIS.setTheme === "function") {
    window.CUSDIS.setTheme(theme);
  }
};

var d = (s) => { syncTheme(s.detail.theme); };
var n = [], u = (s) => { n.push(s); };

if (typeof document < "u") {
  let onMsg = (e) => {
    try {
      let t = typeof e.data == "string" ? JSON.parse(e.data) : e.data;
      if (t && t.from === "cusdis" && t.event === "resize") {
        let iframe = document.querySelector("#cusdis_thread iframe");
        if (iframe && t.data) iframe.style.height = t.data + "px";
      }
    } catch (err) {}
  };
  window.addEventListener("message", onMsg);

  let renderComments = () => {
    n.forEach((s) => s()), n.length = 0;
    let theme = getActiveTheme();

    let ce = document.getElementById("cusdis_thread");
    if (ce) {
      ce.setAttribute("data-theme", theme);
      if (window.CUSDIS && typeof window.CUSDIS.initial === "function") {
        if (typeof window.CUSDIS.setTheme === "function") window.CUSDIS.setTheme(theme);
        window.CUSDIS.initial();
      } else {
        let cs = document.createElement("script");
        cs.src = "https://cusdis.com/js/cusdis.es.js";
        cs.async = true;
        cs.defer = true;
        cs.onload = () => {
          if (window.CUSDIS && typeof window.CUSDIS.setTheme === "function") {
            window.CUSDIS.setTheme(getActiveTheme());
          }
        };
        document.body.appendChild(cs);
      }
    }

    let ge = document.querySelector(".giscus");
    if (ge) {
      let t = document.createElement("script");
      t.src = "https://giscus.app/client.js";
      t.async = true;
      t.crossOrigin = "anonymous";
      t.setAttribute("data-loading", "lazy");
      t.setAttribute("data-emit-metadata", "0");
      t.setAttribute("data-repo", ge.dataset.repo);
      t.setAttribute("data-repo-id", ge.dataset.repoId);
      t.setAttribute("data-category", ge.dataset.category);
      t.setAttribute("data-category-id", ge.dataset.categoryId);
      t.setAttribute("data-mapping", ge.dataset.mapping);
      t.setAttribute("data-strict", ge.dataset.strict);
      t.setAttribute("data-reactions-enabled", ge.dataset.reactionsEnabled);
      t.setAttribute("data-input-position", ge.dataset.inputPosition);
      t.setAttribute("data-lang", ge.dataset.lang);
      t.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
      ge.appendChild(t);
    }

    document.addEventListener("themechange", d);
    u(() => document.removeEventListener("themechange", d));
  };

  document.addEventListener("nav", renderComments);
  document.addEventListener("render", renderComments);
}
`

  Comments.css = `
.comments-area {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid var(--lightgray);
}
.cusdis-wrapper {
  margin-bottom: 2.5rem;
}
.giscus-wrapper {
  padding-top: 2rem;
  border-top: 1px dashed var(--lightgray);
}
#cusdis_thread {
  width: 100%;
  min-height: 320px;
}
#cusdis_thread iframe {
  width: 100% !important;
  min-height: 320px !important;
  border: none !important;
  overflow: hidden !important;
  color-scheme: light dark;
}
`
  return Comments
}) satisfies QuartzComponentConstructor
