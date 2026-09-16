import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

export interface Options {
  provider?: "giscus"
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
  const Comments: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
    const commentsOverride = fileData.frontmatter?.comments
    if (commentsOverride === false || commentsOverride === "false") {
      return null
    }

    return (
      <div class={classNames(displayClass, "comments-area")}>
        <div class="giscus-wrapper">
          <h3 style="margin-bottom: 0.25rem; font-size: 1.25rem;">💬 Discussions & Comments</h3>
          <p style="font-size: 0.9rem; color: var(--gray); margin-bottom: 0.35rem;">GitHub Discussions (GitHub Account Required)</p>
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
};

var d = (s) => { syncTheme(s.detail.theme); };
var n = [], u = (s) => { n.push(s); };

if (typeof document < "u") {
  let renderComments = () => {
    n.forEach((s) => s()), n.length = 0;
    let theme = getActiveTheme();

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
.giscus-wrapper {
  margin-bottom: 2rem;
}
`
  return Comments
}) satisfies QuartzComponentConstructor
