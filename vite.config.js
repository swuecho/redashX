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
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.0.135",
        changeOrigin: true,
        secure: false
      }
    }
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  plugins: [reactRefresh(), mdx(mdx_options),
  ]
})



