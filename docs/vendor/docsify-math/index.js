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
    .replace(/(?:(\s*)\r\n)?(\$+)\1?((?:[^\s])(?:.*?[^\s])??)\1?\2/gms, '$1<!--[MATH[$3]]-->')

  // Render math
  const render = math => window.katex.renderToString(math, {
    displayMode: true,
    throwOnError: false,
  })

  function Math(hook, vm) {

    hook.mounted(function() {
      const renderer = vm.config.markdown.renderer

      const paragraph = renderer.paragraph || renderer.origin.paragraph
      renderer.paragraph = renderer.origin.paragraph = (text) => paragraph.call(renderer, preserve(text))

      const listitem = renderer.listitem || renderer.origin.listitem
      renderer.listitem = renderer.origin.listitem = (text, task, checked) => listitem.call(renderer, preserve(text), task, checked)

      const tablecell = renderer.tablecell || renderer.origin.tablecell
      renderer.tablecell = renderer.origin.tablecell = (text, flags) => tablecell.call(renderer, preserve(text), flags)
    })

    // Render math, removing some residual wrapping dollar signs the regex didn't catch.
    hook.afterEach(html => html
      .replace(/<!--\[MATH\[(.*?)\]\]-->/gms,
        (_, math) => render(math
          .replace(/^[\s\r\n]*(\$+)(.*?)\1[\s\r\n]*$/gms, '$2')
          .replace(/\\$/gms, '\\\\'))))

    // Remove katex-display class when the math is inside a paragraph.
    hook.doneEach(() =>
      document.querySelectorAll(`span.katex-display`).forEach(e => {
        const parent = e.parentNode
        const onlyChild = parent.childNodes.length === 1
        const isBlock = parent.tagName === 'P' && onlyChild

        if (isBlock) {
          // TODO: change [p span.katex-display] to [figure.katex-display]
        }
        else e.classList.remove('katex-display')
      }))
  }

  window.$docsify = window.$docsify || {}
  window.$docsify.plugins = window.$docsify.plugins || []
  window.$docsify.plugins.push(Math)
})(this)
