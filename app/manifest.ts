import type { MetadataRoute } from "next"
import { siteConfig } from "@/src/site.config"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0c09",
    theme_color: "#5e7d4c",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  }
}