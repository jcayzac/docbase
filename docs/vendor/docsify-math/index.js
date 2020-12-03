'use strict'

/*
 * Simple plugin for Katex:
 *
 * - Math should be wrapped into dollar signs. It doesn't matter how many, as long as
 *   it matches (e.g. `$…$`, `$$…$$`, `$$$…$$$` etc)
 * - Display mode is always used, then inline math is made inline again using CSS.
 */
;(function (window) {
  // Preserve math content by wrapping it in a specially-formatted comment.
  const preserve = content => content
    .replace(/(?:(\s*)\r\n)?(\$+)\1?((?:[^\s])(?:.*?[^\s])??)\1?\2/mgs, '$1<!--[MATH[$3]]-->')

  // Render math
  const render = math => window.katex.renderToString(math, {
    displayMode: true,
    throwOnError: false,
  })

  function Math(hook, vm) {
    // Preserve all top-level math
    hook.beforeEach(preserve)

    // Preserve math in paragraphs at any level (tables, lists, blockquotes…)
    hook.mounted(function() {
      const renderer = vm.config.markdown.renderer

      const paragraph = renderer.paragraph || renderer.origin.paragraph
      renderer.paragraph = renderer.origin.paragraph = (text) => paragraph.call(this, preserve(text))
    })

    // Render math, removing some residual wrapping dollar signs the regex didn't catch.
    hook.afterEach(html => html
      .replace(/<!--\[MATH\[(.*?)\]\]-->/mgs,
        (_, math) => render(math.replace(/^(\$+)(.*?)\1/gms, '$2'))))

    // Remove katex-display class when the math is inside a paragraph.
    hook.doneEach(() =>
      document.querySelectorAll(`p .katex-display`).forEach(e => e.classList.remove('katex-display')))
  }

  window.$docsify = window.$docsify || {}
  window.$docsify.plugins = window.$docsify.plugins || []
  window.$docsify.plugins.push(Math)
})(this)
