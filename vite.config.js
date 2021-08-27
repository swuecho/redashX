import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";


import mdx from 'vite-plugin-mdx'

// `options` are passed to `@mdx-js/mdx`
const mdx_options = {
  // See https://mdxjs.com/advanced/plugins
  remarkPlugins: [
    // E.g. `remark-frontmatter`
  ],
  rehypePlugins: [],
}


export default defineConfig({
  plugins: [reactRefresh(), mdx(mdx_options)]
})



