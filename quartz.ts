import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import Comments from "./quartz/components/Comments"
import { componentRegistry } from "./quartz/components/registry"

const config = await loadQuartzConfig()

// Register custom hybrid Comments component (Cusdis + Giscus)
componentRegistry.register("@quartz-community/comments", Comments, "internal")
componentRegistry.register("comments", Comments, "internal")
componentRegistry.register("Comments", Comments, "internal")

export default config
export const layout = await loadQuartzLayout()
