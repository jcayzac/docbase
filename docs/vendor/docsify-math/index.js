'use strict'

/*
 * Simple plugin for Katex.
 */
;(function (window) {
  function Math(hook, vm) {
    hook.beforeEach(content => content
      .replace(/(\$+)((?:[^\s])(?:.*?[^\s])??)\1/g, '<!--[MATH[$2]]-->'))

    hook.afterEach(html => html
      .replace(/<!--\[MATH\[(.*?)\]\]-->/g,
        (_, math) => window.katex.renderToString(math, {
          displayMode: true,
          throwOnError: false,
        })))

    hook.doneEach(() =>
      document.querySelectorAll(`p .katex-display`).forEach(e => e.classList.remove('katex-display')))
  }

  window.$docsify = window.$docsify || {}
  window.$docsify.plugins = window.$docsify.plugins || []
  window.$docsify.plugins.push(Math)
})(this)
